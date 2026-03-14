"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import AdminSidebar from "@/components/admin/sidebar"
import AdminHeader from "@/components/admin/header"
import { Send } from "lucide-react"

interface ChatMessage {
  id: string
  order_id: string
  user_id: string
  message: string
  is_from_admin: boolean
  created_at: string
}

export default function ChatPage() {
  const [chats, setChats] = useState<ChatMessage[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null)
  const [newMessage, setNewMessage] = useState("")
  const supabase = createClient()

  useEffect(() => {
    fetchChats()
  }, [])

  const fetchChats = async () => {
    try {
      const { data } = await supabase.from("chat_messages").select("*").order("created_at", { ascending: false })

      if (data) {
        setChats(data)
      }
    } catch (error) {
      console.error("Error fetching chats:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSendMessage = async () => {
    if (!selectedOrder || !newMessage.trim()) return

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      await supabase.from("chat_messages").insert({
        order_id: selectedOrder,
        user_id: user?.id || "",
        message: newMessage,
        is_from_admin: true,
      })

      setNewMessage("")
      fetchChats()
    } catch (error) {
      console.error("Error sending message:", error)
    }
  }

  const selectedChats = selectedOrder ? chats.filter((c) => c.order_id === selectedOrder) : []

  return (
    <div className="flex h-screen bg-background">
      <AdminSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminHeader />
        <main className="flex-1 overflow-auto">
          <div className="flex h-full">
            {/* Chat List */}
            <div className="w-80 border-r border-border bg-white overflow-y-auto">
              <div className="p-6 border-b border-border">
                <h2 className="text-xl font-bold text-foreground">Customer Chats</h2>
              </div>
              <div className="divide-y divide-border">
                {loading ? (
                  <div className="p-6 text-center text-muted-foreground">Loading chats...</div>
                ) : (
                  chats
                    .filter((c, i, arr) => arr.findIndex((x) => x.order_id === c.order_id) === i)
                    .map((chat) => (
                      <button
                        key={chat.order_id}
                        onClick={() => setSelectedOrder(chat.order_id)}
                        className={`w-full text-left p-4 hover:bg-secondary/20 transition-colors ${
                          selectedOrder === chat.order_id ? "bg-secondary/30" : ""
                        }`}
                      >
                        <p className="font-semibold text-foreground text-sm">
                          Order #{chat.order_id.slice(0, 8).toUpperCase()}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1 truncate">{chat.message}</p>
                      </button>
                    ))
                )}
              </div>
            </div>

            {/* Chat Content */}
            <div className="flex-1 flex flex-col bg-secondary/5">
              {selectedOrder ? (
                <>
                  <div className="p-6 border-b border-border bg-white">
                    <h2 className="text-lg font-bold text-foreground">
                      Order #{selectedOrder.slice(0, 8).toUpperCase()}
                    </h2>
                  </div>
                  <div className="flex-1 overflow-y-auto p-6 space-y-4">
                    {selectedChats.map((msg) => (
                      <div key={msg.id} className={`flex ${msg.is_from_admin ? "justify-end" : "justify-start"}`}>
                        <div
                          className={`max-w-xs px-4 py-2 rounded-lg ${
                            msg.is_from_admin
                              ? "bg-primary text-primary-foreground"
                              : "bg-white border border-border text-foreground"
                          }`}
                        >
                          <p className="text-sm">{msg.message}</p>
                          <span
                            className={`text-xs ${msg.is_from_admin ? "text-primary-foreground/70" : "text-muted-foreground"} mt-1 block`}
                          >
                            {new Date(msg.created_at).toLocaleTimeString()}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="p-6 border-t border-border bg-white">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type your message..."
                        className="flex-1 px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                      />
                      <button
                        onClick={handleSendMessage}
                        className="px-4 py-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg transition-colors"
                      >
                        <Send className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center text-muted-foreground">
                  <p>Select a chat to start messaging</p>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
