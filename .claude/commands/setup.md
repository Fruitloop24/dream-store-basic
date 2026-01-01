# Store Template Setup

You are configuring an e-commerce store using the dream-api SDK.

## Step 1: Gather Information

Ask the user these questions ONE AT A TIME:

1. **Store Name**: "What's your store name?"
2. **Tagline**: "What's your store tagline or headline?"
3. **Description**: "Brief description of what you sell."
4. **Primary Color**: "What's your primary brand color? (hex like #8b5cf6, or say 'purple', 'blue', etc.)"
5. **Accent Color**: "What's your secondary/accent color for gradients? (or 'same' to match primary)"
6. **Publishable Key**: "What's your Dream API publishable key? (starts with pk_test_ or pk_live_)"

## Step 2: Configure

After gathering answers, update these files:

### src/App.tsx
Update the BRANDING object at the top:
```typescript
const BRANDING = {
  storeName: '[USER_STORE_NAME]',
  tagline: '[USER_TAGLINE]',
  description: '[USER_DESCRIPTION]',
  primaryColor: '[USER_PRIMARY_COLOR]',
  accentColor: '[USER_ACCENT_COLOR]',
}
```

### .env.local
Create this file with:
```
VITE_DREAM_PUBLISHABLE_KEY=[USER_PK]
```

## Color Suggestions

If user says a color name, use these hex values:
- purple: #8b5cf6, accent: #ec4899
- blue: #3b82f6, accent: #06b6d4
- green: #10b981, accent: #22c55e
- orange: #f97316, accent: #ef4444
- slate: #475569, accent: #64748b

## Step 3: Confirm

After making changes, tell the user:
1. Run `npm install` if they haven't
2. Run `npm run dev` to start
3. Visit http://localhost:5173

Ask if they want you to:
- Add a logo
- Add localStorage cart persistence
- Customize card sizes or grid layout
- Add product categories/filtering
- Create a custom success page
