"use client"

import { useState, useEffect } from "react"
import AdminSidebar from "@/components/admin/sidebar"
import AdminHeader from "@/components/admin/header"
import { Eye, Truck, Download, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Order {
  id: string
  user_id: string
  total_amount: number
  status: string
  payment_method: string
  created_at: string
  customer?: {
    first_name: string
    last_name: string
    email: string
    phone?: string
  }
}

interface OrdersResponse {
  orders: Order[]
  count: number
  page: number
  limit: number
  totalPages: number
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [page, setPage] = useState(1)
  const [totalOrders, setTotalOrders] = useState(0)
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const limit = 20

  useEffect(() => {
    fetchOrders()
  }, [page, statusFilter])

  const fetchOrders = async () => {
    try {
      setLoading(true)
      setError(null)

      console.log("[v0] Fetching orders from server API...")
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        ...(statusFilter !== "all" && { status: statusFilter }),
      })

      const response = await fetch(`/api/admin/orders?${params}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })

      console.log("[v0] Orders API response status:", response.status)

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to fetch orders")
      }

      const data: OrdersResponse = await response.json()
      console.log("[v0] Orders API returned:", data.orders.length, "orders, total:", data.count)

      setOrders(data.orders)
      setTotalOrders(data.count)
    } catch (err) {
      console.error("[v0] Error fetching orders:", err)
      setError(err instanceof Error ? err.message : "Failed to fetch orders")
      setOrders([])
    } finally {
      setLoading(false)
    }
  }

  const totalPages = Math.ceil(totalOrders / limit)

  const statusColors: { [key: string]: string } = {
    pending: "bg-yellow-100 text-yellow-700",
    processing: "bg-blue-100 text-blue-700",
    shipped: "bg-purple-100 text-purple-700",
    delivered: "bg-green-100 text-green-700",
    cancelled: "bg-red-100 text-red-700",
  }

  const statuses = ["all", "pending", "processing", "shipped", "delivered", "cancelled"]

  return (
    <div className="flex h-screen bg-background">
      <AdminSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminHeader />
        <main className="flex-1 overflow-auto p-8">
          {/* Header */}
          <div className="mb-8 flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Orders Management</h1>
              <p className="text-muted-foreground">
                Total Orders: <span className="font-semibold text-primary">{totalOrders}</span>
              </p>
            </div>
            <Button className="gap-2 bg-primary hover:bg-primary/90">
              <Download className="w-4 h-4" />
              Export Orders
            </Button>
          </div>

          {/* Filters */}
          <div className="mb-6 flex gap-2 flex-wrap">
            <Filter className="w-5 h-5 text-muted-foreground" />
            {statuses.map((status) => (
              <button
                key={status}
                onClick={() => {
                  setStatusFilter(status)
                  setPage(1)
                }}
                className={`px-4 py-2 rounded-lg font-medium transition-all capitalize ${
                  statusFilter === status
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {status === "all" ? "All Orders" : status}
              </button>
            ))}
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 bg-destructive/10 border border-destructive/20 text-destructive px-4 py-3 rounded-lg">
              Error: {error}
            </div>
          )}

          {/* Orders Table */}
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div>
              <p className="mt-4 text-muted-foreground">Loading orders...</p>
            </div>
          ) : orders.length === 0 ? (
            <div className="bg-card rounded-lg shadow-sm p-12 text-center border border-border">
              <Truck className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
              <p className="text-muted-foreground font-medium">No orders found</p>
              <p className="text-sm text-muted-foreground mt-1">
                {statusFilter !== "all" ? "Try changing the filter" : "Orders will appear here"}
              </p>
            </div>
          ) : (
            <div className="bg-card rounded-lg shadow-sm overflow-hidden border border-border">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-muted/50 border-b border-border">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Order ID</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Customer</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Email</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Amount</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Payment</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Status</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Date</th>
                      <th className="px-6 py-4 text-right text-sm font-semibold text-foreground">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {orders.map((order) => (
                      <tr key={order.id} className="hover:bg-muted/30 transition-colors">
                        <td className="px-6 py-4 text-sm font-mono text-primary font-semibold">
                          #{order.id.slice(0, 8).toUpperCase()}
                        </td>
                        <td className="px-6 py-4 text-sm text-foreground">
                          {order.customer?.first_name} {order.customer?.last_name}
                        </td>
                        <td className="px-6 py-4 text-sm text-muted-foreground">{order.customer?.email}</td>
                        <td className="px-6 py-4 text-sm font-semibold text-foreground">
                          ₹{order.total_amount.toLocaleString("en-IN")}
                        </td>
                        <td className="px-6 py-4 text-sm text-muted-foreground capitalize">
                          {order.payment_method || "N/A"}
                        </td>
                        <td className="px-6 py-4 text-sm">
                          <span
                            className={`inline-block px-3 py-1 rounded-full text-xs font-semibold capitalize ${
                              statusColors[order.status] || "bg-gray-100 text-gray-700"
                            }`}
                          >
                            {order.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-muted-foreground">
                          {new Date(order.created_at).toLocaleDateString("en-IN", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </td>
                        <td className="px-6 py-4 text-right flex justify-end gap-2">
                          <button className="p-2 hover:bg-muted rounded-lg transition-colors" title="View Order">
                            <Eye className="w-4 h-4 text-muted-foreground" />
                          </button>
                          <button className="p-2 hover:bg-muted rounded-lg transition-colors" title="Track Shipping">
                            <Truck className="w-4 h-4 text-muted-foreground" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="px-6 py-4 border-t border-border flex items-center justify-between bg-muted/20">
                <div className="text-sm text-muted-foreground">
                  Showing {(page - 1) * limit + 1} to {Math.min(page * limit, totalOrders)} of {totalOrders} orders
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPage(Math.max(1, page - 1))}
                    disabled={page === 1}
                  >
                    Previous
                  </Button>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      const pageNum = i + 1
                      return (
                        <button
                          key={pageNum}
                          onClick={() => setPage(pageNum)}
                          className={`w-8 h-8 rounded text-sm font-medium transition-all ${
                            pageNum === page
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted text-muted-foreground hover:bg-muted/80"
                          }`}
                        >
                          {pageNum}
                        </button>
                      )
                    })}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPage(Math.min(totalPages, page + 1))}
                    disabled={page === totalPages}
                  >
                    Next
                  </Button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
