# Techfospect Website

Vanilla HTML, CSS, and JavaScript — no build step required.

## File Structure

```
techfospect-website/
├── index.html                   ← Home page
├── about.html                   ← About page
├── services.html                ← Services page
├── products.html                ← Products list page
├── contact.html                 ← Contact page
├── products/
│   └── triim-ai-hub.html        ← Triim AI Hub product page
├── css/
│   └── styles.css               ← All styles (brand tokens, layout, components)
├── js/
│   └── main.js                  ← Shared JS (nav, forms, scroll-reveal)
├── images/                      ← Run download-images.sh to populate
└── download-images.sh           ← Script to download images locally
```

## Getting Started

1. Open `index.html` directly in a browser — or use a local dev server for best results:
   ```bash
   npx serve .
   # or
   python3 -m http.server 8080
   ```

2. To download images locally (optional, currently using Unsplash CDN):
   ```bash
   bash download-images.sh
   ```
   Then update the `src` attributes as shown in the script output.

## Images

Images are from **Unsplash** and are used under the [Unsplash License](https://unsplash.com/license), which allows free use for commercial and non-commercial purposes. They are currently loaded via CDN URLs. Run `download-images.sh` to cache them locally.

## Browser Support

Modern browsers (Chrome, Firefox, Safari, Edge). Uses CSS custom properties, Grid, Flexbox, and IntersectionObserver.
