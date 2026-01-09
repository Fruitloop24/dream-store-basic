<p align="center">
  <img src="https://raw.githubusercontent.com/Fruitloop24/dream-store-basic/main/public/dream-logo.svg" alt="Dream API" width="120" />
</p>

<h1 align="center">Dream Store Template</h1>

<p align="center">
  <strong>Your store. Your products. Zero checkout headaches.</strong>
</p>

<p align="center">
  <a href="#quick-start">Quick Start</a> •
  <a href="#the-ai-way">AI Setup</a> •
  <a href="#why-dream-api">Why Dream API</a> •
  <a href="#make-it-yours">Make It Yours</a>
</p>

---

## Why Dream API?

You want to sell stuff online. You don't want to become a Stripe expert or figure out cart state management. You definitely don't want to debug webhooks at 3am.

**Dream API handles all of it.** Products in dashboard. Payments just work.

```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│   You do ────────────►  Add products to dashboard       │
│                         Upload images                   │
│                         Set prices                      │
│                                                         │
│   We handle ─────────►  Cart · Checkout · Payments      │
│                         Inventory · Webhooks            │
│                         Customer emails                 │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

**This template is the storefront. Your dashboard is the back office.**

---

## Quick Start

```bash
git clone https://github.com/Fruitloop24/dream-store-basic.git my-store
cd my-store
npm install
cp .env.example .env.local
```

Add your publishable key to `.env.local`:
```
VITE_DREAM_PUBLISHABLE_KEY=pk_test_xxx
```

```bash
npm run dev
```

**Open http://localhost:5173** - Your store is live. Products load from your dashboard. Add to cart. Checkout. It all works.

---

## The AI Way

This is where it gets fun. Open the project in **Claude Code**, **Cursor**, or **Windsurf** and run:

```
/setup
```

The AI becomes your designer:
- 🏪 **Branding** - Tell it your store name, it sets up the vibe
- 🎨 **Theme** - Dark mode for sneakers? Light for handmade goods? Done
- 📝 **Pages** - About page, contact info, all customized
- ✨ **Polish** - Colors, spacing, the little things that matter

**"I sell vintage vinyl records"** → Done. Styled. Ready to launch.

---

## Make It Yours

### The Config File

Everything lives in `src/config.ts`:

```typescript
export const config = {
  storeName: 'Vinyl Vault',
  tagline: 'Rare finds for serious collectors',
  theme: 'dark',
  accentColor: 'amber',  // emerald, sky, violet, rose, amber, zinc

  about: {
    headline: 'Curated vinyl since 2019',
    story: 'We dig through crates so you don\'t have to...',
  },

  contact: {
    email: 'hello@vinylvault.com',
  },
}
```

### Products Live in Your Dashboard

No code needed. Just:
1. Go to [Dream API dashboard](https://dreamapi.dev)
2. Add products (name, price, images, description)
3. Your store updates instantly

**Update inventory at 2am → Store shows "Sold Out" automatically.**

---

## Make It Installable

Want customers to install your store like an app? Run:

```
/pwa
```

Game changer:
- 📱 **Home screen icon** - Your store, one tap away
- ⚡ **Instant loads** - Cached assets, fast browsing
- 📲 **QR codes** - Print on packaging, business cards, flyers

Imagine: Customer gets their order, scans the QR code on the box, installs your store. Repeat business made easy.

---

## Guest Checkout

No accounts. No passwords. No friction.

Customer adds to cart → Clicks checkout → Stripe handles payment → Done.

Stripe collects their email and shipping. You get paid. They get their stuff.

---

## The Stack

```
React + Vite          Fast dev, fast builds
Tailwind CSS          Style anything
Dream API SDK         Products, cart, checkout - done
Stripe (under hood)   Battle-tested payments
```

You don't configure Stripe. You don't build a cart. You just sell.

---

## Deploy in 60 Seconds

```bash
npm run build
```

**Cloudflare Pages** (recommended):
```bash
npx wrangler pages deploy dist
```

**Vercel/Netlify**: Connect repo, add `VITE_DREAM_PUBLISHABLE_KEY` env var. Done.

---

## Self-Host the Backend

Want to run your own Dream API instance?

Check out **[plug-saas](https://github.com/Fruitloop24/plug-saas)** - the open source backend. Deploy your own payments infrastructure on Cloudflare Workers.

---

## We Want to Hear From You

This is how we think e-commerce should work:
- **Products in dashboard** - Not in code
- **AI-assisted branding** - Describe your vibe, we'll style it
- **Zero payment config** - Stripe just works

**What's missing? What would make you actually use this?**

Open an issue. Tweet at us. We're building this for you.

---

<p align="center">
  <strong>MIT License</strong> - Do whatever you want. Build something cool.
</p>

<p align="center">
  <sub>Built with ☕ by developers who just wanted to sell stuff without the headache.</sub>
</p>
