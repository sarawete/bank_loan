
import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import submissionsData from '@/data/submissions.json';
import { notFound } from 'next/navigation';

interface Submission {
  id: string;
  submittedAt: string;
  status: 'pending' | 'approved' | 'rejected' | 'under-review';
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  employmentStatus: string;
  employer: string;
  jobTitle: string;
  monthlyIncome: string;
  employmentDuration: string;
  monthlyExpenses: string;
  existingLoans: string;
  loanAmount: string;
  loanDuration: string;
  loanPurpose: string;
  additionalInfo: string;
  uploadedFiles: string[];
}

export default async function SubmissionDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  const submission: Submission | undefined = submissionsData
    .map(s => ({
      ...s,
      status: s.status as Submission['status'],
    }))
    .find(s => s.id === id);

  if (!submission) {
    return notFound();
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatCurrency = (amount: string) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'XAF'
    }).format(Number(amount));
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="secondary">Pending</Badge>;
      case 'approved':
        return <Badge className="bg-green-500 hover:bg-green-600">Approved</Badge>;
      case 'rejected':
        return <Badge className="bg-red-500 hover:bg-red-600">Rejected</Badge>;
      case 'under-review':
        return <Badge className="bg-blue-500 hover:bg-blue-600">Under Review</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <Link href="/submissions" className="text-sm text-secondary-600 hover:underline">
            ← Back to all submissions
          </Link>
          <h1 className="text-2xl font-bold mt-2">Submission #{submission.id.slice(-6)}</h1>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">Print</Button>
          <Button variant="destructive">Reject</Button>
          <Button className='bg-primary-500 hover:bg-primary-600'>Approve</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Personal Information */}
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Full Name</p>
                <p className="font-medium">{`${submission.firstName} ${submission.lastName}`}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Date of Birth</p>
                <p className="font-medium">{formatDate(submission.dateOfBirth)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium">{submission.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Phone</p>
                <p className="font-medium">{submission.phone}</p>
              </div>
            </CardContent>
          </Card>

          {/* Professional Information */}
          <Card>
            <CardHeader>
              <CardTitle>Professional Information</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Employment Status</p>
                <p className="font-medium capitalize">{submission.employmentStatus}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Employer</p>
                <p className="font-medium">{submission.employer}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Job Title</p>
                <p className="font-medium">{submission.jobTitle}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Monthly Income</p>
                <p className="font-medium">{formatCurrency(submission.monthlyIncome)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Employment Duration</p>
                <p className="font-medium">{submission.employmentDuration} months</p>
              </div>
            </CardContent>
          </Card>

          {/* Loan Details */}
          <Card>
            <CardHeader>
              <CardTitle>Loan Details</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Requested Amount</p>
                <p className="font-medium">{formatCurrency(submission.loanAmount)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Loan Duration</p>
                <p className="font-medium">{submission.loanDuration} months</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Loan Purpose</p>
                <p className="font-medium capitalize">{submission.loanPurpose}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Monthly Expenses</p>
                <p className="font-medium">{formatCurrency(submission.monthlyExpenses)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Existing Loans</p>
                <p className="font-medium">{formatCurrency(submission.existingLoans)}</p>
              </div>
            </CardContent>
          </Card>

          {/* Additional Information */}
          {submission.additionalInfo && (
            <Card>
              <CardHeader>
                <CardTitle>Additional Information</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="whitespace-pre-line">{submission.additionalInfo}</p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Submission Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">Submission ID</p>
                <p className="font-medium">{submission.id}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Submitted At</p>
                <p className="font-medium">{formatDate(submission.submittedAt)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Status</p>
                <div className="mt-1">{getStatusBadge(submission.status)}</div>
              </div>
            </CardContent>
          </Card>

          {/* Documents */}
          <Card>
            <CardHeader>
              <CardTitle>Documents</CardTitle>
            </CardHeader>
            <CardContent>
              {submission.uploadedFiles.length > 0 ? (
                <div className="space-y-2">
                  {submission.uploadedFiles.map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-2 border rounded">
                      <span className="text-sm truncate">{file}</span>
                      <Button variant="ghost" size="sm">
                        Download
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500">No documents uploaded</p>
              )}
            </CardContent>
          </Card>

          {/* Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button className="w-full bg-primary-500 hover:bg-primary-600">Approve Application</Button>
              <Button variant="destructive" className="w-full">
                Reject Application
              </Button>
              <Button variant="outline" className="w-full">
                Request More Information
              </Button>
              <Button variant="outline" className="w-full">
                Contact Applicant
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}