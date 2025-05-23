"use client"

import type React from "react"
import { Header } from "@/components/ui/dashboard/Header"
import { SideBarDesktop } from "@/components/ui/dashboard/SideBarDesktop"
import { MobileMenu } from "@/components/ui/dashboard/MobileMenu"
import { useSidebar } from "@/context/sidebarContext"
import { useMenu } from "@/context/menuContext"



export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const { isSidebarOpen } = useSidebar()
  const { isMobileMenuOpen } = useMenu()

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="flex flex-1">
        <SideBarDesktop />

        {isMobileMenuOpen && (
          <MobileMenu />
        )}

        <main className={`flex-1 overflow-auto ${isSidebarOpen ? "" : "w-full"}`}>{children}</main>
      </div>
    </div>
  )
}
