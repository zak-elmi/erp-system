import { Bell, Search, User } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function TopNav() {
  return (
    <div className="flex items-center justify-between h-16 px-6 bg-accent/50">
      <div className="flex items-center flex-1">
        <Input
          type="search"
          placeholder="Search..."
          className="w-96 bg-accent"
        />
      </div>
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="icon">
          <Bell className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon">
          <User className="h-5 w-5" />
        </Button>
      </div>
    </div>
  )
}

