/**
 * STORE CONFIGURATION
 *
 * Edit this file to customize your store's branding.
 * Products, prices, and inventory are managed in your Dream API dashboard.
 */

export const CONFIG = {
  // ============================================
  // BASIC INFO
  // ============================================
  storeName: 'Your Store',
  tagline: 'Quality products, simple shopping',
  description: 'Curated items for people who appreciate good things.',

  // ============================================
  // COLORS
  // ============================================
  // Options: zinc, slate, stone, neutral, red, orange, amber, emerald, teal, sky, blue, violet, purple, pink, rose
  accentColor: 'zinc',

  // ============================================
  // LOGO (optional)
  // ============================================
  // Place your logo in public/ folder and set the path here
  // Example: '/logo.png'
  logo: null as string | null,

  // ============================================
  // FOOTER
  // ============================================
  footer: {
    tagline: 'Quality products, simple shopping. We believe in making great things accessible.',
    links: {
      support: [
        { label: 'FAQ', href: '#' },
        { label: 'Shipping', href: '#' },
        { label: 'Returns', href: '#' },
      ],
    },
  },

  // ============================================
  // ABOUT PAGE
  // ============================================
  about: {
    headline: 'About Us',
    content: `We started this store with a simple idea: great products shouldn't be complicated.

Every item we sell is carefully selected for quality and value. We work directly with makers and suppliers who share our commitment to craftsmanship.

Our goal is to make shopping simple. No gimmicks, no upsells - just good products at fair prices.`,
  },

  // ============================================
  // CONTACT PAGE
  // ============================================
  contact: {
    headline: 'Get in Touch',
    email: 'hello@yourstore.com',
    response: "We'll get back to you within 24 hours.",
  },
}

// ============================================
// COLOR UTILITIES (don't modify)
// ============================================
const colorMap: Record<string, { bg: string; text: string; border: string }> = {
  zinc: { bg: 'bg-zinc-100', text: 'text-zinc-100', border: 'border-zinc-700' },
  slate: { bg: 'bg-slate-100', text: 'text-slate-100', border: 'border-slate-700' },
  stone: { bg: 'bg-stone-100', text: 'text-stone-100', border: 'border-stone-700' },
  red: { bg: 'bg-red-500', text: 'text-red-500', border: 'border-red-500' },
  orange: { bg: 'bg-orange-500', text: 'text-orange-500', border: 'border-orange-500' },
  amber: { bg: 'bg-amber-500', text: 'text-amber-500', border: 'border-amber-500' },
  emerald: { bg: 'bg-emerald-500', text: 'text-emerald-500', border: 'border-emerald-500' },
  teal: { bg: 'bg-teal-500', text: 'text-teal-500', border: 'border-teal-500' },
  sky: { bg: 'bg-sky-500', text: 'text-sky-500', border: 'border-sky-500' },
  blue: { bg: 'bg-blue-500', text: 'text-blue-500', border: 'border-blue-500' },
  violet: { bg: 'bg-violet-500', text: 'text-violet-500', border: 'border-violet-500' },
  purple: { bg: 'bg-purple-500', text: 'text-purple-500', border: 'border-purple-500' },
  pink: { bg: 'bg-pink-500', text: 'text-pink-500', border: 'border-pink-500' },
  rose: { bg: 'bg-rose-500', text: 'text-rose-500', border: 'border-rose-500' },
}

export function getAccentClasses() {
  return colorMap[CONFIG.accentColor] || colorMap.zinc
}
