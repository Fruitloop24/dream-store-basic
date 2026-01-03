# dream-store-basic

E-commerce store template with cart and guest checkout via `@dream-api/sdk`.

## IMPORTANT - How This Works

**Dashboard First:** Before using this template, set up your project in the Dream API dashboard:
1. Create a project (Store type)
2. Add your products (name, price, description, images)
3. Get your publishable key

**Products load from your dashboard.** Add, edit, update inventory - all in the dashboard. Store updates automatically.

**No auth required.** Guest checkout - Stripe collects customer info at payment.

## Quick Start

```bash
npm install
npm run dev
```

Set `VITE_DREAM_PUBLISHABLE_KEY` in `.env.local` with your key from the dashboard.

## Setup Command

Run `/setup` for guided configuration:
1. Add your publishable key
2. Configure branding
3. Done - products load from dashboard

## File Structure

```
src/
├── config.ts              # EDIT THIS - all branding in one place
├── App.tsx                # Main app, product grid, cart
├── components/
│   └── Layout.tsx         # Header, nav, footer
└── pages/
    ├── About.tsx          # About page
    └── Contact.tsx        # Contact page
```

## What To Customize

### src/config.ts (MAIN FILE)

All branding is here:
- `storeName` - Your store name
- `tagline` - Short tagline
- `description` - One sentence about your store
- `theme` - 'light' or 'dark' (one toggle switches entire store)
- `accentColor` - zinc, emerald, sky, violet, rose, amber
- `logo` - Path to logo in public/ folder
- `footer.tagline` - Footer description
- `about` - About page content
- `contact` - Contact email

**Theme system:** Change `theme: 'dark'` to `theme: 'light'` and the entire store switches - backgrounds, text, cards, cart, everything. No other changes needed.

## What NOT To Modify

1. **Product display logic** - Products come from API
2. **Cart/checkout logic** - Already wired up
3. **Stripe integration** - SDK handles it

## SDK Reference

```typescript
import { DreamAPI } from '@dream-api/sdk'

const api = new DreamAPI({
  publishableKey: import.meta.env.VITE_DREAM_PUBLISHABLE_KEY,
})

// List products (from dashboard)
const { products } = await api.products.list()
// products[].name, price, priceId, imageUrl, soldOut, inventory, features

// Guest checkout
const { url } = await api.products.cartCheckout({
  items: [{ priceId: 'price_xxx', quantity: 2 }],
  successUrl: window.location.origin + '?success=true',
  cancelUrl: window.location.origin + '?canceled=true',
})
window.location.href = url
```

## What You Control in Dashboard vs Template

| In Dashboard | In Template |
|--------------|-------------|
| Products (name, price, images) | Branding, colors |
| Inventory levels | About/Contact content |
| Product descriptions | Footer links |
| Product features | Logo image |

**Add products in dashboard → Store updates automatically.**

## Checkout Flow

1. User adds items to cart
2. Clicks "Checkout" in drawer
3. Redirected to Stripe Checkout
4. Stripe collects payment + email
5. Success redirect back to store

No account needed. No auth required.

## Deployment

```bash
npm run build
```

Deploy `dist/` anywhere:
- **Cloudflare Pages**: `npx wrangler pages deploy dist`
- **Vercel/Netlify**: Connect repo, set VITE_DREAM_PUBLISHABLE_KEY env var

## Don't Do These Things

- Don't hardcode products (they come from API)
- Don't put secret key in frontend (only PK needed)
- Don't build custom checkout (SDK handles it)

## Use Cases

- Pop-up shops
- Merch drops
- Artist sales
- Event merchandise
- Small business storefronts

Minimal infrastructure. Just products + checkout.
