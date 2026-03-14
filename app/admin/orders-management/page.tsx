"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import AdminSidebar from "@/components/admin/sidebar"
import AdminHeader from "@/components/admin/header"
import { AlertCircle, CheckCircle, Clock, Truck, Package } from "lucide-react"

interface Order {
  id: string
  user_id: string
  total_amount: number
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled"
  payment_method: string
  shipping_address?: string
  created_at: string
  customer?: {
    first_name: string
    last_name: string
    phone?: string
    email?: string
  }
  order_items: Array<{
    id: string
    product_id: string
    quantity: number
    price_at_purchase: number
    products: {
      id: string
      name: string
      category: string
      price: number
    }
  }>
}

const STATUS_COLORS: Record<string, { bg: string; text: string; icon: any }> = {
  pending: { bg: "bg-yellow-100", text: "text-yellow-700", icon: Clock },
  processing: { bg: "bg-blue-100", text: "text-blue-700", icon: Package },
  shipped: { bg: "bg-purple-100", text: "text-purple-700", icon: Truck },
  delivered: { bg: "bg-green-100", text: "text-green-700", icon: CheckCircle },
  cancelled: { bg: "bg-red-100", text: "text-red-700", icon: AlertCircle },
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState<string | null>(null)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async () => {
    try {
      setLoading(true)
      console.log("[v0] Fetching orders from server API...")

      const response = await fetch("/api/admin/orders", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      })

      if (!response.ok) {
        throw new Error("Failed to fetch orders")
      }

      const data = await response.json()
      console.log("[v0] Orders fetched from server:", data.orders.length)
      setOrders(data.orders)
      setError("")
    } catch (err) {
      console.error("[v0] Error fetching orders:", err)
      setError("Failed to fetch orders")
    } finally {
      setLoading(false)
    }
  }

  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    setUpdating(orderId)
    setError("")
    setSuccess("")

    try {
      const response = await fetch("/api/admin/orders", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          orderId,
          status: newStatus,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to update order")
      }

      setOrders(orders.map((o) => (o.id === orderId ? { ...o, status: newStatus as any } : o)))
      setSuccess(`Order status updated to ${newStatus}`)
      setTimeout(() => setSuccess(""), 3000)
    } catch (err) {
      console.error("[v0] Error updating order:", err)
      setError("Failed to update order status")
    } finally {
      setUpdating(null)
    }
  }

  const getStatusIcon = (status: string) => {
    const Icon = STATUS_COLORS[status]?.icon || Clock
    return Icon
  }

  return (
    <div className="flex h-screen bg-background">
      <AdminSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminHeader />
        <main className="flex-1 overflow-auto p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground">Order Management</h1>
            <p className="text-muted-foreground">View and update order statuses - Total Orders: {orders.length}</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
              <p className="text-red-700">{error}</p>
            </div>
          )}

          {success && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
              <p className="text-green-700">{success}</p>
            </div>
          )}

          {loading ? (
            <div className="text-center py-12 text-muted-foreground">Loading orders...</div>
          ) : orders.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm p-12 text-center">
              <p className="text-muted-foreground mb-4">No orders found</p>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => {
                const statusColor = STATUS_COLORS[order.status]
                const StatusIcon = getStatusIcon(order.status)

                return (
                  <div key={order.id} className="bg-white rounded-lg shadow-sm p-6 border border-border">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                      <div>
                        <p className="text-xs font-semibold text-muted-foreground uppercase mb-1">Order ID</p>
                        <p className="font-mono text-sm text-foreground">{order.id.slice(0, 8)}...</p>
                      </div>

                      <div>
                        <p className="text-xs font-semibold text-muted-foreground uppercase mb-1">Customer</p>
                        <p className="text-sm text-foreground font-medium">
                          {order.customer?.first_name} {order.customer?.last_name}
                        </p>
                        {order.customer?.phone && (
                          <p className="text-xs text-muted-foreground mt-1">📞 {order.customer.phone}</p>
                        )}
                      </div>

                      {order.shipping_address && (
                        <div>
                          <p className="text-xs font-semibold text-muted-foreground uppercase mb-1">Delivery Address</p>
                          <p className="text-sm text-foreground whitespace-pre-wrap break-words max-w-xs">
                            {order.shipping_address}
                          </p>
                        </div>
                      )}

                      <div>
                        <p className="text-xs font-semibold text-muted-foreground uppercase mb-1">Amount</p>
                        <p className="text-sm font-bold text-primary">₹{order.total_amount.toLocaleString("en-IN")}</p>
                      </div>

                      <div>
                        <p className="text-xs font-semibold text-muted-foreground uppercase mb-1">Date</p>
                        <p className="text-sm text-foreground">
                          {new Date(order.created_at).toLocaleDateString("en-IN")}
                        </p>
                      </div>
                    </div>

                    <div className="mt-6 pt-6 border-t border-border">
                      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
                        <div className="md:col-span-1">
                          <div className={`${statusColor.bg} ${statusColor.text} rounded-lg px-4 py-3 flex items-center gap-2`}>
                            <StatusIcon className="w-4 h-4" />
                            <span className="font-semibold capitalize">{order.status}</span>
                          </div>
                        </div>

                        <div className="md:col-span-4 flex flex-wrap gap-2">
                          {["pending", "processing", "shipped", "delivered", "cancelled"].map((status) => (
                            <Button
                              key={status}
                              onClick={() => updateOrderStatus(order.id, status)}
                              disabled={updating === order.id || order.status === status}
                              className={`capitalize text-xs ${
                                order.status === status
                                  ? "bg-gray-200 text-gray-600"
                                  : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                              }`}
                            >
                              {updating === order.id ? "Updating..." : status}
                            </Button>
                          ))}
                        </div>
                      </div>

                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <p className="text-xs text-muted-foreground">
                          Payment Method: <span className="font-semibold text-foreground capitalize">{order.payment_method}</span>
                        </p>
                      </div>

                      {order.order_items && order.order_items.length > 0 && (
                        <div className="mt-6 pt-6 border-t border-gray-200">
                          <p className="text-xs font-semibold text-muted-foreground uppercase mb-3">Order Items</p>
                          <div className="space-y-2">
                            {order.order_items.map((item) => (
                              <div key={item.id} className="bg-gray-50 rounded p-3 flex justify-between items-start">
                                <div className="flex-1">
                                  <p className="text-sm font-medium text-foreground">{item.products?.name || "Product"}</p>
                                  <p className="text-xs text-muted-foreground">Category: {item.products?.category || "N/A"}</p>
                                </div>
                                <div className="text-right">
                                  <p className="text-sm font-medium text-foreground">Qty: {item.quantity}</p>
                                  <p className="text-xs text-muted-foreground">₹{item.price_at_purchase.toLocaleString("en-IN")} each</p>
                                  <p className="text-sm font-semibold text-primary mt-1">
                                    Subtotal: ₹{(item.quantity * item.price_at_purchase).toLocaleString("en-IN")}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
