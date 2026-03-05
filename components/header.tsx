"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"

export function Header() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  const isAdmin = pathname.includes("/admin")

  return (
    <header className="sticky top-0 z-50 bg-background border-b border-border">
      <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-3xl font-bold tracking-tight hover:opacity-80 transition">
          EventHub
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-12">
          <Link
            href="/events"
            className={`text-base font-medium transition ${
              pathname === "/events" ? "text-foreground" : "text-muted hover:text-foreground"
            }`}
          >
            Events
          </Link>
          {isAdmin && (
            <Link
              href="/admin/dashboard"
              className={`text-base font-medium transition ${
                pathname.includes("/admin") ? "text-foreground" : "text-muted hover:text-foreground"
              }`}
            >
              Dashboard
            </Link>
          )}
        </nav>

        {/* Admin Login Button */}
        {!isAdmin && (
          <Link href="/admin/login" className="hidden md:block">
            <Button className="bg-foreground text-background hover:bg-foreground/90 font-medium">Admin Login</Button>
          </Link>
        )}

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-foreground text-2xl"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-t border-border bg-background">
          <div className="px-6 py-4 flex flex-col gap-4">
            <Link href="/events" className="text-base font-medium text-muted hover:text-foreground">
              Events
            </Link>
            {isAdmin && (
              <Link href="/admin/dashboard" className="text-base font-medium text-muted hover:text-foreground">
                Dashboard
              </Link>
            )}
            <Link href="/admin/login" className="pt-2 border-t border-border">
              <Button className="w-full bg-foreground text-background hover:bg-foreground/90 font-medium">
                Admin Login
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
