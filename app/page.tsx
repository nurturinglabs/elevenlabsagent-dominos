import Link from "next/link";
import {
  Mic,
  ShoppingCart,
  Globe,
  Zap,
  Tag,
  LayoutGrid,
  ArrowRight,
  Phone,
  IndianRupee,
  Clock,
  Store,
  Pizza,
  TrendingUp,
  Bot,
  Sparkles,
  ChevronRight,
} from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-dominos-dark">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-white via-red-50 to-white">
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-dominos-red" />
          <div className="absolute bottom-20 right-10 w-48 h-48 rounded-full bg-dominos-blue" />
          <div className="absolute top-40 right-1/3 w-24 h-24 rounded-full bg-dominos-red" />
        </div>

        <div className="relative max-w-6xl mx-auto px-6 pt-16 pb-20">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-red-50 border border-red-100 rounded-full text-sm text-dominos-red font-semibold mb-6">
              <Sparkles className="w-4 h-4" />
              ElevenLabs Conversational AI Demo
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
              What if you could{" "}
              <span className="text-dominos-red">order pizza</span>
              <br />
              <span className="text-dominos-blue">by just talking?</span>
            </h1>

            <p className="mt-6 text-lg sm:text-xl text-dominos-medium max-w-2xl mx-auto leading-relaxed">
              A voice AI agent that takes your full pizza order — browses the menu,
              adds to cart, applies offers, and places the order — all through
              natural conversation.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/demo"
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-dominos-red text-white font-bold rounded-full text-lg shadow-lg shadow-red-200 hover:bg-red-700 transition-all hover:scale-105"
              >
                <Mic className="w-5 h-5" />
                Try the Demo
                <ArrowRight className="w-5 h-5" />
              </Link>
              <a
                href="#how-it-works"
                className="inline-flex items-center gap-2 px-6 py-3 text-dominos-medium font-semibold hover:text-dominos-dark transition-colors"
              >
                See how it works
                <ChevronRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Scale Numbers */}
          <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-3xl mx-auto">
            {[
              { icon: Store, value: "2,000+", label: "Stores in India" },
              { icon: Pizza, value: "1M+", label: "Daily Orders" },
              { icon: Phone, value: "50K+", label: "Daily Support Calls" },
              { icon: Clock, value: "22 min", label: "Avg Delivery Time" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="text-center p-4 rounded-xl bg-white/80 border border-gray-100 shadow-sm"
              >
                <stat.icon className="w-5 h-5 mx-auto text-dominos-red mb-2" />
                <p className="text-2xl font-extrabold text-dominos-dark">
                  {stat.value}
                </p>
                <p className="text-xs text-dominos-medium mt-0.5">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Voice Ordering */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-extrabold">
              Why <span className="text-dominos-red">voice ordering</span>{" "}
              changes everything
            </h2>
            <p className="mt-3 text-dominos-medium max-w-xl mx-auto">
              The next frontier in QSR isn&apos;t another app redesign — it&apos;s
              removing the screen entirely.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: TrendingUp,
                title: "Higher AOV",
                desc: "Voice agents naturally suggest add-ons, combos, and upgrades during conversation — driving 15-20% higher average order value.",
              },
              {
                icon: Globe,
                title: "New Segments",
                desc: "Non-English speakers, elderly users, and busy drivers can order effortlessly through natural voice in their language.",
              },
              {
                icon: Bot,
                title: "Natural Language",
                desc: '"I want a large pepperoni with extra cheese and a Coke" — one sentence replaces 8+ taps across 4 screens.',
              },
              {
                icon: Phone,
                title: "Replace IVR Calls",
                desc: "50K+ daily support calls can be handled by AI that actually understands orders, applies coupons, and confirms in real-time.",
              },
            ].map((card) => (
              <div
                key={card.title}
                className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-lg hover:border-red-200 transition-all"
              >
                <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center mb-4">
                  <card.icon className="w-5 h-5 text-dominos-red" />
                </div>
                <h3 className="font-bold text-lg mb-2">{card.title}</h3>
                <p className="text-sm text-dominos-medium leading-relaxed">
                  {card.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-extrabold">
              How the <span className="text-dominos-blue">voice agent</span>{" "}
              works
            </h2>
            <p className="mt-3 text-dominos-medium max-w-xl mx-auto">
              A single WebRTC connection handles the entire order — from speech
              to confirmation.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch gap-4">
            {[
              {
                step: "1",
                title: "Speak",
                desc: "Customer speaks their order naturally",
                color: "bg-dominos-red",
              },
              {
                step: "2",
                title: "AI Parses",
                desc: "STT + LLM extracts items, sizes, toppings",
                color: "bg-dominos-blue",
              },
              {
                step: "3",
                title: "Menu Highlights",
                desc: "Items scroll into view on the live menu",
                color: "bg-dominos-red",
              },
              {
                step: "4",
                title: "Cart Updates",
                desc: "Real-time cart with prices and offers",
                color: "bg-dominos-blue",
              },
              {
                step: "5",
                title: "Order Placed",
                desc: "Confirmed order with delivery tracking",
                color: "bg-dominos-red",
              },
            ].map((item, i) => (
              <div key={item.step} className="flex-1 flex items-start gap-3">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full ${item.color} text-white font-bold flex items-center justify-center text-sm shrink-0`}
                  >
                    {item.step}
                  </div>
                  {i < 4 && (
                    <div className="hidden sm:block w-px h-full bg-gray-200 mt-1" />
                  )}
                </div>
                <div className="pb-6 sm:pb-0">
                  <p className="font-bold text-sm">{item.title}</p>
                  <p className="text-xs text-dominos-medium mt-0.5">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Features */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-extrabold">
              What this demo{" "}
              <span className="text-dominos-red">showcases</span>
            </h2>
            <p className="mt-3 text-dominos-medium max-w-xl mx-auto">
              Built on ElevenLabs Conversational AI with client tools for live UI
              orchestration.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: LayoutGrid,
                title: "Full Menu Navigation",
                desc: "AI browses 20+ items across categories — pizzas, sides, beverages, desserts — with size and crust options.",
              },
              {
                icon: IndianRupee,
                title: "Real-Time Pricing",
                desc: "Cart calculates dynamically with GST, delivery fees, and quantity pricing as items are added via voice.",
              },
              {
                icon: Zap,
                title: "Live UI Updates",
                desc: "Client tools update the cart, highlight menu items, and scroll to selections — all while the agent speaks.",
              },
              {
                icon: Tag,
                title: "Offer Engine",
                desc: "AI checks and applies discount coupons, shows savings banners, and suggests better deals during ordering.",
              },
              {
                icon: Globe,
                title: "Multilingual Ready",
                desc: "ElevenLabs supports 31 languages — enabling voice ordering in Hindi, Tamil, Telugu, and more.",
              },
              {
                icon: ShoppingCart,
                title: "End-to-End Order",
                desc: "Complete flow from browsing to cart to order confirmation with pizza tracker — no manual steps needed.",
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-lg hover:border-blue-200 transition-all"
              >
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center mb-4">
                  <feature.icon className="w-5 h-5 text-dominos-blue" />
                </div>
                <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
                <p className="text-sm text-dominos-medium leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Business Case */}
      <section className="py-20 px-6 bg-dominos-blue text-white">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold">
            The business case for voice ordering
          </h2>
          <p className="mt-3 text-blue-100 max-w-xl mx-auto">
            Conservative estimates based on Domino&apos;s India&apos;s scale and
            industry benchmarks.
          </p>

          <div className="mt-12 grid sm:grid-cols-3 gap-8">
            {[
              {
                value: "15–20%",
                label: "Higher AOV",
                detail: "From AI-driven upselling and combo suggestions",
              },
              {
                value: "₹67–90L",
                label: "Daily Revenue Lift",
                detail: "If 10% of orders shift to voice channel",
              },
              {
                value: "70%",
                label: "Call Automation",
                detail: "Reducing cost-per-call from ₹25 to under ₹3",
              },
            ].map((metric) => (
              <div key={metric.label}>
                <p className="text-4xl sm:text-5xl font-extrabold">
                  {metric.value}
                </p>
                <p className="text-lg font-bold mt-2">{metric.label}</p>
                <p className="text-sm text-blue-200 mt-1">{metric.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Architecture */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-extrabold">
              Why <span className="text-dominos-blue">ElevenLabs</span>
            </h2>
            <p className="mt-3 text-dominos-medium max-w-xl mx-auto">
              The technical advantages that make this possible at pizza-ordering
              speed.
            </p>
          </div>

          <div className="space-y-4">
            {[
              {
                title: "Sub-second latency",
                desc: "Single WebRTC connection handles STT → LLM → tool execution → TTS. No HTTP round-trips between stages — critical for real-time ordering where pauses kill the experience.",
              },
              {
                title: "Client tools for live UI",
                desc: "Unlike server-side webhooks, client tools execute directly in the browser. The agent calls add_to_cart or highlight_menu_item and the UI updates instantly while the agent continues speaking.",
              },
              {
                title: "Natural-sounding voice",
                desc: "ElevenLabs TTS produces voices that sound human, not robotic. For a brand like Domino's, voice quality directly impacts trust and order completion rates.",
              },
              {
                title: "31-language support",
                desc: "India's linguistic diversity requires more than Hindi and English. ElevenLabs supports 31 languages out of the box — enabling voice ordering in Tamil, Telugu, Bengali, and more.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="flex gap-4 p-5 rounded-xl border border-gray-200 hover:border-blue-200 hover:bg-blue-50/30 transition-all"
              >
                <div className="w-2 h-2 rounded-full bg-dominos-blue mt-2 shrink-0" />
                <div>
                  <h3 className="font-bold">{item.title}</h3>
                  <p className="text-sm text-dominos-medium mt-1 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6 bg-dominos-red text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold">
            Ready to order by voice?
          </h2>
          <p className="mt-3 text-red-100 max-w-md mx-auto">
            Try the live demo — speak your order and watch the AI build your
            cart in real-time.
          </p>
          <Link
            href="/demo"
            className="mt-8 inline-flex items-center gap-2 px-10 py-4 bg-white text-dominos-red font-bold rounded-full text-lg shadow-lg hover:bg-gray-50 transition-all hover:scale-105"
          >
            <Mic className="w-5 h-5" />
            Launch Demo
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-6 px-6 text-center">
        <p className="text-xs text-dominos-medium">
          Portfolio Demo &middot; Not affiliated with Domino&apos;s Pizza &middot;
          Built with{" "}
          <span className="text-dominos-red font-medium">ElevenLabs</span>{" "}
          &middot; 2026
        </p>
      </footer>
    </div>
  );
}
