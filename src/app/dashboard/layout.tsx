"use client";

import type React from "react";
import { Header } from "@/components/shared/Header";
import { SideBarDesktop } from "@/components/shared/SideBarDesktop";
import { MobileMenu } from "@/components/shared/MobileMenu";
import { useSidebar } from "@/context/sidebarContext";
import { useMenu } from "@/context/menuContext";
import { SignedIn } from "@clerk/clerk-react";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isSidebarOpen } = useSidebar();
  const { isMobileMenuOpen } = useMenu();

  return (
    <SignedIn>
      <div className="flex min-h-screen flex-col">
        <Header />
        <div className="flex flex-1">
          <SideBarDesktop />
          {isMobileMenuOpen && <MobileMenu />}
          <main
            className={`flex-1 overflow-auto pt-0 ${
              isSidebarOpen ? "md:ml-64" : ""
            }`}
          >
            {children}
          </main>
        </div>
      </div>
    </SignedIn>
  );
}
