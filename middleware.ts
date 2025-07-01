import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Check if the request is for dashboard routes
  if (pathname.startsWith('/dashboard/user') || 
      pathname.startsWith('/dashboard/admin') ||
      pathname.startsWith('/devices') || 
      pathname.startsWith('/ai-insights') || 
      pathname.startsWith('/chat') || 
      pathname.startsWith('/notifications') || 
      pathname.startsWith('/settings') || 
      pathname.startsWith('/profile')) {
    
    // Get user session from cookie
    const userSession = request.cookies.get('user_session')?.value
    
    if (!userSession) {
      // No session, redirect to login
      return NextResponse.redirect(new URL('/login', request.url))
    }

    try {
      // Parse the session to validate it
      JSON.parse(userSession)
      // If parsing succeeds, the session is valid
      return NextResponse.next()
    } catch (error) {
      // Invalid session, redirect to login
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  // For non-protected routes, continue normally
  return NextResponse.next()
}

export const config = {
  matcher: [
    '/dashboard/user/:path*',
    '/dashboard/admin/:path*',
    '/submissions/:path*',
    '/my-submissions/:path*',
    '/chat/:path*',
    '/notifications/:path*',
    '/settings/:path*',
    '/profile/:path*'
  ]
}