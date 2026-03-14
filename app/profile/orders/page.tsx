import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import Link from "next/link"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { ShoppingBag, ArrowRight, Calendar, Package, Truck, CheckCircle2, Clock } from "lucide-react"

export default async function OrdersPage() {
  const supabase = await createClient()
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()

  if (userError || !user) {
    redirect("/auth/login")
  }

  const { data: orders } = await supabase
    .from("orders")
    .select(`
      id,
      total_amount,
      status,
      created_at,
      order_items (
        id,
        quantity,
        price_at_purchase,
        product_id,
        products:product_id (name, image_url)
      )
    `)
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className="w-5 h-5 text-green-600" />
      case "pending":
        return <Clock className="w-5 h-5 text-amber-600" />
      case "shipped":
        return <Truck className="w-5 h-5 text-blue-600" />
      default:
        return <Package className="w-5 h-5 text-gray-600" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 border border-green-300"
      case "pending":
        return "bg-amber-100 text-amber-800 border border-amber-300"
      case "shipped":
        return "bg-blue-100 text-blue-800 border border-blue-300"
      default:
        return "bg-gray-100 text-gray-800 border border-gray-300"
    }
  }

  return (
    <main className="min-h-screen bg-background">
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-amber-50/30">
        {/* Hero Section */}
        <div className="relative overflow-hidden pt-8 md:pt-12 pb-12 md:pb-20">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-96 h-96 bg-green-400 rounded-full mix-blend-multiply filter blur-3xl" />
            <div className="absolute bottom-0 left-20 w-72 h-72 bg-amber-400 rounded-full mix-blend-multiply filter blur-3xl" />
          </div>

          <div className="relative container mx-auto px-4">
            <div className="text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-sm rounded-full border border-green-200/50 mb-4">
                <ShoppingBag className="w-4 h-4 text-green-600" />
                <span className="text-sm font-semibold text-green-900">Order History</span>
              </div>
              <h1 className="text-3xl md:text-5xl font-serif text-foreground mb-2 text-balance">
                My Orders
              </h1>
              <p className="text-muted-foreground text-base md:text-lg">
                Track and manage all your purchases
              </p>
            </div>
          </div>
        </div>

        {/* Orders Content */}
        <div className="container mx-auto px-4 pb-12 md:pb-20">
          {!orders || orders.length === 0 ? (
            <div className="max-w-2xl mx-auto">
              <div className="bg-white rounded-2xl border border-green-100/50 shadow-lg overflow-hidden">
                <div className="px-6 md:px-8 py-12 md:py-16 text-center">
                  <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <ShoppingBag className="w-10 h-10 text-gray-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-2">No Orders Yet</h3>
                  <p className="text-muted-foreground mb-8">Start your wellness journey by exploring our premium Ayurvedic collection</p>
                  <Link href="/shop">
                    <button className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-full font-semibold hover:shadow-lg transition-all hover:-translate-y-1">
                      Explore Products <ArrowRight className="w-4 h-4" />
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Summary Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="bg-white rounded-xl border border-green-100/50 p-4 md:p-6 shadow-sm">
                  <p className="text-muted-foreground text-sm font-semibold mb-2">Total Orders</p>
                  <p className="text-3xl md:text-4xl font-bold text-green-600">{orders.length}</p>
                </div>
                <div className="bg-white rounded-xl border border-blue-100/50 p-4 md:p-6 shadow-sm">
                  <p className="text-muted-foreground text-sm font-semibold mb-2">Total Spent</p>
                  <p className="text-3xl md:text-4xl font-bold text-blue-600">
                    ₹{orders.reduce((sum: number, order: any) => sum + order.total_amount, 0).toLocaleString()}
                  </p>
                </div>
                <div className="bg-white rounded-xl border border-amber-100/50 p-4 md:p-6 shadow-sm">
                  <p className="text-muted-foreground text-sm font-semibold mb-2">Completed Orders</p>
                  <p className="text-3xl md:text-4xl font-bold text-amber-600">
                    {orders.filter((o: any) => o.status === "completed").length}
                  </p>
                </div>
              </div>

              {/* Orders List */}
              <div className="space-y-4">
                {orders.map((order: any) => (
                  <div key={order.id} className="bg-white rounded-2xl border border-green-100/50 shadow-lg hover:shadow-xl transition-shadow overflow-hidden">
                    {/* Order Header */}
                    <div className="bg-gradient-to-r from-green-600/10 to-amber-600/10 px-6 md:px-8 py-6 border-b border-green-100/50">
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6 items-start">
                        <div>
                          <p className="text-xs font-semibold text-muted-foreground uppercase mb-1">Order ID</p>
                          <p className="font-mono font-bold text-foreground">{order.id.slice(0, 8).toUpperCase()}</p>
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-muted-foreground uppercase mb-1">Date</p>
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-green-600" />
                            <p className="font-semibold text-foreground">
                              {new Date(order.created_at).toLocaleDateString("en-IN", {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              })}
                            </p>
                          </div>
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-muted-foreground uppercase mb-1">Total Amount</p>
                          <p className="text-2xl md:text-3xl font-bold text-green-600">₹{order.total_amount}</p>
                        </div>
                        <div className="md:text-right">
                          <p className="text-xs font-semibold text-muted-foreground uppercase mb-2">Status</p>
                          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full font-semibold text-sm ${getStatusColor(order.status)}`}>
                            {getStatusIcon(order.status)}
                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Order Items */}
                    <div className="px-6 md:px-8 py-6">
                      <p className="text-sm font-semibold text-muted-foreground uppercase mb-4">Items ({order.order_items.length})</p>
                      <div className="space-y-3">
                        {order.order_items.map((item: any) => (
                          <div key={item.id} className="flex items-center justify-between p-3 rounded-lg bg-gray-50 border border-gray-200 hover:bg-gray-100 transition-colors">
                            <div className="flex items-center gap-4 flex-1 min-w-0">
                              {item.products.image_url && (
                                <img
                                  src={item.products.image_url}
                                  alt={item.products.name}
                                  className="w-12 h-12 md:w-16 md:h-16 object-cover rounded-lg flex-shrink-0"
                                />
                              )}
                              <div className="min-w-0">
                                <p className="font-semibold text-foreground text-sm md:text-base truncate">{item.products.name}</p>
                                <p className="text-xs md:text-sm text-muted-foreground">Qty: {item.quantity}</p>
                              </div>
                            </div>
                            <p className="font-bold text-foreground text-sm md:text-base whitespace-nowrap ml-4">₹{item.price_at_purchase}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </main>
  )
}
