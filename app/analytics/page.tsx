"use client";

import Link from "next/link";
import { ArrowLeft, Mic } from "lucide-react";
import { OrderAnalytics } from "@/components/order-analytics";

export default function AnalyticsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-1.5 text-sm text-dominos-medium hover:text-dominos-blue transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Back
            </Link>
            <div className="w-px h-5 bg-gray-200" />
            <div className="flex items-center gap-2">
              <span className="text-2xl font-extrabold text-dominos-red">domino&apos;s</span>
              <span className="text-sm text-dominos-medium font-medium">Analytics</span>
            </div>
          </div>
          <Link
            href="/demo"
            className="inline-flex items-center gap-2 px-4 py-2 bg-dominos-red text-white text-sm font-semibold rounded-full hover:bg-red-700 transition-colors"
          >
            <Mic className="w-4 h-4" />
            Try Demo
          </Link>
        </div>
      </nav>

      <div className="pt-14 px-5 py-4 h-screen overflow-hidden">
        <OrderAnalytics />
      </div>
    </div>
  );
}
