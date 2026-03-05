import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <div className="min-h-screen bg-pink-50 text-foreground flex flex-col">
      <Header />

      <main className="flex-1 max-w-7xl mx-auto px-6 w-full">
        <section className="py-24 md:py-40">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6 tracking-tight text-pink-900">
              Events Made Fun
            </h1>
            <p className="text-lg md:text-xl text-gray-700 mb-10 leading-relaxed max-w-2xl">
              Create amazing events, manage registrations, and connect with teams. Simple, colorful, and delightful.
            </p>
            <div className="flex flex-col sm:flex-row gap-6">
              <Link href="/events">
                <Button className="w-full sm:w-auto px-8 py-6 text-lg bg-pink-600 text-white hover:bg-pink-700 font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all">
                  Browse Events
                </Button>
              </Link>
              <Link href="/admin/login">
                <Button className="w-full sm:w-auto px-8 py-6 text-lg border-2 border-pink-600 text-pink-600 hover:bg-pink-100 font-semibold rounded-xl transition-all bg-transparent">
                  Admin Login
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <section className="py-24 md:py-32">
          <h2 className="text-4xl md:text-5xl font-bold mb-16 tracking-tight text-pink-900">Why EventHub?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-pink-500 text-white p-8 rounded-2xl space-y-4 shadow-lg hover:shadow-xl transition-all transform hover:scale-105">
              <h3 className="text-2xl font-bold">Create Events</h3>
              <p className="leading-relaxed opacity-95">
                Build events with team or individual registration options, manage entry fees, and set registration
                deadlines.
              </p>
            </div>
            <div className="bg-pink-400 text-white p-8 rounded-2xl space-y-4 shadow-lg hover:shadow-xl transition-all transform hover:scale-105">
              <h3 className="text-2xl font-bold">Custom Forms</h3>
              <p className="leading-relaxed opacity-95">
                Design custom registration forms like Google Forms to collect the exact information you need.
              </p>
            </div>
            <div className="bg-rose-500 text-white p-8 rounded-2xl space-y-4 shadow-lg hover:shadow-xl transition-all transform hover:scale-105">
              <h3 className="text-2xl font-bold">Payment Proof</h3>
              <p className="leading-relaxed opacity-95">
                Collect and verify payment proofs from registrants. Manage payment details and track confirmations.
              </p>
            </div>
          </div>
        </section>

        <section className="py-24 md:py-32">
          <div className="bg-pink-600 rounded-3xl px-8 md:px-16 py-16 md:py-20 space-y-8 shadow-2xl">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">Ready to Get Started?</h2>
              <p className="text-lg opacity-90 max-w-2xl text-white">
                Join EventHub today and start creating amazing events. Log in as admin to create your first event.
              </p>
            </div>
            <Link href="/admin/login" className="inline-block">
              <Button className="px-8 py-6 text-lg bg-white text-pink-600 hover:bg-gray-100 font-semibold rounded-xl shadow-lg transition-all">
                Admin Login →
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
