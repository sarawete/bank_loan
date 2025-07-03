import { NextRequest, NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'
import { getCurrentUser } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    // Get current user from session
    const currentUser = await getCurrentUser()
    
    if (!currentUser) {
      return NextResponse.json(
        { success: false, message: 'User not authenticated' },
        { status: 401 }
      )
    }

    const submissionData = await request.json()
    
    const submissionWithId = {
      id: Date.now().toString(),
      submittedAt: new Date().toISOString(),
      status: 'pending',
      userId: currentUser.id,
      userEmail: currentUser.email,
      ...submissionData
    }

    const filePath = path.join(process.cwd(), 'data', 'submissions.json')
    
    let submissions = []
    try {
      const fileContent = await fs.readFile(filePath, 'utf8')
      submissions = JSON.parse(fileContent)
    } catch (error) {
      submissions = []
    }

    submissions.push(submissionWithId)
    
    await fs.writeFile(filePath, JSON.stringify(submissions, null, 2))

    return NextResponse.json({ 
      success: true, 
      message: 'Submission saved successfully',
      id: submissionWithId.id 
    })
  } catch (error) {
    console.error('Error saving submission:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to save submission' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    // Get current user from session
    const currentUser = await getCurrentUser()
    
    if (!currentUser) {
      return NextResponse.json(
        { success: false, message: 'User not authenticated' },
        { status: 401 }
      )
    }

    const filePath = path.join(process.cwd(), 'data', 'submissions.json')
    
    let submissions = []
    try {
      const fileContent = await fs.readFile(filePath, 'utf8')
      submissions = JSON.parse(fileContent)
    } catch (error) {
      submissions = []
    }

    // If user is admin, return all submissions
    if (currentUser.role === 'administrator') {
      return NextResponse.json({ 
        success: true, 
        submissions: submissions 
      })
    }

    // If user is regular user, return only their submissions
    const userSubmissions = submissions.filter((submission: any) => submission.userId === currentUser.id)
    
    return NextResponse.json({ 
      success: true, 
      submissions: userSubmissions 
    })
  } catch (error) {
    console.error('Error fetching submissions:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to fetch submissions' },
      { status: 500 }
    )
  }
}