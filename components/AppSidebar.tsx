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
import { useAuth } from "@/hooks/use-auth"

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
      title: "New submission",
      url: "/new-submissions",
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
  const { user, logout } = useAuth()
  
  const menuItems = getUserMenuItems(user?.role || 'user')

  const handleLogout = async () => {
    await logout()
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
