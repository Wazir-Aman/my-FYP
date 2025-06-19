"use client"

import React, { createContext, useContext, useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronLeft, Menu } from 'lucide-react'

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { useIsMobile } from "@/hooks/use-mobile"

// Context for sidebar state
type SidebarContextType = {
  isOpen: boolean
  toggle: () => void
  isMobile: boolean
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined)

export function useSidebar() {
  const context = useContext(SidebarContext)
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider")
  }
  return context
}

// Main Sidebar Provider
export function SidebarProvider({
  children,
  defaultOpen = true,
}: {
  children: React.ReactNode
  defaultOpen?: boolean
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen)
  const isMobile = useIsMobile()

  const toggle = () => setIsOpen(!isOpen)

  // Close sidebar on mobile by default
  useEffect(() => {
    if (isMobile) {
      setIsOpen(false)
    } else {
      setIsOpen(defaultOpen)
    }
  }, [isMobile, defaultOpen])

  return (
    <SidebarContext.Provider value={{ isOpen, toggle, isMobile }}>
      <div className="flex min-h-screen">
        {children}
      </div>
    </SidebarContext.Provider>
  )
}

// Sidebar component
export function Sidebar({ children }: { children: React.ReactNode }) {
  const { isOpen, isMobile } = useSidebar()

  if (isMobile) {
    return null;
  }

  return (
    <div
      className={cn(
        "h-screen border-r bg-green-100 transition-all duration-300 ease-in-out",
        isOpen ? "w-64" : "w-16"
      )}
    >
      <div className="flex h-full flex-col overflow-y-auto">{children}</div>
    </div>
  )
}

// Mobile sidebar using Sheet
function MobileSidebar({ children }: { children: React.ReactNode }) {
  const { isOpen, toggle } = useSidebar()

  return (
    <Sheet open={isOpen} onOpenChange={toggle}>
      <SheetContent side="left" className="p-0 w-64">
        <div className="flex h-full flex-col overflow-y-auto">{children}</div>
      </SheetContent>
    </Sheet>
  )
}

// Sidebar header
export function SidebarHeader({ children }: { children: React.ReactNode }) {
  return (
    <div className="sticky top-0 z-10 border-b bg-background p-4">
      {children}
    </div>
  )
}

// Sidebar content
export function SidebarContent({ children }: { children: React.ReactNode }) {
  return <div className="flex-1 overflow-auto p-4">{children}</div>
}

// Sidebar footer
export function SidebarFooter({ children }: { children: React.ReactNode }) {
  return (
    <div className="sticky bottom-0 z-10 border-t bg-background p-4">
      {children}
    </div>
  )
}

// Sidebar trigger button
export function SidebarTrigger() {
  const { toggle, isOpen } = useSidebar()

  return (
    <Button variant="ghost" size="icon" onClick={toggle} className="h-9 w-9">
      {isOpen ? <ChevronLeft className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      <span className="sr-only">Toggle Sidebar</span>
    </Button>
  )
}

// Sidebar menu
export function SidebarMenu({ children }: { children: React.ReactNode }) {
  return <ul className="space-y-2">{children}</ul>
}

// Sidebar menu item
export function SidebarMenuItem({ children }: { children: React.ReactNode }) {
  return <li>{children}</li>
}

// Sidebar menu button
export function SidebarMenuButton({
  href,
  icon: Icon,
  children,
  isActive,
  onClick,
}: {
  href?: string
  icon?: React.ElementType
  children: React.ReactNode
  isActive?: boolean
  onClick?: () => void
}) {
  const { isOpen } = useSidebar()
  const pathname = usePathname()
  
  // If href is provided, check if it matches the current path
  const active = isActive || (href && pathname === href)

  const content = (
    <div
      className={cn(
        "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
        active
          ? "bg-primary/10 text-primary"
          : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
      )}
    >
      {Icon && <Icon className="h-5 w-5" />}
      {(isOpen || !Icon) && <span>{children}</span>}
    </div>
  )

  if (href) {
    return <Link href={href}>{content}</Link>
  }

  return (
    <button className="w-full text-left" onClick={onClick}>
      {content}
    </button>
  )
}