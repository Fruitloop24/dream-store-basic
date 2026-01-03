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
  // LOGO (optional)
  // ============================================
  // Place your logo in public/ folder and set the path here
  // Example: '/logo.png'
  logo: null as string | null,

  // ============================================
  // THEME & COLORS
  // ============================================
  // Theme: 'light' (clean, minimal) or 'dark' (modern, bold)
  theme: 'dark' as 'light' | 'dark',

  // Accent color for buttons, highlights
  // Options: zinc, emerald, sky, violet, rose, amber
  accentColor: 'zinc',

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
// ACCENT COLOR UTILITIES
// ============================================
const ACCENT_COLORS = {
  zinc: {
    bg: 'bg-zinc-100',
    bgHover: 'hover:bg-white',
    text: 'text-zinc-100',
    textHover: 'hover:text-white',
    border: 'border-zinc-100',
    buttonText: 'text-zinc-900',
  },
  emerald: {
    bg: 'bg-emerald-500',
    bgHover: 'hover:bg-emerald-400',
    text: 'text-emerald-500',
    textHover: 'hover:text-emerald-400',
    border: 'border-emerald-500',
    buttonText: 'text-white',
  },
  sky: {
    bg: 'bg-sky-500',
    bgHover: 'hover:bg-sky-400',
    text: 'text-sky-500',
    textHover: 'hover:text-sky-400',
    border: 'border-sky-500',
    buttonText: 'text-white',
  },
  violet: {
    bg: 'bg-violet-500',
    bgHover: 'hover:bg-violet-400',
    text: 'text-violet-500',
    textHover: 'hover:text-violet-400',
    border: 'border-violet-500',
    buttonText: 'text-white',
  },
  rose: {
    bg: 'bg-rose-500',
    bgHover: 'hover:bg-rose-400',
    text: 'text-rose-500',
    textHover: 'hover:text-rose-400',
    border: 'border-rose-500',
    buttonText: 'text-white',
  },
  amber: {
    bg: 'bg-amber-500',
    bgHover: 'hover:bg-amber-400',
    text: 'text-amber-500',
    textHover: 'hover:text-amber-400',
    border: 'border-amber-500',
    buttonText: 'text-white',
  },
}

export function getAccentClasses() {
  return ACCENT_COLORS[CONFIG.accentColor as keyof typeof ACCENT_COLORS] || ACCENT_COLORS.zinc
}

// ============================================
// THEME UTILITIES
// ============================================
const THEMES = {
  light: {
    // Backgrounds
    pageBg: 'bg-slate-50',
    headerBg: 'bg-white border-b border-slate-200',
    cardBg: 'bg-white border border-slate-200',
    cardHover: 'hover:border-slate-300 hover:shadow-md',
    modalBg: 'bg-white',
    modalOverlay: 'bg-black/50',
    drawerBg: 'bg-white border-l border-slate-200',
    footerBg: 'bg-slate-100 border-t border-slate-200',
    // Text
    heading: 'text-slate-900',
    body: 'text-slate-600',
    muted: 'text-slate-400',
    price: 'text-slate-900',
    // Interactive
    buttonSecondary: 'border border-slate-300 text-slate-600 hover:text-slate-900 hover:border-slate-400',
    buttonDisabled: 'bg-slate-200 text-slate-400',
    link: 'text-slate-600 hover:text-slate-900',
    // Inputs
    inputBg: 'bg-white border border-slate-300',
    inputFocus: 'focus:border-slate-400 focus:ring-slate-400',
    inputPlaceholder: 'placeholder-slate-400',
    // Dividers
    divider: 'border-slate-200',
    // Cart
    cartItemBg: 'bg-slate-100 border border-slate-200',
    quantityButton: 'bg-slate-200 hover:bg-slate-300 text-slate-700',
    // Product
    imagePlaceholder: 'bg-slate-100 text-slate-400',
    soldOutOverlay: 'bg-white/80',
    soldOutText: 'text-slate-500',
    stockText: 'text-slate-500',
    featureDot: 'bg-slate-400',
  },
  dark: {
    // Backgrounds
    pageBg: 'bg-zinc-950',
    headerBg: 'bg-zinc-950 border-b border-zinc-800',
    cardBg: 'bg-zinc-900/50 border border-zinc-800',
    cardHover: 'hover:border-zinc-700',
    modalBg: 'bg-zinc-900 border border-zinc-800',
    modalOverlay: 'bg-black/80',
    drawerBg: 'bg-zinc-900 border-l border-zinc-800',
    footerBg: 'bg-zinc-950 border-t border-zinc-800',
    // Text
    heading: 'text-zinc-100',
    body: 'text-zinc-400',
    muted: 'text-zinc-500',
    price: 'text-zinc-200',
    // Interactive
    buttonSecondary: 'border border-zinc-700 text-zinc-400 hover:text-zinc-200 hover:border-zinc-600',
    buttonDisabled: 'bg-zinc-800 text-zinc-500',
    link: 'text-zinc-400 hover:text-zinc-200',
    // Inputs
    inputBg: 'bg-zinc-900 border border-zinc-700',
    inputFocus: 'focus:border-zinc-600 focus:ring-zinc-600',
    inputPlaceholder: 'placeholder-zinc-600',
    // Dividers
    divider: 'border-zinc-800',
    // Cart
    cartItemBg: 'bg-zinc-800/50 border border-zinc-800',
    quantityButton: 'bg-zinc-700 hover:bg-zinc-600 text-zinc-300',
    // Product
    imagePlaceholder: 'bg-zinc-900 text-zinc-700',
    soldOutOverlay: 'bg-black/70',
    soldOutText: 'text-zinc-400',
    stockText: 'text-zinc-600',
    featureDot: 'bg-zinc-600',
  },
}

export function getThemeClasses() {
  return THEMES[CONFIG.theme] || THEMES.dark
}
