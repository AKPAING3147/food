# 🎨 FoodieGo Logo Assets

## Logo Files

Your FoodieGo application now has professional logo assets located in the `public/images/` directory:

### Available Logo Files:

1. **`logo.png`** - Full logo with text
   - Use for: Marketing materials, headers, splash screens
   - Dimensions: Square format with FoodieGo text
   - Colors: Orange gradient (#f97316 to #ea580c)

2. **`icon.png`** - Icon only (no text)
   - Use for: Navbar, footer, favicon, app icons
   - Dimensions: Square format, optimized for small sizes
   - Colors: Orange gradient (#f97316 to #ea580c)
   - Currently used in: Navbar and Footer

## Logo Design

The FoodieGo logo features:
- **Symbol**: A stylized burger with an arrow representing fast delivery
- **Colors**: Vibrant orange to red gradient
- **Style**: Modern, flat design with smooth curves
- **Format**: PNG with transparent background

## Where the Logo is Used

### ✅ Currently Implemented:

1. **Navbar** (`components/navbar.tsx`)
   - Icon logo in top-left corner
   - Displays on all pages
   - Responsive (shows on mobile and desktop)

2. **Footer** (`components/footer.tsx`)
   - Icon logo in brand section
   - Displays at bottom of all pages

### 🎯 Recommended Additional Uses:

1. **Favicon** - Replace `app/favicon.ico` with the icon
2. **Login/Register Pages** - Add logo at the top
3. **Admin Dashboard** - Use in sidebar or header
4. **Email Templates** - Include in notification emails
5. **PWA Manifest** - Use for app icons
6. **Social Media** - Use for Open Graph images

## Logo Usage Guidelines

### ✅ DO:
- Use the logo on white or light backgrounds
- Maintain the original aspect ratio
- Keep adequate spacing around the logo
- Use the gradient colors consistently

### ❌ DON'T:
- Stretch or distort the logo
- Change the colors
- Add effects or filters
- Use on busy backgrounds without proper contrast

## Color Palette

The logo uses the FoodieGo brand colors:

```css
Primary Orange: #f97316
Secondary Orange: #ea580c
Gradient: linear-gradient(to right, #f97316, #ea580c)
```

## File Locations

```
public/
└── images/
    ├── logo.png      (Full logo with text)
    └── icon.png      (Icon only)
```

## Next Steps

To further enhance your branding:

1. **Create a Favicon**:
   - Convert `icon.png` to `.ico` format
   - Replace `app/favicon.ico`

2. **Add to Login/Register Pages**:
   ```tsx
   <img src="/images/logo.png" alt="FoodieGo" className="h-16 mx-auto mb-6" />
   ```

3. **Create PWA Manifest**:
   - Add various icon sizes (192x192, 512x512)
   - Include in `public/manifest.json`

4. **Social Media Meta Tags**:
   ```tsx
   <meta property="og:image" content="/images/logo.png" />
   ```

---

**Your FoodieGo brand is now complete with professional logo assets! 🎉**
