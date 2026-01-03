import { Link, useLocation } from 'react-router-dom'
import { CONFIG } from '../config'

interface LayoutProps {
  children: React.ReactNode
  cartCount: number
  cartTotal: number
  onCartClick: () => void
}

const NAV_LINKS = [
  { path: '/', label: 'Shop' },
  { path: '/about', label: 'About' },
  { path: '/contact', label: 'Contact' },
]

export default function Layout({ children, cartCount, cartTotal, onCartClick }: LayoutProps) {
  const location = useLocation()
  const { storeName, footer } = CONFIG

  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col">
      {/* Header */}
      <header className="bg-zinc-950 border-b border-zinc-900 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="text-xl font-medium text-zinc-100 hover:text-white transition-colors">
              {storeName}
            </Link>

            {/* Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              {NAV_LINKS.map((link) => {
                const isActive = location.pathname === link.path
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`text-sm transition-colors ${
                      isActive
                        ? 'text-zinc-100'
                        : 'text-zinc-500 hover:text-zinc-300'
                    }`}
                  >
                    {link.label}
                  </Link>
                )
              })}
            </nav>

            {/* Cart Button */}
            <button
              onClick={onCartClick}
              className="flex items-center gap-3 text-zinc-400 hover:text-zinc-200 transition-colors"
            >
              <span className="text-sm">${cartTotal.toFixed(2)}</span>
              <div className="relative">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-zinc-100 text-zinc-900 text-xs w-4 h-4 rounded-full flex items-center justify-center font-medium">
                    {cartCount}
                  </span>
                )}
              </div>
            </button>
          </div>

          {/* Mobile Navigation */}
          <nav className="flex md:hidden gap-6 pb-3 -mt-1">
            {NAV_LINKS.map((link) => {
              const isActive = location.pathname === link.path
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-sm transition-colors ${
                    isActive
                      ? 'text-zinc-100'
                      : 'text-zinc-500 hover:text-zinc-300'
                  }`}
                >
                  {link.label}
                </Link>
              )
            })}
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-900 mt-auto">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="md:col-span-2">
              <h3 className="text-lg font-medium text-zinc-100 mb-3">{storeName}</h3>
              <p className="text-zinc-500 text-sm leading-relaxed max-w-sm">
                {footer.tagline}
              </p>
            </div>

            {/* Links */}
            <div>
              <h4 className="text-xs font-medium text-zinc-400 uppercase tracking-wider mb-4">Shop</h4>
              <ul className="space-y-2">
                <li><Link to="/" className="text-zinc-500 hover:text-zinc-300 text-sm transition-colors">All Products</Link></li>
                <li><Link to="/about" className="text-zinc-500 hover:text-zinc-300 text-sm transition-colors">About</Link></li>
                <li><Link to="/contact" className="text-zinc-500 hover:text-zinc-300 text-sm transition-colors">Contact</Link></li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="text-xs font-medium text-zinc-400 uppercase tracking-wider mb-4">Support</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-zinc-500 hover:text-zinc-300 text-sm transition-colors">FAQ</a></li>
                <li><a href="#" className="text-zinc-500 hover:text-zinc-300 text-sm transition-colors">Shipping</a></li>
                <li><a href="#" className="text-zinc-500 hover:text-zinc-300 text-sm transition-colors">Returns</a></li>
              </ul>
            </div>
          </div>

          {/* Bottom */}
          <div className="border-t border-zinc-900 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-zinc-600 text-xs">
              &copy; {new Date().getFullYear()} {storeName}
            </p>
            <p className="text-zinc-700 text-xs">
              Powered by dream-api
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
