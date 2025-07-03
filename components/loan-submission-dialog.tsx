"use client"

import React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useAuth } from "@/hooks/use-auth"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Upload, X } from "lucide-react"

const loanSubmissionSchema = z.object({
  // Personal information
  firstName: z.string().min(2, "First name must contain at least 2 characters"),
  lastName: z.string().min(2, "Last name must contain at least 2 characters"),
  email: z.string().email("Invalid email"),
  phone: z.string().min(10, "Invalid phone number"),
  dateOfBirth: z.string().min(1, "Date of birth required"),

  // Professional information
  employmentStatus: z.string().min(1, "Employment status required"),
  employer: z.string().min(1, "Employer required"),
  jobTitle: z.string().min(1, "Job title required"),
  monthlyIncome: z.string().min(1, "Monthly income required"),
  employmentDuration: z.string().min(1, "Employment duration required"),

  // Financial information
  monthlyExpenses: z.string().min(1, "Monthly expenses required"),
  existingLoans: z.string().optional(),

  // Loan details
  loanAmount: z.string().min(1, "Loan amount required"),
  loanDuration: z.string().min(1, "Loan duration required"),
  loanPurpose: z.string().min(1, "Loan purpose required"),

  // Additional information
  additionalInfo: z.string().optional(),
})

type LoanSubmissionForm = z.infer<typeof loanSubmissionSchema>

interface LoanSubmissionDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function LoanSubmissionDialog({ open, onOpenChange }: LoanSubmissionDialogProps) {
  const [uploadedFiles, setUploadedFiles] = React.useState<File[]>([])
  const { user, isAuthenticated } = useAuth()

  const form = useForm<LoanSubmissionForm>({
    resolver: zodResolver(loanSubmissionSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      dateOfBirth: "",
      employmentStatus: "",
      employer: "",
      jobTitle: "",
      monthlyIncome: "",
      employmentDuration: "",
      monthlyExpenses: "",
      existingLoans: "",
      loanAmount: "",
      loanDuration: "",
      loanPurpose: "",
      additionalInfo: "",
    },
  })

  const onSubmit = async (data: LoanSubmissionForm) => {
    // Check if user is authenticated
    if (!isAuthenticated) {
      alert("Please login to submit a loan application.")
      return
    }

    try {
      const submissionData = {
        ...data,
        uploadedFiles: uploadedFiles.map(file => file.name),
      }

      const response = await fetch('/api/submissions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData),
      })

      const result = await response.json()

      if (result.success) {
        onOpenChange(false)
        form.reset()
        setUploadedFiles([])
        alert("Loan application submitted successfully!")
      } else {
        throw new Error(result.message)
      }
    } catch (error) {
      console.error("Error submitting loan application:", error)
      alert("Submission error. Please try again.")
    }
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    setUploadedFiles((prev) => [...prev, ...files])
  }

  const removeFile = (index: number) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index))
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>New Loan Application</DialogTitle>
          <DialogDescription>
            <span className="text-secondary-600">Complete this form to submit your loan application.</span>
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="max-h-[70vh] pr-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Personal Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Personal Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First Name *</FormLabel>
                        <FormControl>
                          <Input placeholder="Your first name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last Name *</FormLabel>
                        <FormControl>
                          <Input placeholder="Your last name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email *</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="your@email.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone *</FormLabel>
                        <FormControl>
                          <Input placeholder="0123456789" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="dateOfBirth"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Date of Birth *</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <Separator />

              {/* Professional Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Professional Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="employmentStatus"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Employment Status *</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select your status" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="employee">Employee</SelectItem>
                            <SelectItem value="self-employed">Self-employed</SelectItem>
                            <SelectItem value="civil-servant">Civil Servant</SelectItem>
                            <SelectItem value="retired">Retired</SelectItem>
                            <SelectItem value="student">Student</SelectItem>
                            <SelectItem value="unemployed">Unemployed</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="employer"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Employer *</FormLabel>
                        <FormControl>
                          <Input placeholder="Your employer's name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="jobTitle"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Job Title *</FormLabel>
                        <FormControl>
                          <Input placeholder="Your position" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="monthlyIncome"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Monthly Net Income (XAF) *</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="300000" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="employmentDuration"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Employment Duration (months) *</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="24" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <Separator />

              {/* Financial Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Financial Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="monthlyExpenses"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Monthly Expenses (XAF) *</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="150000" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="existingLoans"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Existing Loans (XAF/month)</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="50000" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <Separator />

              {/* Loan Details */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Loan Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="loanAmount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Requested Amount (XAF) *</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="5000000" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="loanDuration"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Requested Duration (months) *</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="120" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="loanPurpose"
                    render={({ field }) => (
                      <FormItem className="md:col-span-2">
                        <FormLabel>Loan Purpose *</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select loan purpose" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="real-estate">Real Estate</SelectItem>
                            <SelectItem value="car">Vehicle</SelectItem>
                            <SelectItem value="renovation">Renovation</SelectItem>
                            <SelectItem value="personal">Personal</SelectItem>
                            <SelectItem value="consolidation">Debt Consolidation</SelectItem>
                            <SelectItem value="business">Business</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <Separator />

              {/* Documents */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Supporting Documents</h3>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                  <div className="text-center">
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="mt-4">
                      <label htmlFor="file-upload" className="cursor-pointer">
                        <span className="mt-2 block text-sm font-medium text-gray-900">
                          Click to upload your documents
                        </span>
                        <span className="mt-1 block text-xs text-gray-500">PDF, JPG, PNG up to 10MB</span>
                      </label>
                      <input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        className="sr-only"
                        multiple
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={handleFileUpload}
                      />
                    </div>
                  </div>
                </div>

                {uploadedFiles.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Uploaded files:</p>
                    <div className="flex flex-wrap gap-2">
                      {uploadedFiles.map((file, index) => (
                        <Badge key={index} variant="secondary" className="flex items-center gap-2">
                          {file.name}
                          <button type="button" onClick={() => removeFile(index)} className="ml-1 hover:text-red-500">
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <Separator />

              {/* Additional Information */}
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="additionalInfo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Additional Information</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Add any information you find useful for your application..."
                          className="min-h-[100px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Action Buttons */}
              <div className="flex justify-between space-x-4 pt-4">
                <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-primary-500 hover:bg-primary-600"
                  disabled={form.formState.isSubmitting}
                >
                  {form.formState.isSubmitting ? "Submitting..." : "Submit Application"}
                </Button>
              </div>
            </form>
          </Form>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}