# dream-store-basic

Minimal e-commerce store template with cart and guest checkout via `@dream-api/sdk`.

## Commands

```bash
npm install    # Install dependencies
npm run dev    # Start dev server
npm run build  # Build for production
```

## Quick Setup

```bash
# 1. Clone and install
git clone https://github.com/YOUR_USER/dream-store-basic.git
cd dream-store-basic
npm install

# 2. Set your publishable key
cp .env.example .env.local
# Edit: VITE_DREAM_PUBLISHABLE_KEY=pk_test_xxx

# 3. Run
npm run dev
```

## What's Included

- Clean, minimal dark theme
- Product grid with detail modals
- Slide-out cart drawer
- Multi-page navigation (Shop, About, Contact)
- Guest checkout (no auth required)
- Mobile responsive

## File Structure

```
dream-store-basic/
├── src/
│   ├── App.tsx              # Main app + BRANDING config
│   ├── main.tsx             # Entry point
│   ├── index.css            # Tailwind styles
│   ├── components/
│   │   └── Layout.tsx       # Header, nav, footer
│   ├── pages/
│   │   ├── About.tsx        # About page
│   │   └── Contact.tsx      # Contact form
│   └── assets/              # Logo, images
├── .claude/
│   └── commands/
│       └── setup.md         # AI setup command
├── CLAUDE.md                # This file
└── .env.example
```

## Customization

### Branding

Edit the `BRANDING` object in `src/App.tsx`:

```typescript
const BRANDING = {
  storeName: 'Your Store',
  tagline: 'Quality products, simple shopping',
  description: 'Curated items for people who appreciate good things.',
  primaryColor: '#18181b',  // zinc-900
  accentColor: '#3f3f46',   // zinc-700
}
```

Also update `src/components/Layout.tsx`:
```typescript
const BRANDING = {
  storeName: 'Your Store',
}
```

### Style Presets

**Minimal (default)**
```typescript
primaryColor: '#18181b', accentColor: '#3f3f46'
```

**Bold**
```typescript
primaryColor: '#dc2626', accentColor: '#ea580c'  // Red/Orange
primaryColor: '#2563eb', accentColor: '#7c3aed'  // Blue/Violet
```

**Warm**
```typescript
primaryColor: '#a16207', accentColor: '#ca8a04'  // Amber
```

**Dark**
```typescript
primaryColor: '#0f172a', accentColor: '#334155'  // Slate
```

### Adding a Logo

Place your logo in `src/assets/logo.png`, then update `Layout.tsx`:

```tsx
<Link to="/" className="flex items-center gap-2">
  <img src="/assets/logo.png" alt="Logo" className="h-8" />
  <span className="text-xl font-medium text-zinc-100">{storeName}</span>
</Link>
```

## How It Works

### No Auth Required
- Products are public (PK-only endpoint)
- Cart checkout doesn't need user sign-in
- Stripe collects customer info at checkout

### Checkout Flow
1. User adds items to cart
2. Clicks "Checkout" in drawer
3. Redirected to Stripe Checkout
4. Stripe collects payment + email
5. Success redirect back to store

## SDK Usage

### List Products
```typescript
const { products } = await api.products.list()
// products[].name, price, priceId, imageUrl, soldOut, inventory
```

### Cart Checkout
```typescript
const { url } = await api.products.cartCheckout({
  items: [{ priceId: 'price_xxx', quantity: 2 }],
  successUrl: window.location.origin + '?success=true',
  cancelUrl: window.location.origin + '?canceled=true',
})
window.location.href = url
```

## Environment

```env
# .env.local
VITE_DREAM_PUBLISHABLE_KEY=pk_test_xxx
```

That's it. No secret key needed for store mode.

## Deployment

Works with any static host:

```bash
npm run build
# Deploy dist/ to Cloudflare Pages, Vercel, Netlify, etc.
```

Set `VITE_DREAM_PUBLISHABLE_KEY` in your host's environment variables.

## Adding Features

### Cart Persistence
```typescript
// Save cart to localStorage
useEffect(() => {
  localStorage.setItem('cart', JSON.stringify(cart))
}, [cart])

// Load on mount
const [cart, setCart] = useState<CartItem[]>(() => {
  const saved = localStorage.getItem('cart')
  return saved ? JSON.parse(saved) : []
})
```

### Quantity Limits
```typescript
function addToCart(product: Product) {
  const inCart = cart.find(i => i.priceId === product.priceId)
  const currentQty = inCart?.quantity || 0

  if (product.inventory && currentQty >= product.inventory) {
    alert('Cannot add more - limited stock')
    return
  }
  // ... rest
}
```

## Use Cases

- Pop-up shops
- Merch drops
- Artist sales
- Event merchandise
- Small business storefronts

Minimal infrastructure. Just products + checkout.
