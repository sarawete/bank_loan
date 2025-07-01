"use client"

import { LayoutDashboard, Smartphone, MessageCircle, Bell, Settings, UserRound, LogOut, FileBoxIcon, Folder, FolderArchive } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"

// Menu items data based on user role
const getUserMenuItems = (userRole: string) => {
  if (userRole === 'administrator') {
    return [
      {
        title: "Admin Dashboard",
        url: "/dashboard/admin",
        icon: LayoutDashboard,
        isActive: true,
      },
      {
        title: "Submissions",
        url: "/submissions",
        icon: FolderArchive,
      },
      {
        title: "Chat",
        url: "/chat",
        icon: MessageCircle,
      },
      {
        title: "Notifications",
        url: "/notifications",
        icon: Bell,
      },
    ]
  }
  
  // Default user menu items
  return [
    {
      title: "Dashboard",
      url: "/dashboard/user",
      icon: LayoutDashboard,
      isActive: true,
    },
    {
      title: "My submissions",
      url: "/my-submissions",
      icon: Folder,
    },
    {
      title: "Chat",
      url: "/chat",
      icon: MessageCircle,
    },
    {
      title: "Notifications",
      url: "/notifications",
      icon: Bell,
    },
  ]
}

const bottomMenuItems = [
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
  {
    title: "Profile",
    url: "/profile",
    icon: UserRound,
  },
  {
    title: "Logout",
    url: "#",
    icon: LogOut,
    onClick: true,
  },
]

export function AppSidebar() {
  const router = useRouter()
  const [userRole, setUserRole] = useState<string>('user')
  
  useEffect(() => {
    // Get user role from cookie
    const getUserRole = () => {
      try {
        console.log('All cookies:', document.cookie) // Debug log
        const cookies = document.cookie.split(';')
        console.log('Cookies array:', cookies) // Debug log
        
        // Try to get role from the dedicated user_role cookie first
        const roleCookie = cookies.find(cookie => cookie.trim().startsWith('user_role='))
        console.log('Role cookie found:', roleCookie) // Debug log
        
        if (roleCookie) {
          const role = roleCookie.split('=')[1].trim()
          console.log('Role from cookie:', role) // Debug log
          return role || 'user'
        }
        
        // Fallback: try to get from user_session cookie (though it's httpOnly)
        const sessionCookie = cookies.find(cookie => cookie.trim().startsWith('user_session='))
        console.log('Session cookie found:', sessionCookie) // Debug log
        
        if (sessionCookie) {
          const cookieValue = sessionCookie.split('=')[1]
          console.log('Cookie value:', cookieValue) // Debug log
          const sessionData = JSON.parse(cookieValue)
          console.log('Session data:', sessionData) // Debug log
          console.log('Role from session:', sessionData.role) // Debug log
          return sessionData.role || 'user'
        }
      } catch (error) {
        console.error('Error parsing user session:', error)
        console.error('Error details:', error)
      }
      return 'user'
    }
    
    const role = getUserRole()
    console.log('Final detected role:', role) // Debug log
    console.log('Menu items will be for role:', role) // Debug log
    setUserRole(role)
  }, [])
  
  const menuItems = getUserMenuItems(userRole)

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' })
      router.push('/')
    } catch (error) {
      console.error('Logout error:', error)
      router.push('/')
    }
  }

  return (
    <Sidebar className="border-r border-[#E4E4E4]">
      <SidebarHeader className="p-6">
        {/* Logo */}
        <div className="flex items-baseline gap-1">
            <Link href="/" className="flex items-baseline space-x-0">
              <Image src='/images/loan_logo.png' width={180} height={64} alt='loan Simulator logo' />
            </Link>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-3">
        <SidebarGroup>
          <SidebarGroupLabel className="text-[#606060] text-base font-medium px-3 py-0 h-6 mb-2">
            Overview
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {(menuItems ?? []).map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={item.isActive}
                    className={`h-12 px-3 text-lg font-medium ${
                      item.isActive
                        ? "bg-[#8FC920] text-white hover:bg-[#8FC920] hover:text-white"
                        : "text-[#4B4B4B] hover:bg-gray-50"
                    }`}
                  >
                    <a href={item.url}>
                      <item.icon className="h-7 w-7" />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-3">
        <SidebarSeparator className="mb-4 bg-[#D6D6D6]" />
        <SidebarMenu className="space-y-1">
          {bottomMenuItems.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton 
                asChild={!item.onClick} 
                className="h-12 px-3 text-lg font-medium text-[#4B4B4B] hover:bg-gray-50"
                onClick={item.onClick ? handleLogout : undefined}
              >
                {item.onClick ? (
                  <div className="flex items-center cursor-pointer">
                    <item.icon className="h-7 w-7" />
                    <span>{item.title}</span>
                  </div>
                ) : (
                  <a href={item.url}>
                    <item.icon className="h-7 w-7" />
                    <span>{item.title}</span>
                  </a>
                )}
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
