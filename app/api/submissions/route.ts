import { NextRequest, NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'

export async function POST(request: NextRequest) {
  try {
    const submissionData = await request.json()
    
    const submissionWithId = {
      id: Date.now().toString(),
      submittedAt: new Date().toISOString(),
      status: 'pending',
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