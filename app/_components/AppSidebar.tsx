/* eslint-disable @typescript-eslint/no-unused-vars */

"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Calendar, Home, Inbox, Search, Settings } from "lucide-react"

import { getSupabaseBrowserClient } from "@/supabase-utils/browserClient"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { FooterSidebar } from "./FooterSidebar"

// Menu items.
const items = [
  {
    title: "Products",
    url: "/home",
    icon: Home,
  },
  {
    title: "Catalog",
    url: "#",
    icon: Inbox,
  },
  {
    title: "Bookmarks",
    url: "#",
    icon: Calendar,
  },
  {
    title: "Payments",
    url: "#",
    icon: Search,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
]

export function AppSidebar() {

  const supabase = getSupabaseBrowserClient()

  const router = useRouter()

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_OUT") {
        router.push("/")
      }
    });
    return () => subscription.unsubscribe();
  }, [router, supabase.auth]);

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <FooterSidebar />
      </SidebarFooter>
    </Sidebar>
  )
}
