export function Footer() {
  return (
    <footer className="bg-pink-900 border-t border-pink-800 mt-24 text-white">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold mb-4">EventHub</h3>
            <p className="text-pink-200 text-sm leading-relaxed">
              Create, manage, and organize events with powerful registration tools.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-bold mb-4 text-sm uppercase tracking-wider">Platform</h4>
            <ul className="space-y-3">
              <li>
                <a href="/events" className="text-pink-200 hover:text-white transition text-sm">
                  Browse Events
                </a>
              </li>
              <li>
                <a href="#" className="text-pink-200 hover:text-white transition text-sm">
                  How It Works
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-bold mb-4 text-sm uppercase tracking-wider">Company</h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-pink-200 hover:text-white transition text-sm">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="text-pink-200 hover:text-white transition text-sm">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-bold mb-4 text-sm uppercase tracking-wider">Legal</h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-pink-200 hover:text-white transition text-sm">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-pink-200 hover:text-white transition text-sm">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-pink-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-pink-200 text-sm">&copy; 2025 EventHub. All rights reserved.</p>
          <p className="text-pink-200 text-sm font-medium">Developed by ByteCraftSoft x Abdul Samad</p>
          <div className="flex gap-6 text-pink-200">
            <a href="#" className="hover:text-white transition text-sm">
              Twitter
            </a>
            <a href="#" className="hover:text-white transition text-sm">
              LinkedIn
            </a>
            <a href="#" className="hover:text-white transition text-sm">
              Instagram
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
