"use client";

import { Search, Bell, UserRound, Globe, ChevronUp } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import Link from "next/link";

export function DashboardHeader() {
  return (
    <header className="flex h-19 items-center justify-between border-b border-[#E4E4E4] bg-white px-6 py-4">
      <div className="flex items-center gap-6">
        <SidebarTrigger className="h-6 w-6 text-[#1E1E1E]" />

        {/* Search Bar */}
        <div className="relative w-80 hidden sm:flex">
          <div className="flex items-center gap-4 rounded-lg bg-[#ECECEC] px-4 py-2">
            <span className="text-[#686868] text-base font-medium flex-1">
              Search anything...
            </span>
            <Search className="h-6 w-6 text-[#686868]" />
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4 sm:gap-10">
        {/* Notifications */}
        <div className="relative">
          <Link href="/notifications"><Bell className="h-7 w-7 text-[#4B4B4B]" /></Link>
          <div className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-[#DE3D31] text-xs font-normal text-white">
            4
          </div>
        </div>

        {/* User Profile */}
        <div className="flex items-center">
          <UserRound className="h-7 w-7 text-[#4B4B4B]" />
{/*         <span className="text-primary-500 text-base font-medium">
            Sara Nguepnang
          </span> */}
        </div>

        {/* Language Selector */}
        <div className="flex items-center gap-2">
          <Globe className="h-7 w-7 text-[#4B4B4B]" />
          <div className="hidden md:flex items-center gap-1">
            <span className="text-[#4B4B4B] text-base font-medium">
              English
            </span>
            <ChevronUp className="h-6 w-6 text-[#4B4B4B] rotate-180" />
          </div>
          <div className="flex md:hidden items-center gap-1">
            <span className="text-[#4B4B4B] text-base font-medium">
              EN
            </span>
            <ChevronUp className="h-6 w-6 text-[#4B4B4B] rotate-180" />
          </div>
        </div>
      </div>
    </header>
  );
}
