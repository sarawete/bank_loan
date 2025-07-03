
'use client'
import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import submissionsDataRaw from '@/data/submissions.json';
import { useAuth } from '@/hooks/use-auth';

interface Submission {
  id: string;
  submittedAt: string;
  status: 'pending' | 'approved' | 'rejected' | 'under-review';
  userId: string;
  firstName: string;
  lastName: string;
  loanAmount: string;
  loanDuration: string;
  loanPurpose: string;
  // Autres champs...
}

export default function Page() {
  const { user, isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <div>Please login to access this page</div>;
  }

  const submissionsData: Submission[] = submissionsDataRaw as Submission[];
  const allSubmissions: Submission[] = submissionsData.map((s) => ({
    ...s,
    status: s.status as Submission['status'],
  }));

  const submissions = user
    ? allSubmissions.filter(submission => submission.userId === user.id)
    : [];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="secondary" className="bg-gray-200 text-primary-600 ">Pending</Badge>;
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatCurrency = (amount: string) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'XAF'
    }).format(Number(amount));
  };

  return (
    <div className="container mx-auto py-8 ">
      <div className="flex justify-between items-center mb-6">      
        <div className="space-y-1 ">
        <h1 className="text-2xl font-bold text-black">Dashboard</h1>
        <p className="text-base text-[#4B4B4B]">
          View your loan submissions and their statuses
        </p>
      </div>
        <div className="flex space-x-2">
          <Button className='bg-primary-500 hover:bg-primary-600 text-white '>Export</Button>
        </div>
      </div>

      <div className=' bg-slate-100 px-16 py-12 rounded-xs min-h-[500px]'>
              <Card >
        <CardHeader>
          <CardTitle>My Submissions</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Submitted At</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Loan Amount</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {submissions.map((submission) => (
                <TableRow key={submission.id}>
                  <TableCell className="font-medium">{submission.id.slice(-6)}</TableCell>
                  <TableCell>{formatDate(submission.submittedAt)}</TableCell>
                  <TableCell>{`${submission.firstName} ${submission.lastName}`}</TableCell>
                  <TableCell>{formatCurrency(submission.loanAmount)}</TableCell>
                  <TableCell>{submission.loanDuration} months</TableCell>
                  <TableCell>{getStatusBadge(submission.status)}</TableCell>
                  <TableCell>
                    <Link href={`/submissions/${submission.id}`}>
                      <Button variant="outline" size="sm">
                        View
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Submissions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{submissions.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {submissions.filter(s => s.status === 'pending').length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Approved</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {submissions.filter(s => s.status === 'approved').length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Rejected</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {submissions.filter(s => s.status === 'rejected').length}
            </div>
          </CardContent>
        </Card>
      </div>
      </div>


    </div>
  );
}