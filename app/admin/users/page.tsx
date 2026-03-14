"use client"

import { useState, useEffect } from "react"
import AdminSidebar from "@/components/admin/sidebar"
import AdminHeader from "@/components/admin/header"
import { Shield, Lock } from "lucide-react"
import type { UserWithEmail } from "@/app/actions/admin"

export default function UsersPage() {
  const [users, setUsers] = useState<UserWithEmail[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    setIsHydrated(true)
    loadUsers()
  }, [])

  const loadUsers = async () => {
    try {
      setLoading(true)
      setError(null)
      console.log("[v0] Fetching users from API...")
      
      const response = await fetch("/api/admin/users", {
        method: "GET",
        credentials: "include", // Include cookies in the request
        headers: {
          "Content-Type": "application/json",
        },
      })
      
      console.log("[v0] API response status:", response.status)
      
      if (!response.ok) {
        const errorData = await response.json()
        console.log("[v0] API error response:", errorData)
        throw new Error(`API error: ${response.status}`)
      }

      const data = await response.json()
      console.log("[v0] API returned full data:", data)
      console.log("[v0] API returned users count:", data.count)
      console.log("[v0] API returned users array length:", data.users?.length || 0)
      
      setUsers(data.users || [])
    } catch (err) {
      console.error("[v0] Error loading users:", err)
      setError(err instanceof Error ? err.message : "Failed to load users")
      setUsers([])
    } finally {
      setLoading(false)
    }
  }

  if (!isHydrated) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }

  return (
    <div className="flex h-screen bg-background">
      <AdminSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminHeader />
        <main className="flex-1 overflow-auto p-8">
          <div className="mb-8 flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Users</h1>
              <p className="text-muted-foreground">Manage customer accounts and permissions</p>
            </div>
            <button
              onClick={loadUsers}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90"
            >
              Refresh
            </button>
          </div>

          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary inline-block mr-2"></div>
              Loading users...
            </div>
          ) : error ? (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
              Error loading users: {error}
            </div>
          ) : users.length === 0 ? (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-blue-700">
              No users found. Users will appear here once they sign up.
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <table className="w-full">
                <thead className="bg-secondary/30 border-b border-border">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Name</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Email</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Phone</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Joined</th>
                    <th className="px-6 py-3 text-right text-sm font-semibold text-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {users.map((user) => (
                    <tr key={user.id} className="hover:bg-secondary/20">
                      <td className="px-6 py-4 text-sm text-foreground font-semibold">
                        {user.first_name} {user.last_name}
                      </td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">{user.email}</td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">{user.phone || "N/A"}</td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">
                        {new Date(user.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-right flex justify-end gap-2">
                        <button className="p-2 hover:bg-secondary rounded-lg transition-colors" title="Manage permissions">
                          <Shield className="w-4 h-4 text-muted-foreground" />
                        </button>
                        <button className="p-2 hover:bg-red-100 rounded-lg transition-colors" title="Disable user">
                          <Lock className="w-4 h-4 text-red-600" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {users.length > 0 && (
            <div className="mt-4 text-sm text-muted-foreground">
              Total users: {users.length}
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
