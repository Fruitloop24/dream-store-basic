import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { DreamAPI } from '@dream-api/sdk'
import Layout from './components/Layout'
import About from './pages/About'
import Contact from './pages/Contact'
import { CONFIG, getAccentClasses, getThemeClasses } from './config'
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
  const theme = getThemeClasses()
  const accent = getAccentClasses()

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

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0) / 100
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
          <h2 className={`text-4xl md:text-5xl font-light ${theme.heading} mb-4 tracking-tight`}>
            {tagline}
          </h2>
          <p className={`text-lg ${theme.body} max-w-xl mx-auto`}>
            {description}
          </p>
        </div>

        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className={`w-8 h-8 border-2 ${theme.divider} border-t-current rounded-full animate-spin ${theme.body}`}></div>
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
                className={`group ${theme.cardBg} rounded-lg overflow-hidden ${theme.cardHover} transition-colors`}
              >
                {/* Product Image */}
                <div className={`aspect-square ${theme.imagePlaceholder} relative overflow-hidden`}>
                  {product.imageUrl ? (
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className={`w-full h-full flex items-center justify-center ${theme.imagePlaceholder}`}>
                      <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                      </svg>
                    </div>
                  )}
                  {product.soldOut && (
                    <div className={`absolute inset-0 ${theme.soldOutOverlay} flex items-center justify-center`}>
                      <span className={`${theme.soldOutText} text-sm font-medium tracking-wide uppercase`}>
                        Sold Out
                      </span>
                    </div>
                  )}
                </div>

                {/* Product Info */}
                <div className="p-5">
                  <h3 className={`text-lg font-medium ${theme.heading} mb-1`}>
                    {product.displayName || product.name}
                  </h3>
                  {product.description && (
                    <p className={`${theme.muted} text-sm mb-4 line-clamp-2`}>
                      {product.description}
                    </p>
                  )}
                  <div className="flex justify-between items-center mb-4">
                    <span className={`text-2xl font-light ${theme.price}`}>
                      ${(product.price / 100).toFixed(2)}
                    </span>
                    {product.inventory !== null && product.inventory !== undefined && (
                      <span className={`text-xs ${theme.stockText}`}>
                        {product.inventory} in stock
                      </span>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => setSelectedProduct(product)}
                      className={`flex-1 py-2.5 text-sm font-medium rounded ${theme.buttonSecondary} transition-colors`}
                    >
                      Details
                    </button>
                    <button
                      onClick={() => addToCart(product)}
                      disabled={product.soldOut}
                      className={`flex-1 py-2.5 text-sm font-medium rounded transition-colors disabled:opacity-40 disabled:cursor-not-allowed ${accent.bg} ${accent.buttonText} ${accent.bgHover}`}
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
            <p className={theme.muted}>No products available yet.</p>
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
            className={`fixed inset-0 ${theme.modalOverlay} backdrop-blur-sm z-[60]`}
            onClick={() => setSelectedProduct(null)}
          />
          <div className={`fixed inset-4 md:inset-10 lg:inset-20 ${theme.modalBg} rounded-lg z-[60] overflow-hidden flex flex-col md:flex-row`}>
            <div className={`md:w-1/2 ${theme.imagePlaceholder} flex items-center justify-center p-8`}>
              {selectedProduct.imageUrl ? (
                <img
                  src={selectedProduct.imageUrl}
                  alt={selectedProduct.name}
                  className="max-w-full max-h-full object-contain"
                />
              ) : (
                <svg className={`w-32 h-32 ${theme.muted}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              )}
            </div>

            <div className="md:w-1/2 p-8 flex flex-col overflow-y-auto">
              <button
                onClick={() => setSelectedProduct(null)}
                className={`absolute top-4 right-4 ${theme.muted} ${theme.link} transition-colors`}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <h2 className={`text-2xl font-medium ${theme.heading} mb-2`}>
                {selectedProduct.displayName || selectedProduct.name}
              </h2>

              <div className={`text-3xl font-light ${theme.price} mb-6`}>
                ${(selectedProduct.price / 100).toFixed(2)}
              </div>

              {selectedProduct.description && (
                <p className={`${theme.body} mb-6 leading-relaxed`}>
                  {selectedProduct.description}
                </p>
              )}

              {selectedProduct.features && selectedProduct.features.length > 0 && (
                <div className="mb-6">
                  <h3 className={`text-xs font-medium ${theme.muted} uppercase tracking-wider mb-3`}>
                    Features
                  </h3>
                  <ul className="space-y-2">
                    {selectedProduct.features.map((feature, i) => (
                      <li key={i} className={`flex items-center gap-2 ${theme.body} text-sm`}>
                        <span className={`w-1 h-1 ${theme.featureDot} rounded-full`}></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {selectedProduct.inventory !== null && selectedProduct.inventory !== undefined && (
                <p className={`${theme.stockText} text-sm mb-6`}>
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
                  className={`flex-1 py-3 rounded font-medium transition-colors disabled:opacity-40 disabled:cursor-not-allowed ${accent.bg} ${accent.buttonText} ${accent.bgHover}`}
                >
                  {selectedProduct.soldOut ? 'Sold Out' : 'Add to Cart'}
                </button>
                <button
                  onClick={() => setSelectedProduct(null)}
                  className={`px-6 py-3 rounded font-medium ${theme.buttonSecondary} transition-colors`}
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
          className={`fixed inset-0 ${theme.modalOverlay} backdrop-blur-sm z-50`}
          onClick={() => setCartOpen(false)}
        />
      )}

      <div className={`fixed top-0 right-0 h-full w-full max-w-md ${theme.drawerBg} z-50 transform transition-transform duration-300 ${cartOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col h-full">
          <div className={`flex justify-between items-center p-6 border-b ${theme.divider}`}>
            <h2 className={`text-lg font-medium ${theme.heading}`}>
              Cart {cartCount > 0 && <span className={`${theme.muted} font-normal`}>({cartCount})</span>}
            </h2>
            <button
              onClick={() => setCartOpen(false)}
              className={`${theme.muted} ${theme.link} transition-colors`}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6">
            {cart.length === 0 ? (
              <div className="text-center py-12">
                <p className={`${theme.muted} mb-4`}>Your cart is empty</p>
                <button
                  onClick={() => setCartOpen(false)}
                  className={`${theme.link} text-sm transition-colors`}
                >
                  Continue shopping
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {cart.map((item) => (
                  <div
                    key={item.priceId}
                    className={`flex gap-4 p-4 ${theme.cartItemBg} rounded`}
                  >
                    {item.imageUrl ? (
                      <img src={item.imageUrl} alt={item.name} className="w-16 h-16 rounded object-cover flex-shrink-0" />
                    ) : (
                      <div className={`w-16 h-16 rounded ${theme.imagePlaceholder} flex items-center justify-center flex-shrink-0`}>
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                        </svg>
                      </div>
                    )}

                    <div className="flex-1 min-w-0">
                      <h4 className={`${theme.heading} font-medium text-sm truncate`}>
                        {item.displayName || item.name}
                      </h4>
                      <p className={`${theme.muted} text-sm`}>${(item.price / 100).toFixed(2)}</p>

                      <div className="flex items-center gap-3 mt-2">
                        <button
                          onClick={() => updateQuantity(item.priceId, -1)}
                          className={`w-6 h-6 rounded ${theme.quantityButton} flex items-center justify-center text-sm transition-colors`}
                        >
                          -
                        </button>
                        <span className={`${theme.heading} text-sm w-4 text-center`}>{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.priceId, 1)}
                          className={`w-6 h-6 rounded ${theme.quantityButton} flex items-center justify-center text-sm transition-colors`}
                        >
                          +
                        </button>
                        <button
                          onClick={() => removeFromCart(item.priceId)}
                          className="ml-auto text-red-500 hover:text-red-400 text-xs transition-colors"
                        >
                          Remove
                        </button>
                      </div>
                    </div>

                    <div className={`${theme.heading} font-medium text-sm`}>
                      ${(item.price * item.quantity / 100).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {cart.length > 0 && (
            <div className={`p-6 border-t ${theme.divider}`}>
              <div className="flex justify-between items-center mb-4">
                <span className={theme.muted}>Subtotal</span>
                <span className={`text-xl font-medium ${theme.heading}`}>${cartTotal.toFixed(2)}</span>
              </div>
              <button
                onClick={handleCheckout}
                disabled={checkingOut}
                className={`w-full py-3 rounded font-medium transition-colors flex items-center justify-center gap-2 disabled:opacity-50 ${accent.bg} ${accent.buttonText} ${accent.bgHover}`}
              >
                {checkingOut ? (
                  <>
                    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                    Processing...
                  </>
                ) : (
                  'Checkout'
                )}
              </button>
              <p className={`text-center ${theme.muted} text-xs mt-3`}>
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
