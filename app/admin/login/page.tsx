"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function AdminLogin() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      console.log("Submitting admin login:", { email })
      const formDataBody = new URLSearchParams()
      formDataBody.append("username", email)
      formDataBody.append("password", password)

      const response = await fetch("http://localhost:8000/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formDataBody,
      })

      console.log("Response status:", response.status)
      if (!response.ok) {
        const errorData = await response.json()
        console.error("Login error:", errorData)
        throw new Error(errorData.detail || "Login failed")
      }

      const data = await response.json()
      console.log("Login success:", data)

      // Store token in cookie for middleware (if any) or localStorage
      document.cookie = `adminToken=${data.access_token}; path=/; secure; samesite=strict`
      localStorage.setItem("token", data.access_token)

      router.push("/admin/dashboard")
    } catch (err: any) {
      console.error("Login exception:", err)
      setError(err.message || "Login failed. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    document.cookie = "adminToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;"
    router.push("/")
  }

  return (
    <div className="min-h-screen bg-blue-50 text-foreground flex flex-col">
      <Header />

      <main className="flex-1 max-w-2xl mx-auto px-6 w-full py-24">
        <div className="mb-12">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-3">Admin Login</h1>
          <p className="text-lg text-muted">Manage your events and registrations</p>
        </div>

        <div className="bg-white border-2 border-border rounded-2xl p-8 md:p-12 shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded">{error}</div>}

            <div>
              <label className="block text-lg font-semibold mb-3">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@eventhub.com"
                className="w-full px-4 py-3 border-2 border-border rounded-lg bg-white focus:outline-none focus:border-primary text-lg"
                required
              />
            </div>

            <div>
              <label className="block text-lg font-semibold mb-3">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 border-2 border-border rounded-lg bg-white focus:outline-none focus:border-primary text-lg"
                required
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full px-6 py-4 bg-blue-600 text-white hover:bg-blue-700 font-bold text-lg rounded-lg transition-colors"
            >
              {loading ? "Logging in..." : "Login"}
            </Button>
          </form>
        </div>


      </main>

      <Footer />
    </div>
  )
}
