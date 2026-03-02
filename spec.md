# Aldior

## Current State
Single-page React app with pages: Home, Shop, Cart, About, Contact. The PageType union and navigation system are already in place. Footer has 4 columns, Instagram link uses wrong URL, location says "Mumbai, Maharashtra", About has "Est. 2022 — Mumbai" and 10K+ customers stat. Trending Now section shows 4 products on desktop. Info column in footer has non-clickable policy items. There are no dedicated info pages. Product modal uses `<dialog>` element with single static image. Tagline is "HANDCRAFTED IN MUMBAI · EVERY STITCH INTENTIONAL" in Made in India strip. Products array has accessories and other non-ALDIOR categories.

## Requested Changes (Diff)

### Add
- New PageType values: "shipping", "returns", "size-guide", "privacy", "terms"
- Five new info pages: Shipping Policy, Returns & Exchange, Size Guide, Privacy Policy, Terms of Service — each a full page with well-written content appropriate to a new Indian D2C apparel brand
- Product detail page (PageProduct) accessible by clicking any product card — with auto-sliding image carousel (simulated with multiple gradient fallback images), S/M/L/XL size selector, price + discounted price display, quantity selector, add to cart
- Footer Info column items become clickable buttons navigating to respective info pages
- Header nav updated to include these info pages accessible from footer only (not header nav)

### Modify
- Trending Now section: reduce desktop visible count from 4 to 3, show only 5-6 items total in the dots indicator (slice PRODUCTS to 6 for trending display)
- "HANDCRAFTED IN MUMBAI · EVERY STITCH INTENTIONAL" strip text → "HANDCRAFTED IN INDIA · EVERY STITCH INTENTIONAL"
- Footer location: change "Mumbai, Maharashtra" to "India" only
- Footer Instagram link: update href to `https://www.instagram.com/aldior.in?igsh=end3nxd4agtiexfz` and display handle as `@aldior.in`
- Footer brand column Instagram link: same URL and handle update
- Contact page Instagram link: same URL and handle update
- About page: remove "Est. 2022 — Mumbai" text, change 10K+ customers stat to 100+, update "Our Story" text to something bold and aspirational for a just-launched brand
- Product categories: keep only "oversized", "essentials", "streetwear" (T-shirts, oversized tees, lowers) — remove "accessories". Update PRODUCTS array to only include T-shirts, oversized tees, and lowers (rename products appropriately)
- Shop filter tabs: remove "Accessories" tab
- Product modal → replace with full PageProduct page. Clicking any product card navigates to product detail page. Product detail page has: auto-sliding image carousel (3 slides, all using ProductImage with gradient fallback), tag, product name, original price crossed out + discounted price, size selector (S M L XL), quantity selector, add to cart button, back navigation
- About section "Made in India" description: remove reference to "Mumbai's streets" and replace with "India's streets"

### Remove
- "Accessories" as a product category and filter tab
- "Est. 2022 — Mumbai" from About page
- Mumbai references from About Made in India section
- Non-clickable Info column links in footer (replace with navigable links)

## Implementation Plan
1. Extend PageType with info page types and "product" with selected product ID
2. Add info page components (Shipping, Returns, SizeGuide, Privacy, Terms) with well-written content
3. Add PageProduct component with image carousel (auto-slide, prev/next), discounted price display, size/qty/cart
4. Update PRODUCTS array: only tees, oversized, lowers; add discountPrice field
5. Update Trending Now: TRENDING_PRODUCTS = PRODUCTS.slice(0,6), desktop shows 3 at a time
6. Update Made in India strip: remove "Mumbai"
7. Footer: update location to India, update Instagram URL/handle everywhere
8. About: remove Est 2022 Mumbai, change 100+, new brand story, remove Mumbai from Made in India section
9. Footer Info column: make each item a navigate button
10. Wire all navigation in App component
