'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, DollarSign, Package, ShoppingCart, Users, Truck, BarChart, Settings, Menu } from 'lucide-react'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const navItems = [
  { name: 'Dashboard', href: '/', icon: Home },
  { name: 'Finance', href: '/finance', icon: DollarSign },
  { name: 'Inventory', href: '/inventory', icon: Package },
  { name: 'Sales', href: '/sales', icon: ShoppingCart },
  { name: 'HR', href: '/hr', icon: Users },
  { name: 'SCM', href: '/scm', icon: Truck },
  { name: 'CRM', href: '/crm', icon: Users },
  { name: 'Analytics', href: '/analytics', icon: BarChart },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="flex h-screen">
      <div className="hidden md:flex flex-col w-16 bg-accent">
        <div className="flex-1 flex flex-col justify-between">
          <nav className="mt-5 flex-1 flex flex-col items-center space-y-3">
            <Button variant="ghost" size="icon" className="h-12 w-12">
              <Menu className="h-6 w-6" />
            </Button>
            {navItems.map((item) => (
              <TooltipProvider key={item.name}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-center justify-center h-12 w-12 rounded-lg text-muted-foreground hover:bg-accent-foreground/10",
                        pathname === item.href && "bg-accent-foreground/10 text-accent-foreground"
                      )}
                    >
                      <item.icon className="h-6 w-6" />
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    <p>{item.name}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ))}
          </nav>
          <div className="mb-6 flex flex-col items-center">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-12 w-12">
                    <Settings className="h-6 w-6" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>Settings</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </div>
    </div>
  )
}

