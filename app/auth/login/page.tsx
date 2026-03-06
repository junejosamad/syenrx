"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"

export default function LoginPage() {
  const [formData, setFormData] = useState({ email: "", password: "" })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      console.log("Submitting login form:", formData)
      const formDataBody = new URLSearchParams()
      formDataBody.append("username", formData.email)
      formDataBody.append("password", formData.password)

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
        console.error("Login error details:", errorData)
        throw new Error(errorData.detail || "Login failed")
      }

      const data = await response.json()
      console.log("Login success:", data)
      localStorage.setItem("token", data.access_token)
      // Redirect to dashboard or home
      window.location.href = "/"
    } catch (err: any) {
      console.error("Login exception:", err)
      setError(err.message || "Invalid email or password")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />

      <main className="max-w-2xl mx-auto px-6 py-24">
        <h1 className="text-5xl font-bold mb-12">Login</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && <div className="text-red-500 text-lg">{error}</div>}

          <div>
            <label className="block text-lg font-semibold mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-background border border-border text-foreground"
              placeholder="your@email.com"
            />
          </div>

          <div>
            <label className="block text-lg font-semibold mb-2">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-background border border-border text-foreground"
              placeholder="••••••••"
            />
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full px-6 py-3 bg-foreground text-background hover:bg-muted text-lg"
          >
            {loading ? "Logging in..." : "Login"}
          </Button>
        </form>

        <p className="text-center text-muted mt-8">
          Don't have an account?{" "}
          <Link href="/" className="text-foreground font-semibold hover:underline">
            Register here
          </Link>
        </p>
      </main>
    </div>
  )
}
