"use client";

import { MapPin } from "lucide-react";
import Link from "next/link";

export function Header() {
  return (
    <header className="bg-dominos-blue text-white">
      <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-white rounded flex items-center justify-center">
            <div className="grid grid-cols-2 gap-0.5">
              <div className="w-2.5 h-2.5 rounded-sm bg-dominos-red" />
              <div className="w-2.5 h-2.5 rounded-sm bg-dominos-blue" />
              <div className="w-2.5 h-2.5 rounded-sm bg-dominos-blue" />
              <div className="w-2.5 h-2.5 rounded-sm bg-dominos-red" />
            </div>
          </div>
          <span className="text-lg font-extrabold tracking-tight">
            PIZZA VOICE AI
          </span>
        </Link>

        {/* Location */}
        <div className="flex items-center gap-1.5 text-sm text-white/80">
          <MapPin className="w-3.5 h-3.5" />
          <span>Koramangala, Bengaluru</span>
        </div>
      </div>
    </header>
  );
}
