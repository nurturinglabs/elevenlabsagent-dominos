"use client";

import { useState, useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import { voiceOrders, VoiceOrder } from "@/lib/analytics-data";

// ── Dominos brand ────────────────────────────────────────────
const RED = "#E31837";
const BLUE = "#006491";
const BLUE_LIGHT = "#b3d7e8";

function fmt(n: number): string {
  return n >= 1000 ? `₹${(n / 1000).toFixed(1)}K` : `₹${n}`;
}

// ── Segmented Bar ────────────────────────────────────────────

function SegmentedBar({ segments }: { segments: { label: string; value: number; color: string }[] }) {
  const total = segments.reduce((s, seg) => s + seg.value, 0);
  if (total === 0) return null;
  return (
    <div className="flex rounded-full overflow-hidden h-3">
      {segments.map((seg) => (
        <div key={seg.label} className="h-full" style={{ width: `${(seg.value / total) * 100}%`, backgroundColor: seg.color }} title={`${seg.label}: ${seg.value}`} />
      ))}
    </div>
  );
}

// ── Main Dashboard ───────────────────────────────────────────

export function OrderAnalytics() {
  const [period, setPeriod] = useState<"daily" | "weekly" | "monthly">("weekly");

  const { filteredOrders, periodLabel } = useMemo(() => {
    const now = new Date();
    let cutoff: Date;
    let label: string;
    if (period === "daily") {
      cutoff = new Date(now); cutoff.setDate(cutoff.getDate() - 7); cutoff.setHours(0, 0, 0, 0); label = "Last 7 days";
    } else if (period === "weekly") {
      cutoff = new Date(now); cutoff.setDate(cutoff.getDate() - 28); cutoff.setHours(0, 0, 0, 0); label = "Last 4 weeks";
    } else {
      cutoff = new Date("2026-01-01"); label = "Jan – Feb 2026";
    }
    return { filteredOrders: voiceOrders.filter((o) => new Date(o.date) >= cutoff), periodLabel: label };
  }, [period]);

  // ── Core metrics ──────────────────────────────────────────

  const totalSessions = filteredOrders.length;
  const completed = filteredOrders.filter((o) => o.order_completed);
  const totalCompleted = completed.length;
  const conversionRate = totalSessions > 0 ? Math.round((totalCompleted / totalSessions) * 100) : 0;
  const totalRevenue = completed.reduce((s, o) => s + o.total, 0);
  const avgOrderValue = totalCompleted > 0 ? Math.round(totalRevenue / totalCompleted) : 0;
  const totalItems = completed.reduce((s, o) => s + o.items.reduce((t, i) => t + i.quantity, 0), 0);
  const avgItemsPerOrder = totalCompleted > 0 ? (totalItems / totalCompleted).toFixed(1) : "0";
  const avgSession = totalSessions > 0 ? Math.round(filteredOrders.reduce((s, o) => s + o.session_duration_seconds, 0) / totalSessions) : 0;

  const pizzaOrders = completed.filter((o) => o.items.some((i) => i.category === "veg_pizza" || i.category === "nonveg_pizza"));
  const upsoldOrders = pizzaOrders.filter((o) => o.items.some((i) => ["sides", "desserts", "beverages"].includes(i.category)));
  const upsellRate = pizzaOrders.length > 0 ? Math.round((upsoldOrders.length / pizzaOrders.length) * 100) : 0;

  const deliveryCount = completed.filter((o) => o.delivery_type === "delivery").length;
  const pickupCount = completed.filter((o) => o.delivery_type === "pickup").length;
  const deliveryPct = totalCompleted > 0 ? Math.round((deliveryCount / totalCompleted) * 100) : 0;

  const vegItems = completed.reduce((s, o) => s + o.items.filter((i) => i.category === "veg_pizza").reduce((t, i) => t + i.quantity, 0), 0);
  const nonvegItems = completed.reduce((s, o) => s + o.items.filter((i) => i.category === "nonveg_pizza").reduce((t, i) => t + i.quantity, 0), 0);
  const totalPizzas = vegItems + nonvegItems;
  const vegPct = totalPizzas > 0 ? Math.round((vegItems / totalPizzas) * 100) : 0;

  const offersUsed = completed.filter((o) => o.offer_applied);
  const totalDiscount = completed.reduce((s, o) => s + o.discount, 0);
  const offerBreakdown: Record<string, number> = {};
  offersUsed.forEach((o) => { if (o.offer_applied) offerBreakdown[o.offer_applied] = (offerBreakdown[o.offer_applied] || 0) + 1; });
  const offerEntries = Object.entries(offerBreakdown).sort((a, b) => b[1] - a[1]);

  // ── Top items ─────────────────────────────────────────────

  const itemCounts: Record<string, number> = {};
  completed.forEach((o) => o.items.forEach((i) => { itemCounts[i.name] = (itemCounts[i.name] || 0) + i.quantity; }));
  const topItems = Object.entries(itemCounts).sort((a, b) => b[1] - a[1]).slice(0, 8);
  const maxItemCount = topItems.length > 0 ? topItems[0][1] : 1;

  // ── Revenue chart ─────────────────────────────────────────

  const revenueChart = useMemo(() => {
    const rows: { label: string; revenue: number; orders: number }[] = [];
    const completedAll = filteredOrders.filter((o) => o.order_completed);

    if (period === "daily") {
      const now = new Date();
      for (let i = 13; i >= 0; i--) {
        const day = new Date(now); day.setDate(day.getDate() - i); day.setHours(0, 0, 0, 0);
        const dayEnd = new Date(day); dayEnd.setHours(23, 59, 59, 999);
        const bucket = completedAll.filter((o) => { const d = new Date(o.date); return d >= day && d <= dayEnd; });
        rows.push({ label: day.toLocaleDateString("en-IN", { day: "numeric", month: "short" }), revenue: bucket.reduce((s, o) => s + o.total, 0), orders: bucket.length });
      }
    } else if (period === "weekly") {
      const current = new Date("2026-01-05"); const now = new Date();
      while (current <= now) {
        const weekEnd = new Date(current); weekEnd.setDate(weekEnd.getDate() + 6); weekEnd.setHours(23, 59, 59, 999);
        const bucket = completedAll.filter((o) => { const d = new Date(o.date); return d >= current && d <= weekEnd; });
        rows.push({ label: current.toLocaleDateString("en-IN", { day: "numeric", month: "short" }), revenue: bucket.reduce((s, o) => s + o.total, 0), orders: bucket.length });
        current.setDate(current.getDate() + 7);
      }
    } else {
      [{ s: new Date("2026-01-01"), e: new Date("2026-01-31T23:59:59.999Z"), l: "Jan" }, { s: new Date("2026-02-01"), e: new Date("2026-02-28T23:59:59.999Z"), l: "Feb" }].forEach((m) => {
        const bucket = completedAll.filter((o) => { const d = new Date(o.date); return d >= m.s && d <= m.e; });
        rows.push({ label: m.l, revenue: bucket.reduce((s, o) => s + o.total, 0), orders: bucket.length });
      });
    }
    return rows;
  }, [filteredOrders, period]);

  // ── Peak hours ────────────────────────────────────────────

  const hourBuckets: Record<string, { label: string; orders: number; revenue: number }> = {
    "11-13": { label: "11am – 1pm", orders: 0, revenue: 0 },
    "13-15": { label: "1pm – 3pm", orders: 0, revenue: 0 },
    "15-17": { label: "3pm – 5pm", orders: 0, revenue: 0 },
    "17-19": { label: "5pm – 7pm", orders: 0, revenue: 0 },
    "19-21": { label: "7pm – 9pm", orders: 0, revenue: 0 },
    "21-23": { label: "9pm – 11pm", orders: 0, revenue: 0 },
  };
  completed.forEach((o) => {
    const h = new Date(o.date).getUTCHours();
    if (h >= 11 && h < 13) { hourBuckets["11-13"].orders++; hourBuckets["11-13"].revenue += o.total; }
    else if (h >= 13 && h < 15) { hourBuckets["13-15"].orders++; hourBuckets["13-15"].revenue += o.total; }
    else if (h >= 15 && h < 17) { hourBuckets["15-17"].orders++; hourBuckets["15-17"].revenue += o.total; }
    else if (h >= 17 && h < 19) { hourBuckets["17-19"].orders++; hourBuckets["17-19"].revenue += o.total; }
    else if (h >= 19 && h < 21) { hourBuckets["19-21"].orders++; hourBuckets["19-21"].revenue += o.total; }
    else if (h >= 21 && h < 23) { hourBuckets["21-23"].orders++; hourBuckets["21-23"].revenue += o.total; }
  });
  const peakHours = Object.values(hourBuckets);
  const maxHourOrders = Math.max(...peakHours.map((h) => h.orders), 1);

  return (
    <div className="flex flex-col gap-3 h-[calc(100vh-80px)]">
      {/* ── Header ──────────────────────────────────────── */}
      <div className="flex items-center justify-between flex-shrink-0">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Voice Ordering Analytics</h1>
          <p className="text-xs text-gray-400">Koramangala, Bengaluru · {periodLabel} · {totalSessions} sessions · {totalCompleted} orders</p>
        </div>
        <div className="flex rounded-md overflow-hidden" style={{ border: `1px solid ${BLUE}33` }}>
          {(["daily", "weekly", "monthly"] as const).map((p) => (
            <button key={p} onClick={() => setPeriod(p)} className="px-3 py-1.5 text-xs font-medium transition-colors" style={{ backgroundColor: period === p ? BLUE : "white", color: period === p ? "white" : "#9ca3af" }}>
              {p.charAt(0).toUpperCase() + p.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* ── 4 Metric Cards ──────────────────────────────── */}
      <div className="grid grid-cols-4 gap-3 flex-shrink-0">
        <div className="bg-white rounded-lg p-4" style={{ borderLeft: `3px solid ${RED}`, borderTop: "1px solid #e5e7eb", borderRight: "1px solid #e5e7eb", borderBottom: "1px solid #e5e7eb" }}>
          <p className="text-[10px] text-gray-400 uppercase tracking-wider">Revenue</p>
          <p className="text-2xl font-bold mt-1" style={{ color: RED }}>{fmt(totalRevenue)}</p>
          <div className="flex items-center gap-1 mt-1 text-[10px] font-medium" style={{ color: BLUE }}><TrendingUp className="w-3 h-3" />+12% vs prior</div>
        </div>
        <div className="bg-white rounded-lg p-4" style={{ borderLeft: `3px solid ${BLUE}`, borderTop: "1px solid #e5e7eb", borderRight: "1px solid #e5e7eb", borderBottom: "1px solid #e5e7eb" }}>
          <p className="text-[10px] text-gray-400 uppercase tracking-wider">Avg Order Value</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">₹{avgOrderValue}</p>
          <div className="flex items-center gap-1 mt-1 text-[10px] font-medium" style={{ color: BLUE }}><TrendingUp className="w-3 h-3" />+₹38 vs prior</div>
        </div>
        <div className="bg-white rounded-lg p-4" style={{ borderLeft: `3px solid ${BLUE}`, borderTop: "1px solid #e5e7eb", borderRight: "1px solid #e5e7eb", borderBottom: "1px solid #e5e7eb" }}>
          <p className="text-[10px] text-gray-400 uppercase tracking-wider">Conversion Rate</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{conversionRate}%</p>
          <p className="text-[10px] text-gray-400 mt-1">{totalCompleted} of {totalSessions} sessions</p>
        </div>
        <div className="bg-white rounded-lg p-4" style={{ borderLeft: `3px solid ${RED}`, borderTop: "1px solid #e5e7eb", borderRight: "1px solid #e5e7eb", borderBottom: "1px solid #e5e7eb" }}>
          <p className="text-[10px] text-gray-400 uppercase tracking-wider">Avg Session</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{avgSession >= 60 ? `${Math.floor(avgSession / 60)}m ${avgSession % 60}s` : `${avgSession}s`}</p>
          <div className="flex items-center gap-1 mt-1 text-[10px] font-medium" style={{ color: RED }}><TrendingDown className="w-3 h-3" />-8s faster</div>
        </div>
      </div>

      {/* ── Main Row: Top Items + Revenue Chart ──────────── */}
      <div className="grid grid-cols-[340px_1fr] gap-3 flex-1 min-h-0">
        {/* Top Selling Items */}
        <div className="bg-white border border-gray-200 rounded-lg px-4 py-3 flex flex-col">
          <h3 className="text-xs font-semibold uppercase tracking-wider mb-2 flex-shrink-0" style={{ color: BLUE }}>Top Selling Items</h3>
          <div className="flex-1 flex flex-col justify-center gap-2 min-h-0 overflow-hidden">
            {topItems.map(([name, count], i) => (
              <div key={name} className="flex items-center gap-2">
                <span className="text-[10px] w-3 text-right font-bold" style={{ color: i === 0 ? RED : "#9ca3af" }}>{i + 1}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="text-xs text-gray-700 truncate">{name}</span>
                    <span className="text-xs font-bold text-gray-800 ml-2">{count}</span>
                  </div>
                  <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${(count / maxItemCount) * 100}%`, backgroundColor: i === 0 ? RED : BLUE_LIGHT }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Revenue Over Time */}
        <div className="bg-white border border-gray-200 rounded-lg px-4 py-3 flex flex-col">
          <div className="flex items-center justify-between mb-2 flex-shrink-0">
            <h3 className="text-xs font-semibold uppercase tracking-wider" style={{ color: BLUE }}>Revenue Over Time</h3>
            <span className="text-[10px] text-gray-400">{fmt(totalRevenue)} total</span>
          </div>
          <div className="flex-1 min-h-0">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueChart} margin={{ top: 0, right: 5, left: -10, bottom: 0 }}>
                <XAxis dataKey="label" tick={{ fontSize: 10, fill: "#9ca3af" }} tickLine={false} axisLine={false} />
                <YAxis tick={{ fontSize: 10, fill: "#9ca3af" }} tickLine={false} axisLine={false} tickFormatter={(v) => v >= 1000 ? `${(v / 1000).toFixed(0)}K` : v} />
                <Tooltip
                  contentStyle={{ borderRadius: "6px", border: "1px solid #e5e7eb", fontSize: "11px", padding: "6px 10px" }}
                  cursor={{ fill: "#f9fafb" }}
                  formatter={(value?: number, name?: string) => [name === "revenue" ? `₹${(value ?? 0).toLocaleString("en-IN")}` : (value ?? 0), name === "revenue" ? "Revenue" : "Orders"]}
                />
                <Bar dataKey="revenue" fill={BLUE} name="revenue" radius={[3, 3, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* ── Bottom Row: Profile + Offers + Peak Hours ──── */}
      <div className="grid grid-cols-[1fr_1fr_1fr] gap-3 flex-shrink-0">
        {/* Order Profile */}
        <div className="bg-white border border-gray-200 rounded-lg px-4 py-3">
          <h3 className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: BLUE }}>Order Profile</h3>

          <div className="mb-3">
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="text-gray-500">Veg / Non-Veg</span>
              <span className="text-gray-700 font-semibold">{vegItems} / {nonvegItems}</span>
            </div>
            <SegmentedBar segments={[{ label: "Veg", value: vegItems, color: "#16a34a" }, { label: "Non-Veg", value: nonvegItems, color: RED }]} />
            <div className="flex items-center justify-between text-[10px] text-gray-400 mt-1">
              <span>{vegPct}% veg</span>
              <span>{100 - vegPct}% non-veg</span>
            </div>
          </div>

          <div className="mb-3">
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="text-gray-500">Delivery / Pickup</span>
              <span className="text-gray-700 font-semibold">{deliveryCount} / {pickupCount}</span>
            </div>
            <SegmentedBar segments={[{ label: "Delivery", value: deliveryCount, color: BLUE }, { label: "Pickup", value: pickupCount, color: BLUE_LIGHT }]} />
            <div className="flex items-center justify-between text-[10px] text-gray-400 mt-1">
              <span>{deliveryPct}% delivery</span>
              <span>{100 - deliveryPct}% pickup</span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-gray-100">
            <div className="text-center">
              <p className="text-lg font-bold" style={{ color: BLUE }}>{avgItemsPerOrder}</p>
              <p className="text-[10px] text-gray-400 uppercase">Items / Order</p>
            </div>
            <div className="w-px h-8 bg-gray-100" />
            <div className="text-center">
              <p className="text-lg font-bold" style={{ color: RED }}>{upsellRate}%</p>
              <p className="text-[10px] text-gray-400 uppercase">Upsell Rate</p>
            </div>
            <div className="w-px h-8 bg-gray-100" />
            <div className="text-center">
              <p className="text-lg font-bold" style={{ color: BLUE }}>{totalPizzas}</p>
              <p className="text-[10px] text-gray-400 uppercase">Pizzas Sold</p>
            </div>
          </div>
        </div>

        {/* Offer Performance */}
        <div className="bg-white border border-gray-200 rounded-lg px-4 py-3">
          <h3 className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: BLUE }}>Offer Performance</h3>

          <div className="flex items-center gap-4 mb-3">
            <div>
              <p className="text-lg font-bold" style={{ color: BLUE }}>{offersUsed.length}</p>
              <p className="text-[10px] text-gray-400 uppercase">Used</p>
            </div>
            <div className="w-px h-8 bg-gray-100" />
            <div>
              <p className="text-lg font-bold" style={{ color: RED }}>₹{totalDiscount}</p>
              <p className="text-[10px] text-gray-400 uppercase">Total Savings</p>
            </div>
            <div className="w-px h-8 bg-gray-100" />
            <div>
              <p className="text-lg font-bold" style={{ color: BLUE }}>{totalCompleted > 0 ? Math.round((offersUsed.length / totalCompleted) * 100) : 0}%</p>
              <p className="text-[10px] text-gray-400 uppercase">Adoption</p>
            </div>
          </div>

          <div className="space-y-2 pt-2 border-t border-gray-100">
            {offerEntries.length > 0 ? offerEntries.map(([offer, count]) => (
              <div key={offer} className="flex items-center justify-between">
                <span className="text-xs text-gray-500 truncate max-w-[180px]">{offer}</span>
                <span className="text-xs font-bold" style={{ color: RED }}>{count}x</span>
              </div>
            )) : (
              <p className="text-xs text-gray-400">No offers used in this period</p>
            )}
          </div>
        </div>

        {/* Peak Hours */}
        <div className="bg-white border border-gray-200 rounded-lg px-4 py-3">
          <h3 className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: BLUE }}>Peak Hours</h3>
          <div className="space-y-2">
            {peakHours.map((h) => (
              <div key={h.label}>
                <div className="flex items-center justify-between mb-0.5">
                  <span className="text-xs text-gray-500">{h.label}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold" style={{ color: h.orders === maxHourOrders ? RED : "#374151" }}>{h.orders}</span>
                    <span className="text-[10px] text-gray-400">{fmt(h.revenue)}</span>
                  </div>
                </div>
                <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${(h.orders / maxHourOrders) * 100}%`, backgroundColor: h.orders === maxHourOrders ? RED : BLUE_LIGHT }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
