import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { DreamAPI } from '@dream-api/sdk'
import Layout from './components/Layout'
import About from './pages/About'
import Contact from './pages/Contact'
import { CONFIG } from './config'
import './index.css'

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
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  const { tagline, description } = CONFIG

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
        successUrl: window.location.origin + '?success=true',
        cancelUrl: window.location.origin + '?canceled=true',
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

  // ============================================================================
  // HOME PAGE
  // ============================================================================
  function HomePage() {
    return (
      <div className="max-w-6xl mx-auto px-4 py-16">
        {/* Hero */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-light text-zinc-100 mb-4 tracking-tight">
            {tagline}
          </h2>
          <p className="text-lg text-zinc-500 max-w-xl mx-auto">
            {description}
          </p>
        </div>

        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="w-8 h-8 border-2 border-zinc-700 border-t-zinc-400 rounded-full animate-spin"></div>
          </div>
        )}

        {error && (
          <div className="bg-red-950/50 border border-red-900 text-red-400 px-6 py-4 rounded-lg text-center">
            {error}
          </div>
        )}

        {!loading && !error && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <div
                key={product.priceId}
                className="group bg-zinc-900/50 border border-zinc-800 rounded-lg overflow-hidden hover:border-zinc-700 transition-colors"
              >
                {/* Product Image */}
                <div className="aspect-square bg-zinc-900 relative overflow-hidden">
                  {product.imageUrl ? (
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-zinc-700">
                      <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                      </svg>
                    </div>
                  )}
                  {product.soldOut && (
                    <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
                      <span className="text-zinc-400 text-sm font-medium tracking-wide uppercase">
                        Sold Out
                      </span>
                    </div>
                  )}
                </div>

                {/* Product Info */}
                <div className="p-5">
                  <h3 className="text-lg font-medium text-zinc-100 mb-1">
                    {product.displayName || product.name}
                  </h3>
                  {product.description && (
                    <p className="text-zinc-500 text-sm mb-4 line-clamp-2">
                      {product.description}
                    </p>
                  )}
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-2xl font-light text-zinc-200">
                      ${product.price.toFixed(2)}
                    </span>
                    {product.inventory !== null && product.inventory !== undefined && (
                      <span className="text-xs text-zinc-600">
                        {product.inventory} in stock
                      </span>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => setSelectedProduct(product)}
                      className="flex-1 py-2.5 text-sm font-medium rounded border border-zinc-700 text-zinc-400 hover:text-zinc-200 hover:border-zinc-600 transition-colors"
                    >
                      Details
                    </button>
                    <button
                      onClick={() => addToCart(product)}
                      disabled={product.soldOut}
                      className="flex-1 py-2.5 text-sm font-medium rounded transition-colors disabled:opacity-40 disabled:cursor-not-allowed text-zinc-900"
                      style={{
                        background: product.soldOut ? '#3f3f46' : '#fafafa'
                      }}
                    >
                      {product.soldOut ? 'Unavailable' : 'Add to Cart'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && !error && products.length === 0 && (
          <div className="text-center py-20">
            <p className="text-zinc-500">No products available yet.</p>
          </div>
        )}
      </div>
    )
  }

  return (
    <BrowserRouter>
      {/* Product Detail Modal */}
      {selectedProduct && (
        <>
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60]"
            onClick={() => setSelectedProduct(null)}
          />
          <div className="fixed inset-4 md:inset-10 lg:inset-20 bg-zinc-900 border border-zinc-800 rounded-lg z-[60] overflow-hidden flex flex-col md:flex-row">
            <div className="md:w-1/2 bg-zinc-950 flex items-center justify-center p-8">
              {selectedProduct.imageUrl ? (
                <img
                  src={selectedProduct.imageUrl}
                  alt={selectedProduct.name}
                  className="max-w-full max-h-full object-contain"
                />
              ) : (
                <svg className="w-32 h-32 text-zinc-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              )}
            </div>

            <div className="md:w-1/2 p-8 flex flex-col overflow-y-auto">
              <button
                onClick={() => setSelectedProduct(null)}
                className="absolute top-4 right-4 text-zinc-500 hover:text-zinc-300 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <h2 className="text-2xl font-medium text-zinc-100 mb-2">
                {selectedProduct.displayName || selectedProduct.name}
              </h2>

              <div className="text-3xl font-light text-zinc-300 mb-6">
                ${selectedProduct.price.toFixed(2)}
              </div>

              {selectedProduct.description && (
                <p className="text-zinc-400 mb-6 leading-relaxed">
                  {selectedProduct.description}
                </p>
              )}

              {selectedProduct.features && selectedProduct.features.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-xs font-medium text-zinc-500 uppercase tracking-wider mb-3">
                    Features
                  </h3>
                  <ul className="space-y-2">
                    {selectedProduct.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2 text-zinc-400 text-sm">
                        <span className="w-1 h-1 bg-zinc-600 rounded-full"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {selectedProduct.inventory !== null && selectedProduct.inventory !== undefined && (
                <p className="text-zinc-600 text-sm mb-6">
                  {selectedProduct.inventory > 0 ? `${selectedProduct.inventory} available` : 'Out of stock'}
                </p>
              )}

              <div className="mt-auto flex gap-3">
                <button
                  onClick={() => {
                    addToCart(selectedProduct)
                    setSelectedProduct(null)
                  }}
                  disabled={selectedProduct.soldOut}
                  className="flex-1 py-3 rounded font-medium transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                  style={{
                    background: selectedProduct.soldOut ? '#3f3f46' : '#fafafa',
                    color: selectedProduct.soldOut ? '#a1a1aa' : '#18181b'
                  }}
                >
                  {selectedProduct.soldOut ? 'Sold Out' : 'Add to Cart'}
                </button>
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="px-6 py-3 rounded font-medium border border-zinc-700 text-zinc-400 hover:text-zinc-200 hover:border-zinc-600 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Cart Drawer */}
      {cartOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          onClick={() => setCartOpen(false)}
        />
      )}

      <div className={`fixed top-0 right-0 h-full w-full max-w-md bg-zinc-900 border-l border-zinc-800 z-50 transform transition-transform duration-300 ${cartOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col h-full">
          <div className="flex justify-between items-center p-6 border-b border-zinc-800">
            <h2 className="text-lg font-medium text-zinc-100">
              Cart {cartCount > 0 && <span className="text-zinc-500 font-normal">({cartCount})</span>}
            </h2>
            <button
              onClick={() => setCartOpen(false)}
              className="text-zinc-500 hover:text-zinc-300 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6">
            {cart.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-zinc-500 mb-4">Your cart is empty</p>
                <button
                  onClick={() => setCartOpen(false)}
                  className="text-zinc-400 hover:text-zinc-200 text-sm transition-colors"
                >
                  Continue shopping
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {cart.map((item) => (
                  <div
                    key={item.priceId}
                    className="flex gap-4 p-4 bg-zinc-800/50 rounded border border-zinc-800"
                  >
                    {item.imageUrl ? (
                      <img src={item.imageUrl} alt={item.name} className="w-16 h-16 rounded object-cover flex-shrink-0" />
                    ) : (
                      <div className="w-16 h-16 rounded bg-zinc-800 flex items-center justify-center flex-shrink-0">
                        <svg className="w-6 h-6 text-zinc-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                        </svg>
                      </div>
                    )}

                    <div className="flex-1 min-w-0">
                      <h4 className="text-zinc-200 font-medium text-sm truncate">
                        {item.displayName || item.name}
                      </h4>
                      <p className="text-zinc-500 text-sm">${item.price.toFixed(2)}</p>

                      <div className="flex items-center gap-3 mt-2">
                        <button
                          onClick={() => updateQuantity(item.priceId, -1)}
                          className="w-6 h-6 rounded bg-zinc-700 hover:bg-zinc-600 text-zinc-300 flex items-center justify-center text-sm transition-colors"
                        >
                          -
                        </button>
                        <span className="text-zinc-300 text-sm w-4 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.priceId, 1)}
                          className="w-6 h-6 rounded bg-zinc-700 hover:bg-zinc-600 text-zinc-300 flex items-center justify-center text-sm transition-colors"
                        >
                          +
                        </button>
                        <button
                          onClick={() => removeFromCart(item.priceId)}
                          className="ml-auto text-zinc-600 hover:text-red-400 text-xs transition-colors"
                        >
                          Remove
                        </button>
                      </div>
                    </div>

                    <div className="text-zinc-200 font-medium text-sm">
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {cart.length > 0 && (
            <div className="p-6 border-t border-zinc-800">
              <div className="flex justify-between items-center mb-4">
                <span className="text-zinc-500">Subtotal</span>
                <span className="text-xl font-medium text-zinc-100">${cartTotal.toFixed(2)}</span>
              </div>
              <button
                onClick={handleCheckout}
                disabled={checkingOut}
                className="w-full py-3 rounded font-medium transition-colors flex items-center justify-center gap-2 disabled:opacity-50 bg-zinc-100 text-zinc-900 hover:bg-white"
              >
                {checkingOut ? (
                  <>
                    <div className="w-4 h-4 border-2 border-zinc-400 border-t-transparent rounded-full animate-spin"></div>
                    Processing...
                  </>
                ) : (
                  'Checkout'
                )}
              </button>
              <p className="text-center text-zinc-600 text-xs mt-3">
                Secure checkout via Stripe
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Routes with Layout */}
      <Layout cartCount={cartCount} cartTotal={cartTotal} onCartClick={() => setCartOpen(true)}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default App
