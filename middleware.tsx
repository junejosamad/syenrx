import { type NextRequest, NextResponse } from "next/server"

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  if (pathname.startsWith("/admin")) {
    // Check for admin session token
    const adminToken = request.cookies.get("adminToken")?.value

    if (!adminToken && pathname !== "/admin/login") {
      return NextResponse.redirect(new URL("/admin/login", request.url))
    }

    if (adminToken && pathname === "/admin/login") {
      return NextResponse.redirect(new URL("/admin/dashboard", request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*"],
}
