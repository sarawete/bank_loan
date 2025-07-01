"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { LoanSubmissionDialog } from "@/components/loan-submission-dialog"

const Page = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  return (
    <div className="flex-1 space-y-8 p-6">
      <div className="space-y-1 px-12">
        <h1 className="text-2xl font-bold text-black">My submissions</h1>
        <p className="text-base text-[#4B4B4B]">Create your loan submissions here</p>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 items-center justify-center">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="relative h-52 w-44 sm:h-64 sm:w-80">
            <Image src="/images/no-data.png" alt="No data available" fill className="object-contain" />
          </div>
          <p className="max-w-md text-base text-[#4B4B4B]">No submission found.</p>
        </div>
      </div>

      <div className="flex flex-col items-center text-center">
        <Button
          onClick={() => setIsDialogOpen(true)}
          className="bg-primary-500 hover:bg-primary-600 text-white font-bold px-6 py-3"
        >
          New
        </Button>
      </div>

      <LoanSubmissionDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
    </div>
  )
}

export default Page
