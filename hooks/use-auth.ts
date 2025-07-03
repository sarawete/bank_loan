"use client"

import { useState, useEffect } from 'react'

export interface UserSession {
  id: string
  email: string
  role: 'user' | 'administrator'
}

export function useAuth() {
  const [user, setUser] = useState<UserSession | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getUserFromSession = () => {
      try {
        const cookies = document.cookie.split(';')
        
        // Get role from the dedicated user_role cookie
        const roleCookie = cookies.find(cookie => cookie.trim().startsWith('user_role='))
        
        if (roleCookie) {
          const role = roleCookie.split('=')[1].trim() as 'user' | 'administrator'
          
          // Try to get other user data from localStorage or construct from available data
          const userDataStr = localStorage.getItem('user_data')
          if (userDataStr) {
            const userData = JSON.parse(userDataStr)
            setUser({
              id: userData.id,
              email: userData.email,
              role: role
            })
          } else {
            // If no localStorage data, we only have the role
            // In a real app, you might want to fetch user data from an API
            setUser({
              id: '',
              email: '',
              role: role
            })
          }
        } else {
          setUser(null)
        }
      } catch (error) {
        console.error('Error getting user session:', error)
        setUser(null)
      } finally {
        setLoading(false)
      }
    }

    getUserFromSession()
  }, [])

  const logout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' })
      localStorage.removeItem('user_data')
      setUser(null)
      window.location.href = '/'
    } catch (error) {
      console.error('Logout error:', error)
      // Force logout even if API call fails
      localStorage.removeItem('user_data')
      setUser(null)
      window.location.href = '/'
    }
  }

  return {
    user,
    loading,
    logout,
    isAuthenticated: !!user && !!user.id,
    isAdmin: user?.role === 'administrator'
  }
}