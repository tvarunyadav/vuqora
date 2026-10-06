# VUQORA Brand Reference & Specification

**Brand Name:** VUQORA  
**Tagline:** From menu to meal.  
**Concept:** "The Transitioning V"  

---

## ⚠️ Important Note on Brand Assets & Placeholders

> **STRICT RULE:** The official VUQORA logo is "The Transitioning V" from the official brand reference. Do NOT attempt to invent, trace, approximate, or fabricate vector paths for the official logo.
>
> All PWA icons and favicons currently in `frontend/public/` are **neutral, generic temporary placeholders** (gray bounding box icon). They do NOT represent the official logo. Official SVG vector exports and PNG launcher icons must be placed here when available from the design pipeline.

---

## 🎨 Color Palette

| Token | Hex | Usage |
| :--- | :--- | :--- |
| **Dark Background** | `#121316` | Main application background |
| **Surface Dark** | `#1C1D21` | Card containers, navigation bars, elevated surfaces |
| **Border Dark** | `#2A2C33` | Subtle structural dividers and item borders |
| **Coral Orange (Accent)** | `#F05A28` | Primary brand accent, glowing highlights, active states |
| **Text Primary** | `#F3F4F6` | Main headings and high-contrast text |
| **Text Secondary** | `#9CA3AF` | Tagline, subheadings, and secondary metadata |

---

## 📐 Brand Identity Elements

- **Symbol ("The Transitioning V"):** A bold, geometric icon incorporating horizontal velocity stripes transitioning into a stylized "V" with a circular top node, representing seamless transition from menu discovery to meal recommendation.
- **Logotype:** Uppercase geometric sans-serif typography (`VUQORA`).
- **Tagline:** Sentence-case clean sans-serif (`From menu to meal.`).

---

## 📦 Required Final Production Assets

The following assets will be required for production deployment:

1. **Vector Logos:**
   - `vuqora-logo-primary.svg`: Full primary logo (Symbol + Logotype + Tagline).
   - `vuqora-logo-horizontal.svg`: Compact horizontal logo layout.
   - `vuqora-symbol.svg`: Standalone vector "Transitioning V" icon mark.
   - `vuqora-symbol-mono.svg`: Monochrome (white & black) vector variants.

2. **Raster / Transparent Exports:**
   - `vuqora-logo-dark.png`: High-resolution transparent PNG tuned for dark backgrounds.
   - `vuqora-logo-light.png`: High-resolution transparent PNG tuned for light backgrounds.

3. **PWA & Platform App Icons:**
   - `pwa-icon-192.png`: 192x192 PNG launcher icon.
   - `pwa-icon-512.png`: 512x512 PNG launcher icon.
   - `apple-touch-icon.png`: 180x180 PNG iOS home screen icon.
   - `favicon.ico` / `favicon.svg`: Multi-size browser favicon.
