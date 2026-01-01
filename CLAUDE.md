# dream-store-basic

E-commerce store template with cart and guest checkout via `@dream-api/sdk`.

## Commands

```bash
# Install
npm install

# Development
npm run dev

# Build
npm run build

# Deploy (output in dist/)
```

## Quick Setup

```bash
# 1. Clone and install
git clone https://github.com/YOUR_USER/dream-store-basic.git
cd dream-store-basic
npm install

# 2. Set your publishable key (get from dream-api dashboard)
cp .env.example .env.local
# Edit: VITE_DREAM_PUBLISHABLE_KEY=pk_test_xxx

# 3. Run
npm run dev
```

## What's Included

- Product grid with images
- Slide-out cart drawer
- Guest checkout (no auth required)
- Inventory tracking
- Sold out states

## Customization Guide

### 1. Branding (Start Here)

Edit the `BRANDING` object in `src/App.tsx`:

```typescript
const BRANDING = {
  storeName: 'Your Store',        // Store name in header
  tagline: 'Your Tagline',        // Hero section headline
  description: 'What you sell',   // Subheadline
  primaryColor: '#8b5cf6',        // Main brand color (hex)
  accentColor: '#ec4899',         // Secondary/gradient color (hex)
}
```

### 2. Color Schemes

Popular combinations:

```typescript
// Purple/Pink (default)
primaryColor: '#8b5cf6', accentColor: '#ec4899'

// Blue/Cyan
primaryColor: '#3b82f6', accentColor: '#06b6d4'

// Green/Emerald
primaryColor: '#10b981', accentColor: '#22c55e'

// Orange/Red
primaryColor: '#f97316', accentColor: '#ef4444'

// Slate/Professional
primaryColor: '#475569', accentColor: '#64748b'
```

### 3. Add a Logo

In the header section of `src/App.tsx`:

```tsx
<h1 className="text-2xl font-bold text-white flex items-center gap-2">
  <img src="/logo.png" alt="Logo" className="h-8" />
  {storeName}
</h1>
```

## File Structure

```
dream-store-basic/
├── CLAUDE.md           # This file (AI instructions)
├── src/
│   ├── App.tsx         # Everything (single-file for simplicity)
│   ├── main.tsx        # Entry point
│   └── index.css       # Global styles (Tailwind)
├── .env.example
└── package.json
```

## How It Works

### No Auth Required
- Products are public (PK-only endpoint)
- Cart checkout doesn't need user sign-in
- Stripe collects customer info at checkout

### Cart State
Stored in React state. For persistence, add localStorage:

```typescript
// Save cart
useEffect(() => {
  localStorage.setItem('cart', JSON.stringify(cart));
}, [cart]);

// Load cart on mount
const [cart, setCart] = useState<CartItem[]>(() => {
  const saved = localStorage.getItem('cart');
  return saved ? JSON.parse(saved) : [];
});
```

### Checkout Flow
1. User adds items to cart
2. Clicks "Checkout" in drawer
3. Redirected to Stripe Checkout
4. Stripe collects payment + email
5. Success redirect back to store

## SDK Patterns

### List Products
```typescript
const { products } = await api.products.list();
// products[].name, price, priceId, imageUrl, soldOut, inventory
```

### Cart Checkout
```typescript
const { url } = await api.products.cartCheckout({
  items: [{ priceId: 'price_xxx', quantity: 2 }],
  customerEmail: 'optional@email.com',
  successUrl: window.location.href + '?success=true',
  cancelUrl: window.location.href + '?canceled=true',
});
window.location.href = url;
```

## Environment Variables

```env
# .env.local
VITE_DREAM_PUBLISHABLE_KEY=pk_test_xxx

# That's it! No secret key for store mode.
```

## Deployment

Works with any static host:

```bash
npm run build
# Deploy dist/
```

Set `VITE_DREAM_PUBLISHABLE_KEY` in your host's env vars.

## Common Customizations

### Quantity Limits
```typescript
function addToCart(product: Product) {
  const inCart = cart.find(i => i.priceId === product.priceId);
  const currentQty = inCart?.quantity || 0;

  if (product.inventory && currentQty >= product.inventory) {
    alert('Cannot add more - limited stock');
    return;
  }
  // ... rest
}
```

### Categories/Filtering
```typescript
const [filter, setFilter] = useState('all');
const filteredProducts = filter === 'all'
  ? products
  : products.filter(p => p.category === filter);
```

### Success Page
Instead of alert, show a success component:
```typescript
const [showSuccess, setShowSuccess] = useState(false);

if (params.get('success') === 'true') {
  setCart([]);
  setShowSuccess(true);
}
```

## Use Cases

Perfect for:
- Yard sales
- Farmer's markets
- Pop-up shops
- Merch drops
- One-time events

Minimal infrastructure, just products + checkout.
