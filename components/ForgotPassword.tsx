"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import Image from "next/image"

export default function ForgotPassword() {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Login form submitted:", formData)
    // Handle form submission here
  }

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="min-h-screen bg-[#005072] relative overflow-hidden flex items-center justify-center p-4">
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Left top blur ellipse */}
        <div
          className="absolute -left-96 top-28 w-[656px] h-[382px] rounded-full opacity-35"
          style={{
            background: "linear-gradient(245.88deg, rgba(44, 131, 202, 0.35) 33.66%, rgba(0, 80, 114, 0.35) 74.45%)",
            filter: "blur(58px)",
          }}
        />

        {/* Left bottom blur ellipse */}
        <div
          className="absolute -left-64 bottom-32 w-[561px] h-[325px] rounded-full opacity-35"
          style={{
            background: "linear-gradient(245.88deg, rgba(147, 207, 255, 0.35) 33.66%, rgba(0, 80, 114, 0.35) 74.45%)",
            filter: "blur(58px)",
          }}
        />

        {/* Right blur ellipse */}
        <div
          className="absolute -right-96 top-14 w-[539px] h-[292px] rounded-full opacity-35 transform rotate-[167deg]"
          style={{
            background: "linear-gradient(245.88deg, rgba(152, 209, 255, 0.35) 33.66%, rgba(0, 80, 114, 0.35) 74.45%)",
            filter: "blur(58px)",
          }}
        />
      </div>

      <div className="relative w-full max-w-lg">
        {/* Logo */}
        <div className="flex items-center justify-center mb-18">
          <div className="flex items-baseline gap-1">
            <Link href="/" className="flex items-baseline space-x-0">
              <Image src='/images/loan_logo.png' width={180} height={64} alt='loan Simulator logo' />
            </Link>
          </div>
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-lg p-10 shadow-2xl">
          <div className="space-y-8">
            {/* Header */}
            <div>
              <h1 className="text-[#1E1E1E] text-2xl lg:text-3xl font-bold leading-tight">Recover your password</h1>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Form Fields */}
              <div className="space-y-6">
                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-black text-lg font-medium">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="h-12 border-[#D6D6D6] text-base"
                    required
                  />
                </div>


              </div>


              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full h-12 bg-[#8FC920] hover:bg-[#7FB519] text-white text-base font-bold rounded-md transition-colors"
              >
                Continue
              </Button>
            </form>

            {/* Sign Up Link */}
            <div className="text-center pt-4">
              <p className="text-[#1E1E1E] text-base font-medium">
                Remember your password ?{" "}
                <Link href="/login" className="text-[#8FC920] hover:text-[#7FB519] font-semibold">
                  Signin
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
