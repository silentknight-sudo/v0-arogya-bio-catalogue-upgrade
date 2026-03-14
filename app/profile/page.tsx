import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { LogOutButton } from "@/components/logout-button"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { User, Mail, Phone, MapPin, Edit3, Heart, ShoppingBag, Award } from "lucide-react"

export default async function ProfilePage() {
  const supabase = await createClient()
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()

  if (userError || !user) {
    redirect("/auth/login")
  }

  const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single()

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
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-5xl font-serif text-foreground mb-2 text-balance">
                Welcome Back
              </h1>
              <p className="text-muted-foreground text-base md:text-lg">
                Manage your account and wellness journey
              </p>
            </div>

            {/* Profile Header Card */}
            <div className="max-w-2xl mx-auto bg-white rounded-2xl border border-green-100/50 shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-green-600 to-emerald-600 px-6 md:px-8 py-8 md:py-10 flex items-center gap-4 md:gap-6">
                <div className="w-16 md:w-20 h-16 md:h-20 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <User className="w-8 md:w-10 h-8 md:h-10 text-white" />
                </div>
                <div className="text-white flex-1 min-w-0">
                  <h2 className="text-2xl md:text-3xl font-bold mb-1 truncate">
                    {profile?.first_name || "User"} {profile?.last_name || ""}
                  </h2>
                  <p className="text-green-100 text-sm truncate">{user.email}</p>
                </div>
              </div>

              <div className="px-6 md:px-8 py-6 md:py-8 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-green-50 border border-green-200/50">
                    <Mail className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <div className="min-w-0">
                      <p className="text-xs text-muted-foreground">Email</p>
                      <p className="font-semibold text-sm text-foreground truncate">{user.email}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 rounded-lg bg-amber-50 border border-amber-200/50">
                    <Phone className="w-5 h-5 text-amber-600 flex-shrink-0" />
                    <div className="min-w-0">
                      <p className="text-xs text-muted-foreground">Phone</p>
                      <p className="font-semibold text-sm text-foreground">{profile?.phone || "Not added"}</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-2 pt-4">
                  <Link href="/profile/edit" className="flex-1">
                    <Button className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white">
                      <Edit3 className="w-4 h-4 mr-2" />
                      Edit Profile
                    </Button>
                  </Link>
                  <LogOutButton />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 pb-12 md:pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
            {/* Shipping Address */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl border border-green-100/50 shadow-lg overflow-hidden">
                <div className="bg-gradient-to-r from-green-600/10 to-amber-600/10 px-6 md:px-8 py-6 border-b border-green-100/50">
                  <div className="flex items-center gap-3">
                    <MapPin className="w-6 h-6 text-green-600" />
                    <h3 className="text-xl md:text-2xl font-bold text-foreground">Shipping Address</h3>
                  </div>
                </div>

                <div className="px-6 md:px-8 py-8">
                  {profile?.address ? (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 rounded-lg bg-green-50 border border-green-200/30">
                          <p className="text-xs text-muted-foreground font-semibold uppercase">Street Address</p>
                          <p className="font-semibold text-foreground mt-1">{profile.address}</p>
                        </div>
                        <div className="p-4 rounded-lg bg-green-50 border border-green-200/30">
                          <p className="text-xs text-muted-foreground font-semibold uppercase">City</p>
                          <p className="font-semibold text-foreground mt-1">{profile.city || "—"}</p>
                        </div>
                        <div className="p-4 rounded-lg bg-amber-50 border border-amber-200/30">
                          <p className="text-xs text-muted-foreground font-semibold uppercase">State</p>
                          <p className="font-semibold text-foreground mt-1">{profile.state || "—"}</p>
                        </div>
                        <div className="p-4 rounded-lg bg-amber-50 border border-amber-200/30">
                          <p className="text-xs text-muted-foreground font-semibold uppercase">Pincode</p>
                          <p className="font-semibold text-foreground mt-1">{profile.pincode || "—"}</p>
                        </div>
                      </div>
                      <div className="pt-4">
                        <Link href="/profile/edit">
                          <Button variant="outline" className="w-full border-green-300 text-green-700 hover:bg-green-50">
                            <Edit3 className="w-4 h-4 mr-2" />
                            Update Address
                          </Button>
                        </Link>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <MapPin className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                      <p className="text-muted-foreground mb-4">No address added yet</p>
                      <Link href="/profile/edit">
                        <Button className="bg-green-600 hover:bg-green-700">
                          Add Address
                        </Button>
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="space-y-6">
              <Link href="/profile/orders">
                <div className="bg-gradient-to-br from-green-600 to-emerald-600 rounded-2xl p-6 md:p-8 text-white shadow-lg hover:shadow-xl transition-shadow cursor-pointer group">
                  <ShoppingBag className="w-8 h-8 mb-3 group-hover:scale-110 transition-transform" />
                  <p className="text-green-100 text-sm font-semibold mb-1">Total Orders</p>
                  <p className="text-4xl font-bold">0</p>
                  <p className="text-green-100 text-xs mt-3">View all orders →</p>
                </div>
              </Link>

              <div className="bg-gradient-to-br from-amber-600 to-orange-600 rounded-2xl p-6 md:p-8 text-white shadow-lg">
                <Award className="w-8 h-8 mb-3" />
                <p className="text-amber-100 text-sm font-semibold mb-1">Loyalty Points</p>
                <p className="text-4xl font-bold">0</p>
                <p className="text-amber-100 text-xs mt-3">Earn points on purchases</p>
              </div>

              <Link href="/profile/wishlist">
                <div className="bg-white rounded-2xl border border-red-200/50 p-6 md:p-8 shadow-lg hover:shadow-xl transition-shadow cursor-pointer group">
                  <Heart className="w-8 h-8 text-red-500 mb-3 group-hover:scale-110 transition-transform" />
                  <p className="text-muted-foreground text-sm font-semibold mb-1">Wishlist</p>
                  <p className="text-3xl font-bold text-foreground">0</p>
                  <p className="text-muted-foreground text-xs mt-3">View favorites →</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
