# /pwa - Add Progressive Web App Support

You are helping add PWA support to this React + Vite store template. This will make the store installable on phones and tablets.

Read the CLAUDE.md file first for full context.

---

## Step 1: Install vite-plugin-pwa

Run:
```bash
npm install -D vite-plugin-pwa
```

---

## Step 2: Update vite.config.ts

Add the PWA plugin to the Vite config:

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'mask-icon.svg'],
      manifest: {
        name: 'STORE_NAME_HERE',
        short_name: 'STORE_SHORT',
        description: 'STORE_DESCRIPTION',
        theme_color: '#18181b',
        background_color: '#09090b',
        display: 'standalone',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable'
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/.*\.(?:png|jpg|jpeg|webp|svg)$/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'image-cache',
              expiration: { maxEntries: 100, maxAgeSeconds: 60 * 60 * 24 * 30 }
            }
          }
        ]
      }
    })
  ],
})
```

Ask: **"What's your store name?"** - Use it for `name` and `short_name` (short_name max 12 chars)

Ask: **"What color is your brand?"** - Update `theme_color` based on their accent color:
- zinc: `#18181b`
- emerald: `#10b981`
- sky: `#0ea5e9`
- violet: `#8b5cf6`
- rose: `#f43f5e`
- amber: `#f59e0b`

---

## Step 3: Create Store Icons

Tell them:

"You need two icon files in the `public/` folder:
- `pwa-192x192.png` (192x192 pixels)
- `pwa-512x512.png` (512x512 pixels)

**Quick options:**
1. Use your logo - resize to both sizes
2. Generate from text - use a tool like [favicon.io](https://favicon.io/favicon-generator/)
3. Use a simple store icon or your initials"

If they don't have icons, offer to help them think of what to use.

---

## Step 4: Test PWA

Run:
```bash
npm run build && npm run preview
```

Tell them:

"Open the preview URL in Chrome. You should see:
1. Install icon in the address bar (or menu → 'Install app')
2. Your store as a standalone app when installed

**On mobile:**
- iOS Safari: Share → Add to Home Screen
- Android Chrome: Menu → Install app

Your store icon will appear on their home screen!"

---

## Step 5: Deploy

Tell them:

"Your PWA is ready! Deploy it now:

```bash
npm run build
```

**Deploy options:**
- **Cloudflare Pages**: `npx wrangler pages deploy dist`
- **Vercel/Netlify**: Connect repo, set `VITE_DREAM_PUBLISHABLE_KEY` env var

Make sure you're on HTTPS (required for PWA to work)."

Ask: **"What's your deployed URL? (e.g., https://mystore.pages.dev)"**

---

## Step 6: Generate QR Code

Once they provide the URL, generate a QR code using Python:

```bash
# Create a virtual environment and install qrcode
python3 -m venv qr-venv
source qr-venv/bin/activate  # On Windows: qr-venv\Scripts\activate
pip install qrcode[pil]
```

Then generate the QR code:

```bash
python3 -c "
import qrcode
qr = qrcode.QRCode(version=1, box_size=10, border=2)
qr.add_data('THEIR_DEPLOYED_URL_HERE')
qr.make(fit=True)
img = qr.make_image(fill_color='black', back_color='white')
img.save('public/qr-code.png')
print('QR code saved to public/qr-code.png')
"
```

**Replace `THEIR_DEPLOYED_URL_HERE` with their actual URL.**

After generating, clean up:
```bash
deactivate
rm -rf qr-venv
```

---

## Step 7: Embed QR Code in Store

Ask: **"Want me to add the QR code to your store footer?"**

If yes, add this section to the footer:

```tsx
{/* Install App Section */}
<div className="border-t border-zinc-800 mt-8 pt-8 text-center">
  <h3 className="text-sm font-medium mb-2">Shop from Your Phone</h3>
  <p className="text-zinc-500 text-xs mb-4">Scan to install - no app store needed</p>
  <img
    src="/qr-code.png"
    alt="Scan to install"
    className="mx-auto w-32 h-32 rounded-lg"
  />
</div>
```

Tell them: "After adding the QR section, redeploy to see it live:
```bash
npm run build && npx wrangler pages deploy dist
```"

---

## Done!

Tell them:

"Your store is now installable as a PWA with a QR code! Customers can:

- **Scan the QR** - Opens your store instantly
- **Install from browser** - No app store needed
- **Launch from home screen** - Your store, one tap away
- **Browse offline** - Cached products load instantly

**Print your QR code everywhere:**
- **Product inserts** - 'Shop more at [store]' card in packages
- **Packaging** - QR code on boxes, bags, labels
- **Pop-up shops** - Table display with 'Scan to Shop'
- **Business cards** - Front: brand, Back: QR code
- **Receipts** - 'Install our app' at bottom

Customers scan → Install → Shop. Zero friction, zero app store fees!"

---

## Troubleshooting

**"Install button not showing"**
- Must be on HTTPS (localhost works for testing)
- Check that manifest.json is being generated (look in dist/ after build)

**"Icons not showing"**
- Make sure pwa-192x192.png and pwa-512x512.png are in public/ folder
- Check console for 404 errors

**"Service worker not updating"**
- Hard refresh (Cmd+Shift+R / Ctrl+Shift+R)
- Clear site data in DevTools → Application → Storage

**"QR code generation failed"**
- Make sure Python 3 is installed: `python3 --version`
- Try `pip3` instead of `pip` if needed
- On some systems: `python -m venv` instead of `python3 -m venv`
