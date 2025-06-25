"use client"

import Image from "next/image"

export function DashboardContent() {
  return (
    <div className="flex-1 space-y-8 p-6">
      {/* Page Header */}
      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-black">Dashboard</h1>
        <p className="text-base text-[#4B4B4B]">
          View your farm's performance at a glance, including device stats and AI insights.
        </p>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 items-center justify-center">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="relative h-56 w-64">
            <Image
              src="/images/no-data.png"
              alt="No data available"
              fill
              className="object-contain"
            />
          </div>
          <p className="max-w-md text-base text-[#4B4B4B]">
            No data available yet—start exploring to see updates here.
          </p>
        </div>
      </div>
    </div>
  )
}
