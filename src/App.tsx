import { useEffect, useState } from 'react'
import { DreamAPI } from '@dream-api/sdk'
import './index.css'

// ============================================================================
// AI: CUSTOMIZE THESE VALUES FOR YOUR STORE
// ============================================================================
const BRANDING = {
  storeName: 'Dream Store',
  tagline: 'Welcome to the Future',
  description: 'Powered by @dream-api/sdk',
  primaryColor: '#8b5cf6', // purple-500
  accentColor: '#ec4899',  // pink-500
}

// Initialize SDK with publishable key only (frontend-safe mode)
const api = new DreamAPI({
  publishableKey: import.meta.env.VITE_DREAM_PUBLISHABLE_KEY,
})

interface Product {
  name: string
  displayName?: string
  description?: string
  price: number
  priceId: string
  productId: string
  imageUrl?: string
  inventory?: number | null
  soldOut?: boolean
  features?: string[]
}

interface CartItem extends Product {
  quantity: number
}

function App() {
  const [products, setProducts] = useState<Product[]>([])
  const [cart, setCart] = useState<CartItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [checkingOut, setCheckingOut] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)

  const { storeName, tagline, description, primaryColor, accentColor } = BRANDING

  useEffect(() => {
    loadProducts()
  }, [])

  async function loadProducts() {
    try {
      setLoading(true)
      const response = await api.products.list()
      setProducts(response.products || [])
    } catch (err: any) {
      setError(err.message || 'Failed to load products')
    } finally {
      setLoading(false)
    }
  }

  function addToCart(product: Product) {
    setCart(prev => {
      const existing = prev.find(item => item.priceId === product.priceId)
      if (existing) {
        return prev.map(item =>
          item.priceId === product.priceId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      return [...prev, { ...product, quantity: 1 }]
    })
    // Open cart drawer when item added
    setCartOpen(true)
  }

  function removeFromCart(priceId: string) {
    setCart(prev => prev.filter(item => item.priceId !== priceId))
  }

  function updateQuantity(priceId: string, delta: number) {
    setCart(prev =>
      prev
        .map(item =>
          item.priceId === priceId
            ? { ...item, quantity: Math.max(0, item.quantity + delta) }
            : item
        )
        .filter(item => item.quantity > 0)
    )
  }

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0)

  async function handleCheckout() {
    if (cart.length === 0) return

    setCheckingOut(true)
    try {
      const items = cart.map(item => ({
        priceId: item.priceId,
        quantity: item.quantity,
      }))

      const result = await api.products.cartCheckout({
        items,
        successUrl: window.location.href + '?success=true',
        cancelUrl: window.location.href + '?canceled=true',
      })

      if (result.url) {
        window.location.href = result.url
      }
    } catch (err: any) {
      alert('Checkout failed: ' + (err.message || 'Unknown error'))
    } finally {
      setCheckingOut(false)
    }
  }

  // Handle success/cancel in URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    if (params.get('success') === 'true') {
      setCart([])
      alert('Payment successful! Thank you for your order.')
      window.history.replaceState({}, '', window.location.pathname)
    }
    if (params.get('canceled') === 'true') {
      alert('Payment was canceled.')
      window.history.replaceState({}, '', window.location.pathname)
    }
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* ================================================================== */}
      {/* HEADER WITH CART BUTTON                                           */}
      {/* ================================================================== */}
      <header className="bg-black/30 backdrop-blur-md border-b border-white/10 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <span className="text-3xl">✨</span>
            {storeName}
          </h1>

          {/* Cart Button */}
          <button
            onClick={() => setCartOpen(true)}
            className="relative bg-white/10 hover:bg-white/20 text-white px-5 py-2.5 rounded-full flex items-center gap-3 transition-all"
          >
            <span className="text-xl">🛒</span>
            <span className="font-semibold">${cartTotal.toFixed(2)}</span>
            {cartCount > 0 && (
              <span
                className="absolute -top-2 -right-2 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center font-bold"
                style={{ backgroundColor: accentColor }}
              >
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* ================================================================== */}
      {/* CART DRAWER (Slide-out from right)                                */}
      {/* ================================================================== */}

      {/* Backdrop */}
      {cartOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          onClick={() => setCartOpen(false)}
        />
      )}

      {/* Drawer */}
      <div className={`fixed top-0 right-0 h-full w-full max-w-md bg-slate-900 border-l border-white/10 z-50 transform transition-transform duration-300 ${cartOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col h-full">
          {/* Drawer Header */}
          <div className="flex justify-between items-center p-6 border-b border-white/10">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span>🛒</span> Your Cart
              {cartCount > 0 && <span className="text-sm text-gray-400">({cartCount} items)</span>}
            </h2>
            <button
              onClick={() => setCartOpen(false)}
              className="text-gray-400 hover:text-white text-2xl"
            >
              ✕
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-6">
            {cart.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-5xl mb-4">🛒</div>
                <p className="text-gray-400">Your cart is empty</p>
                <button
                  onClick={() => setCartOpen(false)}
                  className="mt-4 text-purple-400 hover:text-purple-300"
                >
                  Continue shopping →
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {cart.map((item) => (
                  <div
                    key={item.priceId}
                    className="flex gap-4 bg-white/5 rounded-xl p-4"
                  >
                    {/* Image */}
                    {item.imageUrl ? (
                      <img src={item.imageUrl} alt={item.name} className="w-20 h-20 rounded-lg object-cover flex-shrink-0" />
                    ) : (
                      <div className="w-20 h-20 rounded-lg bg-purple-500/20 flex items-center justify-center text-3xl flex-shrink-0">
                        📦
                      </div>
                    )}

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <h4 className="text-white font-semibold truncate">{item.displayName || item.name}</h4>
                      <p className="text-purple-300 text-sm">${item.price.toFixed(2)}</p>

                      {/* Quantity controls */}
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() => updateQuantity(item.priceId, -1)}
                          className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center text-sm"
                        >
                          -
                        </button>
                        <span className="text-white font-medium w-6 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.priceId, 1)}
                          className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center text-sm"
                        >
                          +
                        </button>
                        <button
                          onClick={() => removeFromCart(item.priceId)}
                          className="ml-auto text-red-400 hover:text-red-300 text-sm"
                        >
                          Remove
                        </button>
                      </div>
                    </div>

                    {/* Line total */}
                    <div className="text-white font-bold text-right">
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Checkout Footer */}
          {cart.length > 0 && (
            <div className="p-6 border-t border-white/10 bg-black/20">
              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-300">Subtotal</span>
                <span className="text-2xl font-bold text-white">${cartTotal.toFixed(2)}</span>
              </div>
              <button
                onClick={handleCheckout}
                disabled={checkingOut}
                className="w-full py-4 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-2 text-white disabled:opacity-50"
                style={{ background: `linear-gradient(to right, ${primaryColor}, ${accentColor})` }}
              >
                {checkingOut ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                    Processing...
                  </>
                ) : (
                  <>
                    <span>💳</span> Checkout
                  </>
                )}
              </button>
              <p className="text-center text-gray-500 text-xs mt-3">
                Secure checkout powered by Stripe
              </p>
            </div>
          )}
        </div>
      </div>

      {/* ================================================================== */}
      {/* MAIN CONTENT                                                       */}
      {/* ================================================================== */}
      <main className="max-w-6xl mx-auto px-4 py-12">
        {/* Hero */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-white mb-4">{tagline}</h2>
          <p className="text-xl text-purple-200">
            {description}
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <div
              className="animate-spin rounded-full h-12 w-12 border-4 border-t-transparent"
              style={{ borderColor: `${primaryColor} transparent ${primaryColor} ${primaryColor}` }}
            ></div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-500/20 border border-red-500 text-red-200 px-6 py-4 rounded-xl text-center">
            {error}
          </div>
        )}

        {/* Products Grid */}
        {!loading && !error && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <div
                key={product.priceId}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:border-purple-500/50 transition-all hover:shadow-xl hover:shadow-purple-500/10 group"
              >
                {/* Product Image */}
                <div className="aspect-square bg-gradient-to-br from-purple-600/20 to-pink-600/20 relative overflow-hidden">
                  {product.imageUrl ? (
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-6xl">
                      📦
                    </div>
                  )}
                  {product.soldOut && (
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                      <span className="bg-red-500 text-white px-4 py-2 rounded-full font-bold">
                        SOLD OUT
                      </span>
                    </div>
                  )}
                </div>

                {/* Product Info */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-1">{product.displayName || product.name}</h3>
                  {product.description && (
                    <p className="text-gray-400 text-sm mb-3 line-clamp-2">{product.description}</p>
                  )}
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-3xl font-bold" style={{ color: primaryColor }}>
                      ${product.price.toFixed(2)}
                    </span>
                    {product.inventory !== null && product.inventory !== undefined && (
                      <span className="text-sm text-gray-400">
                        {product.inventory} left
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => addToCart(product)}
                    disabled={product.soldOut}
                    className="w-full text-white font-semibold py-3 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{
                      background: product.soldOut
                        ? '#4b5563'
                        : `linear-gradient(to right, ${primaryColor}, ${accentColor})`
                    }}
                  >
                    {product.soldOut ? 'Sold Out' : 'Add to Cart'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && products.length === 0 && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🏪</div>
            <h3 className="text-2xl font-bold text-white mb-2">No products yet</h3>
            <p className="text-gray-400">Check back soon!</p>
          </div>
        )}
      </main>

      {/* ================================================================== */}
      {/* FOOTER                                                             */}
      {/* ================================================================== */}
      <footer className="bg-black/30 border-t border-white/10 py-8 mt-auto">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-400">
            Built with <span className="font-mono" style={{ color: primaryColor }}>@dream-api/sdk</span>
          </p>
          <p className="text-gray-500 text-sm mt-2">
            Auth, Billing, Usage - All in one API
          </p>
        </div>
      </footer>
    </div>
  )
}

export default App
