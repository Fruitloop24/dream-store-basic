# Store Setup

Configure this store template through a guided conversation.

## Instructions

Ask these questions ONE AT A TIME and wait for each answer before proceeding:

### 1. Store Name
"What's the name of your store?"

### 2. Tagline
"What's your tagline? (A short phrase that captures what you sell)"

### 3. Description
"How would you describe your store in one sentence?"

### 4. Style
"What style fits your brand?"
- **Minimal** - Clean, lots of whitespace, understated
- **Bold** - Strong colors, high contrast, impactful
- **Warm** - Soft tones, inviting, approachable
- **Dark** - Dark backgrounds, sleek, modern

### 5. Primary Color
Based on their style choice, suggest appropriate colors:

**Minimal:** Neutral grays, black/white
- Primary: `#18181b` (zinc-900), Accent: `#3f3f46` (zinc-700)

**Bold:** Vibrant, saturated colors
- Primary: `#dc2626` (red-600), Accent: `#ea580c` (orange-600)
- Primary: `#2563eb` (blue-600), Accent: `#7c3aed` (violet-600)

**Warm:** Earth tones, soft colors
- Primary: `#a16207` (amber-700), Accent: `#ca8a04` (yellow-600)
- Primary: `#b45309` (amber-600), Accent: `#d97706` (amber-500)

**Dark:** Subtle highlights on dark base
- Primary: `#18181b` (zinc-900), Accent: `#52525b` (zinc-600)
- Primary: `#0f172a` (slate-900), Accent: `#334155` (slate-700)

Ask: "I suggest [color scheme]. Want to use this, or provide your own hex colors?"

### 6. Logo
"Do you have a logo file to add? (If yes, they should place it in src/assets/)"

If no logo, the store name will be displayed as text.

### 7. Contact Email
"What email should customers use to contact you?"

---

## After Gathering Info

Update these files:

### src/App.tsx
Update the BRANDING object:
```typescript
const BRANDING = {
  storeName: '[their store name]',
  tagline: '[their tagline]',
  description: '[their description]',
  primaryColor: '[chosen primary]',
  accentColor: '[chosen accent]',
}
```

### src/components/Layout.tsx
Update the BRANDING object:
```typescript
const BRANDING = {
  storeName: '[their store name]',
}
```

If they have a logo, update the header in Layout.tsx:
```tsx
<Link to="/" className="flex items-center gap-2">
  <img src="/assets/logo.png" alt="Logo" className="h-8" />
  <span className="text-xl font-medium text-zinc-100">{storeName}</span>
</Link>
```

### src/pages/Contact.tsx
Update the email address:
```tsx
<a href="mailto:[their email]">[their email]</a>
```

### src/pages/About.tsx
Optionally customize the about content based on their description.

---

## Final Steps

After making changes, tell them:

1. "Your store is configured! Here's what I set up:"
   - Store name: [name]
   - Style: [style]
   - Colors: [primary] / [accent]

2. "To run your store locally:"
   ```bash
   npm install
   npm run dev
   ```

3. "Make sure your .env.local has your publishable key:"
   ```
   VITE_DREAM_PUBLISHABLE_KEY=pk_test_xxx
   ```

4. "Products are managed in your dream-api dashboard. Any products you create there will appear in your store."

5. "To deploy, run `npm run build` and upload the `dist/` folder to any static host (Cloudflare Pages, Vercel, Netlify)."
