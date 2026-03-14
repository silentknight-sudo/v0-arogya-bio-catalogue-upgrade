"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { LogOut, User } from "lucide-react"

export default function AdminHeader() {
  const router = useRouter()

  const handleLogout = () => {
    localStorage.removeItem("adminSession")
    router.push("/admin/login")
  }

  return (
    <header className="h-16 bg-white border-b border-border px-6 flex items-center justify-between">
      <div>
        <h2 className="text-xl font-bold text-foreground">Admin Dashboard</h2>
      </div>
      <div className="flex items-center gap-4">
        <button className="p-2 hover:bg-secondary rounded-lg transition-colors">
          <User className="w-5 h-5 text-muted-foreground" />
        </button>
        <Button
          onClick={handleLogout}
          variant="outline"
          className="flex items-center gap-2 border-border bg-transparent"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </Button>
      </div>
    </header>
  )
}
