import {
  ChevronLeft,
  ChevronRight,
  Instagram,
  Menu,
  Minus,
  Plus,
  Send,
  ShoppingBag,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

// ─── Types ───────────────────────────────────────────────────────
type PageType =
  | "home"
  | "shop"
  | "cart"
  | "about"
  | "contact"
  | "shipping"
  | "returns"
  | "size-guide"
  | "privacy"
  | "terms"
  | "product";

type FilterTab = "all" | "oversized" | "essentials" | "streetwear";

interface Product {
  id: number;
  name: string;
  price: number;
  discountPrice: number;
  category: FilterTab;
  image: string;
  tag?: string;
  sizes: string[];
}

interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  tag?: string;
  size: string;
  quantity: number;
}

// ─── Data ────────────────────────────────────────────────────────
const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Noir Oversized Tee",
    price: 2499,
    discountPrice: 1999,
    category: "oversized",
    image: "/assets/generated/product-oversized-hoodie.dim_600x750.jpg",
    tag: "Bestseller",
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: 2,
    name: "Void Relaxed Tee",
    price: 2299,
    discountPrice: 1799,
    category: "oversized",
    image: "/assets/generated/product-cargo-pants.dim_600x750.jpg",
    tag: "New",
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: 3,
    name: "Obsidian Essential Tee",
    price: 1899,
    discountPrice: 1499,
    category: "essentials",
    image: "/assets/generated/product-essential-tee.dim_600x750.jpg",
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: 4,
    name: "Shadow Drop-Shoulder Tee",
    price: 2199,
    discountPrice: 1749,
    category: "essentials",
    image: "/assets/generated/product-bomber-jacket.dim_600x750.jpg",
    tag: "New",
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: 5,
    name: "Phantom Wide-Leg Lowers",
    price: 3499,
    discountPrice: 2799,
    category: "streetwear",
    image: "/assets/generated/product-track-pants.dim_600x750.jpg",
    tag: "Trending",
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: 6,
    name: "Eclipse Cargo Lowers",
    price: 3999,
    discountPrice: 3199,
    category: "streetwear",
    image: "/assets/generated/product-wide-trousers.dim_600x750.jpg",
    tag: "New",
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: 7,
    name: "Fluid Relaxed Lowers",
    price: 3299,
    discountPrice: 2599,
    category: "streetwear",
    image: "/assets/generated/product-sneakers.dim_600x750.jpg",
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: 8,
    name: "Dusk Oversized Hoodie",
    price: 4499,
    discountPrice: 3599,
    category: "oversized",
    image: "/assets/generated/product-varsity-jacket.dim_600x750.jpg",
    tag: "Bestseller",
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: 9,
    name: "Onyx Track Lowers",
    price: 2999,
    discountPrice: 2399,
    category: "streetwear",
    image: "/assets/generated/product-leather-bag.dim_600x750.jpg",
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: 10,
    name: "Build Loud Oversized Tee",
    price: 2799,
    discountPrice: 2299,
    category: "oversized",
    image: "/assets/generated/product-chain-necklace.dim_600x750.jpg",
    tag: "Limited",
    sizes: ["S", "M", "L", "XL"],
  },
];

const TRENDING_PRODUCTS = PRODUCTS.slice(0, 6);

const COLLECTIONS = [
  {
    title: "VOID",
    subtitle: "Oversized Collection",
    desc: "Where volume meets precision. Silhouettes engineered for the city that never sleeps.",
  },
  {
    title: "OBSIDIAN",
    subtitle: "Essentials",
    desc: "The foundation of every wardrobe. Elevated basics with zero compromise on quality.",
  },
  {
    title: "PHANTOM",
    subtitle: "Streetwear",
    desc: "Raw energy refined. Street culture elevated to gallery-worthy craftsmanship.",
  },
];

const MARQUEE_ITEMS = [
  { id: "m1", text: "FREE SHIPPING ABOVE ₹2999" },
  { id: "m2", text: "MADE IN INDIA" },
  { id: "m3", text: "HANDCRAFTED QUALITY" },
  { id: "m4", text: "NEW ARRIVALS WEEKLY" },
  { id: "m5", text: "ALDIOR — BUILD LOUD. WORN LOOSE." },
  { id: "m6", text: "EXCLUSIVELY ONLINE" },
  { id: "m7", text: "PREMIUM QUALITY ASSURED" },
];

const ANNOUNCEMENT_ITEMS = [
  "FREE SHIPPING ABOVE ₹2999",
  "MADE IN INDIA",
  "HANDCRAFTED QUALITY",
  "NEW ARRIVALS WEEKLY",
  "ALDIOR — BUILD LOUD. WORN LOOSE.",
  "EXCLUSIVELY ONLINE",
];

const INSTAGRAM_URL =
  "https://www.instagram.com/aldior.in?igsh=end3nxd4agtiexfz";

// ─── Helpers ─────────────────────────────────────────────────────
function formatPrice(price: number): string {
  return `₹${price.toLocaleString("en-IN")}`;
}

// ─── Product Image (with elegant fallback) ───────────────────────
const PRODUCT_GRADIENTS = [
  "linear-gradient(160deg, oklch(0.12 0 0) 0%, oklch(0.07 0 0) 60%, oklch(0.1 0 0) 100%)",
  "linear-gradient(200deg, oklch(0.1 0 0) 0%, oklch(0.14 0 0) 50%, oklch(0.07 0 0) 100%)",
  "linear-gradient(140deg, oklch(0.08 0 0) 0%, oklch(0.12 0 0) 40%, oklch(0.06 0 0) 100%)",
  "linear-gradient(170deg, oklch(0.13 0 0) 0%, oklch(0.09 0 0) 60%, oklch(0.07 0 0) 100%)",
  "linear-gradient(150deg, oklch(0.06 0 0) 0%, oklch(0.11 0 0) 50%, oklch(0.08 0 0) 100%)",
];

function ProductImage({
  src,
  alt,
  index,
  className,
}: {
  src: string;
  alt: string;
  index: number;
  className?: string;
}) {
  const [errored, setErrored] = useState(false);
  const gradient = PRODUCT_GRADIENTS[index % PRODUCT_GRADIENTS.length];

  if (errored) {
    return (
      <div
        className={`${className} flex flex-col items-center justify-center relative overflow-hidden`}
        style={{ background: gradient }}
        aria-label={alt}
      >
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `repeating-linear-gradient(
              45deg,
              oklch(0.9 0 0) 0px,
              oklch(0.9 0 0) 1px,
              transparent 1px,
              transparent 20px
            )`,
          }}
        />
        <span className="font-display text-2xl tracking-[0.4em] opacity-20 relative z-10 text-white">
          ALDIOR
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading="lazy"
      onError={() => setErrored(true)}
    />
  );
}

// ─── Announcement Bar ─────────────────────────────────────────────
function AnnouncementBar() {
  const doubled = [
    ...ANNOUNCEMENT_ITEMS.map((t, i) => ({ text: t, id: `a-${i}` })),
    ...ANNOUNCEMENT_ITEMS.map((t, i) => ({ text: t, id: `b-${i}` })),
  ];

  return (
    <div
      className="fixed top-0 left-0 right-0 z-50 overflow-hidden announcement-bar"
      aria-hidden="true"
    >
      <div className="marquee-track h-full">
        {doubled.map((item) => (
          <span key={item.id} className="announcement-item">
            {item.text}
            <span className="announcement-dot" />
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── Header ──────────────────────────────────────────────────────
const ANNOUNCEMENT_HEIGHT = 32;
const HEADER_HEIGHT = 60;

function Header({
  cartCount,
  currentPage,
  onNavigate,
}: {
  cartCount: number;
  currentPage: PageType;
  onNavigate: (page: PageType) => void;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const navLinks: { label: string; page: PageType }[] = [
    { label: "Home", page: "home" },
    { label: "Shop", page: "shop" },
    { label: "About", page: "about" },
    { label: "Contact", page: "contact" },
  ];

  const activeNavPage = currentPage === "product" ? "shop" : currentPage;

  return (
    <header
      className={`fixed left-0 right-0 z-40 transition-all duration-500 header-base ${
        scrolled ? "header-scrolled py-3" : "header-default py-4"
      }`}
      style={{ top: `${ANNOUNCEMENT_HEIGHT}px` }}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <button
          type="button"
          onClick={() => {
            onNavigate("home");
            setMobileMenuOpen(false);
          }}
          className="font-display text-2xl tracking-[0.35em] font-bold text-white hover:opacity-80 transition-opacity"
        >
          ALDIOR
        </button>

        {/* Desktop Nav */}
        <nav
          className="hidden md:flex items-center gap-8"
          aria-label="Main navigation"
        >
          {navLinks.map((link) => (
            <button
              key={link.page}
              type="button"
              onClick={() => onNavigate(link.page)}
              className={`text-[10px] tracking-[0.2em] uppercase transition-colors duration-200 ${
                activeNavPage === link.page
                  ? "text-white"
                  : "text-[oklch(0.5_0_0)] hover:text-[oklch(0.8_0_0)]"
              }`}
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => onNavigate("cart")}
            aria-label={`Open cart, ${cartCount} items`}
            className="relative p-2 text-[oklch(0.6_0_0)] hover:text-white transition-colors"
          >
            <ShoppingBag size={20} />
            {cartCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-white text-[oklch(0.04_0_0)] text-[10px] font-bold flex items-center justify-center rounded-full">
                {cartCount > 9 ? "9+" : cartCount}
              </span>
            )}
          </button>
          <button
            type="button"
            className="md:hidden p-2 text-[oklch(0.6_0_0)] hover:text-white transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <nav
          className="md:hidden px-6 py-5 space-y-4 mobile-menu-bg"
          aria-label="Mobile navigation"
        >
          {navLinks.map((link) => (
            <button
              key={link.page}
              type="button"
              onClick={() => {
                onNavigate(link.page);
                setMobileMenuOpen(false);
              }}
              className={`block w-full text-left text-sm tracking-[0.2em] uppercase transition-colors py-1.5 ${
                activeNavPage === link.page
                  ? "text-white"
                  : "text-[oklch(0.5_0_0)] hover:text-[oklch(0.8_0_0)]"
              }`}
            >
              {link.label}
            </button>
          ))}
          <button
            type="button"
            onClick={() => {
              onNavigate("cart");
              setMobileMenuOpen(false);
            }}
            className="block w-full text-left text-sm tracking-[0.2em] uppercase text-[oklch(0.5_0_0)] hover:text-white transition-colors py-1.5"
          >
            Cart {cartCount > 0 && `(${cartCount})`}
          </button>
        </nav>
      )}
    </header>
  );
}

// ─── Marquee Banner ───────────────────────────────────────────────
function MarqueeBanner() {
  const doubled = [
    ...MARQUEE_ITEMS.map((m) => ({ ...m, id: `${m.id}-a` })),
    ...MARQUEE_ITEMS.map((m) => ({ ...m, id: `${m.id}-b` })),
  ];
  return (
    <div className="overflow-hidden py-3 marquee-banner" aria-hidden="true">
      <div className="marquee-track">
        {doubled.map((item) => (
          <span
            key={item.id}
            className="flex items-center gap-6 px-6 text-[9px] tracking-[0.35em] uppercase text-[oklch(0.55_0_0)] whitespace-nowrap"
          >
            {item.text}
            <span className="inline-block w-1 h-1 bg-[oklch(0.35_0_0)] rounded-full" />
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── PAGE: Product Detail (Full Page) ────────────────────────────
function PageProduct({
  product,
  onNavigate,
  onAddToCart,
}: {
  product: Product;
  onNavigate: (page: PageType) => void;
  onAddToCart: (product: Product, size: string, qty: number) => void;
}) {
  const topOffset = ANNOUNCEMENT_HEIGHT + HEADER_HEIGHT;
  const [slideIndex, setSlideIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const autoRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const SLIDE_COUNT = 3;

  // Auto-advance every 2.5 seconds
  useEffect(() => {
    autoRef.current = setInterval(() => {
      setSlideIndex((i) => (i + 1) % SLIDE_COUNT);
    }, 2500);
    return () => {
      if (autoRef.current) clearInterval(autoRef.current);
    };
  }, []);

  // Reset state when product changes
  // biome-ignore lint/correctness/useExhaustiveDependencies: reset on product change
  useEffect(() => {
    setSelectedSize("");
    setQty(1);
    setAdded(false);
    setSlideIndex(0);
  }, [product.id]);

  function handlePrev() {
    if (autoRef.current) clearInterval(autoRef.current);
    setSlideIndex((i) => (i - 1 + SLIDE_COUNT) % SLIDE_COUNT);
  }

  function handleNext() {
    if (autoRef.current) clearInterval(autoRef.current);
    setSlideIndex((i) => (i + 1) % SLIDE_COUNT);
  }

  function handleAdd() {
    if (!selectedSize) return;
    onAddToCart(product, selectedSize, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  const discountPct = Math.round(
    (1 - product.discountPrice / product.price) * 100,
  );

  const productDesc =
    product.category === "streetwear"
      ? "Premium quality fabric with a relaxed, easy fit. Designed for all-day comfort and effortless style. Made in India with every stitch intentional."
      : product.category === "oversized"
        ? "Signature oversized silhouette. Drop shoulders, relaxed chest, and a length built to layer. Premium fabric. Zero compromise. Made in India."
        : "Clean lines, refined construction. The essential piece your wardrobe has been waiting for. Premium quality, made in India with every stitch intentional.";

  return (
    <main className="page-enter" style={{ paddingTop: `${topOffset}px` }}>
      <section className="py-10 px-6 max-w-7xl mx-auto">
        {/* Back button */}
        <button
          type="button"
          onClick={() => onNavigate("shop")}
          className="flex items-center gap-2 text-[oklch(0.45_0_0)] hover:text-white transition-colors text-[10px] tracking-[0.2em] uppercase mb-10"
        >
          <ChevronLeft size={14} />
          Back to Shop
        </button>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-20">
          {/* LEFT: Image carousel */}
          <div className="relative">
            <div className="relative overflow-hidden aspect-[4/5] bg-[oklch(0.08_0_0)]">
              {(["slide-1", "slide-2", "slide-3"] as const).map((key, i) => (
                <div
                  key={key}
                  className="absolute inset-0 transition-opacity duration-700"
                  style={{ opacity: i === slideIndex ? 1 : 0 }}
                >
                  <ProductImage
                    src={product.image}
                    alt={`${product.name} — view ${i + 1}`}
                    index={product.id + i}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}

              {/* Prev / Next overlay buttons */}
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous image"
                className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 bg-black/60 border border-[oklch(0.25_0_0)] flex items-center justify-center text-white hover:bg-black/80 transition-all"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                type="button"
                onClick={handleNext}
                aria-label="Next image"
                className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 bg-black/60 border border-[oklch(0.25_0_0)] flex items-center justify-center text-white hover:bg-black/80 transition-all"
              >
                <ChevronRight size={16} />
              </button>

              {product.tag && (
                <span className="absolute top-4 left-4 z-10 text-[9px] tracking-[0.2em] uppercase bg-white text-black px-2.5 py-1 font-bold">
                  {product.tag}
                </span>
              )}
            </div>

            {/* Dot indicators */}
            <div className="flex items-center justify-center gap-2 mt-4">
              {(["dot-1", "dot-2", "dot-3"] as const).map((key, i) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => {
                    if (autoRef.current) clearInterval(autoRef.current);
                    setSlideIndex(i);
                  }}
                  aria-label={`View image ${i + 1}`}
                  className={`transition-all duration-300 ${
                    i === slideIndex
                      ? "w-6 h-1.5 bg-white"
                      : "w-1.5 h-1.5 bg-[oklch(0.3_0_0)] rounded-full hover:bg-[oklch(0.5_0_0)]"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* RIGHT: Product details */}
          <div className="flex flex-col gap-6">
            {/* Tag + Name */}
            <div>
              {product.tag && (
                <span className="inline-block text-[9px] tracking-[0.25em] uppercase bg-white text-black px-2.5 py-1 mb-3 font-bold">
                  {product.tag}
                </span>
              )}
              <h1 className="font-display text-3xl md:text-4xl font-black tracking-wide text-white leading-tight mb-1">
                {product.name}
              </h1>
              <p className="text-[oklch(0.4_0_0)] text-[9px] tracking-[0.25em] uppercase mb-4">
                {product.category === "streetwear"
                  ? "Lowers / Streetwear"
                  : product.category === "oversized"
                    ? "Oversized / T-Shirts"
                    : "Essentials / T-Shirts"}
              </p>
            </div>

            {/* Price */}
            <div className="flex items-center gap-3">
              <span className="text-2xl font-black text-white tabular-nums">
                {formatPrice(product.discountPrice)}
              </span>
              <span className="text-base text-[oklch(0.4_0_0)] line-through tabular-nums">
                {formatPrice(product.price)}
              </span>
              <span className="text-[9px] tracking-[0.2em] uppercase bg-white text-black px-2 py-1 font-bold">
                {discountPct}% OFF
              </span>
            </div>

            {/* Description */}
            <p className="text-[oklch(0.5_0_0)] text-sm leading-relaxed border-t border-[oklch(0.12_0_0)] pt-5">
              {productDesc}
            </p>

            {/* Size selector */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <p className="text-[10px] tracking-[0.25em] uppercase text-[oklch(0.45_0_0)]">
                  Size{" "}
                  {selectedSize && (
                    <span className="text-white ml-1">— {selectedSize}</span>
                  )}
                </p>
                <button
                  type="button"
                  onClick={() => onNavigate("size-guide")}
                  className="text-[9px] tracking-[0.15em] uppercase text-[oklch(0.4_0_0)] hover:text-white transition-colors underline underline-offset-2"
                >
                  Size Guide
                </button>
              </div>
              <div className="flex gap-2 flex-wrap">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setSelectedSize(size)}
                    className={`size-btn ${selectedSize === size ? "active" : ""}`}
                    aria-pressed={selectedSize === size}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <p className="text-[10px] tracking-[0.25em] uppercase text-[oklch(0.45_0_0)] mb-3">
                Quantity
              </p>
              <div className="flex items-center gap-0 border border-[oklch(0.22_0_0)] w-fit">
                <button
                  type="button"
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  disabled={qty <= 1}
                  aria-label="Decrease quantity"
                  className="w-10 h-10 flex items-center justify-center text-[oklch(0.5_0_0)] hover:text-white transition-colors disabled:opacity-30 border-r border-[oklch(0.22_0_0)]"
                >
                  <Minus size={12} />
                </button>
                <span className="w-12 text-center text-sm text-white tabular-nums">
                  {qty}
                </span>
                <button
                  type="button"
                  onClick={() => setQty((q) => q + 1)}
                  aria-label="Increase quantity"
                  className="w-10 h-10 flex items-center justify-center text-[oklch(0.5_0_0)] hover:text-white transition-colors border-l border-[oklch(0.22_0_0)]"
                >
                  <Plus size={12} />
                </button>
              </div>
            </div>

            {/* Add to cart */}
            <button
              type="button"
              onClick={handleAdd}
              disabled={!selectedSize || added}
              className={`w-full py-4 text-[11px] tracking-[0.25em] uppercase font-bold transition-all duration-200 ${
                added
                  ? "bg-[oklch(0.2_0_0)] text-white cursor-default"
                  : selectedSize
                    ? "bg-white text-black hover:bg-[oklch(0.88_0_0)] active:scale-[0.98]"
                    : "bg-[oklch(0.12_0_0)] text-[oklch(0.35_0_0)] cursor-not-allowed"
              }`}
            >
              {added
                ? "✓ Added to Cart"
                : selectedSize
                  ? "Add to Cart"
                  : "Select a Size First"}
            </button>

            {!selectedSize && (
              <p className="text-[oklch(0.35_0_0)] text-xs text-center -mt-3">
                Please select a size to continue
              </p>
            )}

            {/* Made in India badge */}
            <div className="flex items-center gap-3 pt-2 border-t border-[oklch(0.1_0_0)]">
              <span className="text-lg">🇮🇳</span>
              <span className="text-[oklch(0.4_0_0)] text-[9px] tracking-[0.25em] uppercase">
                Made in India · Every stitch intentional
              </span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

// ─── PAGE: Home ───────────────────────────────────────────────────
function PageHome({
  onNavigate,
  onSelectProduct,
}: {
  onNavigate: (page: PageType) => void;
  onSelectProduct: (id: number) => void;
}) {
  const topOffset = ANNOUNCEMENT_HEIGHT + HEADER_HEIGHT;
  const [trendingIndex, setTrendingIndex] = useState(0);
  const autoRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const VISIBLE = 3;
  const VISIBLE_MOBILE = 2;

  // Auto-advance every 3 seconds
  useEffect(() => {
    autoRef.current = setInterval(() => {
      setTrendingIndex((i) => (i + 1) % TRENDING_PRODUCTS.length);
    }, 3000);
    return () => {
      if (autoRef.current) clearInterval(autoRef.current);
    };
  }, []);

  function handlePrev() {
    if (autoRef.current) clearInterval(autoRef.current);
    setTrendingIndex(
      (i) => (i - 1 + TRENDING_PRODUCTS.length) % TRENDING_PRODUCTS.length,
    );
  }

  function handleNext() {
    if (autoRef.current) clearInterval(autoRef.current);
    setTrendingIndex((i) => (i + 1) % TRENDING_PRODUCTS.length);
  }

  // Get visible products (wrapping)
  function getVisible(count: number) {
    const result: Product[] = [];
    for (let i = 0; i < count; i++) {
      result.push(
        TRENDING_PRODUCTS[(trendingIndex + i) % TRENDING_PRODUCTS.length],
      );
    }
    return result;
  }

  const visibleDesktop = getVisible(VISIBLE);
  const visibleMobile = getVisible(VISIBLE_MOBILE);

  return (
    <main className="page-enter" style={{ paddingTop: `${topOffset}px` }}>
      {/* ── Hero ── */}
      <section
        className="relative flex items-center justify-center overflow-hidden bg-background"
        style={{ minHeight: `calc(100vh - ${topOffset}px)` }}
      >
        {/* Subtle grid lines */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(oklch(0.9 0 0 / 2%) 1px, transparent 1px),
              linear-gradient(90deg, oklch(0.9 0 0 / 2%) 1px, transparent 1px)
            `,
            backgroundSize: "80px 80px",
          }}
          aria-hidden="true"
        />

        {/* Atmospheric orbs */}
        <div
          className="absolute inset-0 overflow-hidden pointer-events-none"
          aria-hidden="true"
        >
          <div
            className="absolute top-1/3 left-1/4 w-96 h-96 rounded-full opacity-[0.03]"
            style={{
              background: "radial-gradient(circle, white 0%, transparent 70%)",
              filter: "blur(80px)",
            }}
          />
          <div
            className="absolute bottom-1/3 right-1/4 w-64 h-64 rounded-full opacity-[0.03]"
            style={{
              background: "radial-gradient(circle, white 0%, transparent 70%)",
              filter: "blur(60px)",
            }}
          />
        </div>

        <div className="relative z-10 text-center px-6">
          {/* ALDIOR wordmark */}
          <div className="overflow-hidden mb-2">
            <h1
              className="font-display font-black leading-none tracking-[0.04em] animate-hero-zoom"
              style={{
                fontSize: "clamp(5rem, 18vw, 16rem)",
                background:
                  "linear-gradient(180deg, oklch(0.96 0 0) 0%, oklch(0.7 0 0) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              ALDIOR
            </h1>
          </div>

          {/* Tagline */}
          <div
            className="opacity-0 animate-fade-up-delay"
            style={{ animationFillMode: "forwards" }}
          >
            <p className="text-[oklch(0.55_0_0)] text-xs md:text-sm tracking-[0.45em] uppercase mb-2">
              BUILD LOUD. WORN LOOSE.
            </p>
            <div className="flex items-center justify-center gap-3 mb-10">
              <div className="h-px w-12 bg-[oklch(0.25_0_0)]" />
              <span className="text-[oklch(0.45_0_0)] text-[9px] tracking-[0.4em] uppercase flex items-center gap-1.5">
                🇮🇳 Made in India
              </span>
              <div className="h-px w-12 bg-[oklch(0.25_0_0)]" />
            </div>
          </div>

          {/* CTA Buttons */}
          <div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 opacity-0 animate-fade-up-delay2"
            style={{ animationFillMode: "forwards" }}
          >
            <button
              type="button"
              onClick={() => onNavigate("shop")}
              className="px-10 py-3.5 bg-white text-black text-[10px] tracking-[0.25em] uppercase font-bold hover:bg-[oklch(0.88_0_0)] active:scale-[0.98] transition-all duration-200 min-w-[180px]"
            >
              Shop Now
            </button>
            <button
              type="button"
              onClick={() => onNavigate("about")}
              className="px-10 py-3.5 border border-[oklch(0.25_0_0)] text-[oklch(0.55_0_0)] text-[10px] tracking-[0.25em] uppercase hover:border-[oklch(0.6_0_0)] hover:text-white active:scale-[0.98] transition-all duration-200 min-w-[180px]"
            >
              Our Story
            </button>
          </div>
        </div>
      </section>

      {/* ── Marquee ── */}
      <MarqueeBanner />

      {/* ── Trending Now ── */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Section header */}
          <div className="flex items-center justify-between mb-10">
            <div>
              <p className="text-[oklch(0.4_0_0)] text-[9px] tracking-[0.35em] uppercase mb-1">
                Live Updates
              </p>
              <h2 className="font-display text-3xl md:text-4xl font-black tracking-[0.06em] text-white uppercase">
                Trending Now
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous products"
                className="w-10 h-10 border border-[oklch(0.22_0_0)] flex items-center justify-center text-[oklch(0.5_0_0)] hover:border-white hover:text-white transition-all"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                type="button"
                onClick={handleNext}
                aria-label="Next products"
                className="w-10 h-10 border border-[oklch(0.22_0_0)] flex items-center justify-center text-[oklch(0.5_0_0)] hover:border-white hover:text-white transition-all"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

          {/* Desktop: 3 columns */}
          <div className="hidden md:grid grid-cols-3 gap-4">
            {visibleDesktop.map((product, idx) => (
              <button
                key={`${product.id}-${trendingIndex}-${idx}`}
                type="button"
                onClick={() => {
                  onSelectProduct(product.id);
                  onNavigate("product");
                }}
                className="product-card border border-[oklch(0.15_0_0)] bg-[oklch(0.07_0_0)] group animate-fade-in text-left"
                aria-label={`View ${product.name}`}
              >
                <div className="relative overflow-hidden aspect-[4/5] bg-[oklch(0.1_0_0)]">
                  <ProductImage
                    src={product.image}
                    alt={product.name}
                    index={product.id}
                    className="product-img w-full h-full object-cover"
                  />
                  {product.tag && (
                    <span className="absolute top-3 left-3 text-[9px] tracking-[0.2em] uppercase bg-white text-black px-2.5 py-1 font-bold z-10">
                      {product.tag}
                    </span>
                  )}
                  <div className="absolute bottom-0 left-0 right-0 bg-white text-black py-3 text-[10px] tracking-[0.25em] uppercase font-bold translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-10 text-center">
                    View Details
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-[oklch(0.78_0_0)] text-sm tracking-wide mb-1 leading-snug truncate">
                    {product.name}
                  </p>
                  <div className="flex items-center gap-2">
                    <p className="text-white font-bold tabular-nums text-sm">
                      {formatPrice(product.discountPrice)}
                    </p>
                    <p className="text-[oklch(0.4_0_0)] text-xs line-through tabular-nums">
                      {formatPrice(product.price)}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Mobile: 2 columns */}
          <div className="grid md:hidden grid-cols-2 gap-3">
            {visibleMobile.map((product, idx) => (
              <button
                key={`mob-${product.id}-${trendingIndex}-${idx}`}
                type="button"
                onClick={() => {
                  onSelectProduct(product.id);
                  onNavigate("product");
                }}
                className="product-card border border-[oklch(0.15_0_0)] bg-[oklch(0.07_0_0)] group animate-fade-in text-left"
                aria-label={`View ${product.name}`}
              >
                <div className="relative overflow-hidden aspect-[4/5] bg-[oklch(0.1_0_0)]">
                  <ProductImage
                    src={product.image}
                    alt={product.name}
                    index={product.id}
                    className="product-img w-full h-full object-cover"
                  />
                  {product.tag && (
                    <span className="absolute top-2 left-2 text-[8px] tracking-[0.15em] uppercase bg-white text-black px-2 py-0.5 font-bold z-10">
                      {product.tag}
                    </span>
                  )}
                </div>
                <div className="p-3">
                  <p className="text-[oklch(0.75_0_0)] text-xs tracking-wide mb-1 leading-snug truncate">
                    {product.name}
                  </p>
                  <div className="flex items-center gap-1.5">
                    <p className="text-white font-bold tabular-nums text-sm">
                      {formatPrice(product.discountPrice)}
                    </p>
                    <p className="text-[oklch(0.4_0_0)] text-[10px] line-through tabular-nums">
                      {formatPrice(product.price)}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Progress dots */}
          <div className="flex items-center justify-center gap-1.5 mt-8">
            {TRENDING_PRODUCTS.map((product, i) => (
              <button
                key={product.id}
                type="button"
                onClick={() => setTrendingIndex(i)}
                aria-label={`Go to product ${i + 1}`}
                className={`transition-all duration-300 ${
                  i === trendingIndex
                    ? "w-6 h-1.5 bg-white"
                    : "w-1.5 h-1.5 bg-[oklch(0.25_0_0)] hover:bg-[oklch(0.4_0_0)] rounded-full"
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── Made in India strip ── */}
      <section className="py-16 px-6 border-t border-b border-[oklch(0.12_0_0)]">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center gap-6 mb-4">
            <div className="h-px flex-1 max-w-24 bg-[oklch(0.18_0_0)]" />
            <span className="text-3xl">🇮🇳</span>
            <div className="h-px flex-1 max-w-24 bg-[oklch(0.18_0_0)]" />
          </div>
          <p className="text-white text-sm md:text-base tracking-[0.3em] uppercase font-bold mb-2">
            Proudly Made in India
          </p>
          <p className="text-[oklch(0.4_0_0)] text-xs tracking-[0.2em] uppercase">
            Handcrafted in India · Every stitch intentional
          </p>
        </div>
      </section>

      {/* ── View Full Collection CTA ── */}
      <section className="py-20 px-6 text-center">
        <div className="max-w-xl mx-auto">
          <p className="text-[oklch(0.35_0_0)] text-[9px] tracking-[0.4em] uppercase mb-4">
            Explore All
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-black tracking-[0.05em] text-white mb-8 uppercase">
            The Collection
          </h2>
          <button
            type="button"
            onClick={() => onNavigate("shop")}
            className="inline-block px-12 py-4 border border-[oklch(0.4_0_0)] text-[oklch(0.7_0_0)] text-[10px] tracking-[0.3em] uppercase hover:bg-white hover:text-black hover:border-white active:scale-[0.98] transition-all duration-200"
          >
            Shop All
          </button>
        </div>
      </section>
    </main>
  );
}

// ─── PAGE: Shop ───────────────────────────────────────────────────
function PageShop({
  onNavigate,
  onSelectProduct,
}: {
  onNavigate: (page: PageType) => void;
  onSelectProduct: (id: number) => void;
}) {
  const topOffset = ANNOUNCEMENT_HEIGHT + HEADER_HEIGHT;
  const [filter, setFilter] = useState<FilterTab>("all");

  const tabs: { label: string; value: FilterTab }[] = [
    { label: "All", value: "all" },
    { label: "Oversized", value: "oversized" },
    { label: "Essentials", value: "essentials" },
    { label: "Streetwear", value: "streetwear" },
  ];

  const filtered =
    filter === "all" ? PRODUCTS : PRODUCTS.filter((p) => p.category === filter);

  return (
    <main className="page-enter" style={{ paddingTop: `${topOffset}px` }}>
      <section className="py-14 px-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <p className="text-[oklch(0.4_0_0)] text-[9px] tracking-[0.35em] uppercase mb-2">
            The Collection
          </p>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <h1 className="font-display text-5xl md:text-6xl font-black tracking-[0.04em] text-white uppercase">
              Shop All
            </h1>

            {/* Filter tabs */}
            <div
              className="flex flex-wrap gap-2"
              role="tablist"
              aria-label="Product category filter"
            >
              {tabs.map((tab) => (
                <button
                  key={tab.value}
                  type="button"
                  role="tab"
                  aria-selected={filter === tab.value}
                  onClick={() => setFilter(tab.value)}
                  className={`px-4 py-2 text-[9px] tracking-[0.2em] uppercase transition-all duration-200 border ${
                    filter === tab.value
                      ? "bg-white text-black border-white font-bold"
                      : "border-[oklch(0.22_0_0)] text-[oklch(0.45_0_0)] hover:border-[oklch(0.5_0_0)] hover:text-[oklch(0.75_0_0)]"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map((product, idx) => (
            <button
              key={product.id}
              type="button"
              onClick={() => {
                onSelectProduct(product.id);
                onNavigate("product");
              }}
              className="product-card border border-[oklch(0.15_0_0)] bg-[oklch(0.07_0_0)] group text-left"
              aria-label={`View ${product.name}`}
            >
              <div className="relative overflow-hidden aspect-[4/5] bg-[oklch(0.1_0_0)]">
                <ProductImage
                  src={product.image}
                  alt={product.name}
                  index={idx}
                  className="product-img w-full h-full object-cover"
                />
                {product.tag && (
                  <span className="absolute top-3 left-3 text-[9px] tracking-[0.2em] uppercase bg-white text-black px-2.5 py-1 font-bold z-10">
                    {product.tag}
                  </span>
                )}
                <div className="absolute bottom-0 left-0 right-0 bg-[oklch(0.04_0_0_/_90%)] text-white py-3 text-[10px] tracking-[0.25em] uppercase font-bold translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-10 text-center backdrop-blur-sm">
                  View Details
                </div>
              </div>
              <div className="p-4">
                <p className="text-[oklch(0.75_0_0)] text-sm tracking-wide mb-1.5 leading-snug">
                  {product.name}
                </p>
                <div className="flex items-center gap-2">
                  <p className="text-white font-bold tabular-nums">
                    {formatPrice(product.discountPrice)}
                  </p>
                  <p className="text-[oklch(0.4_0_0)] text-xs line-through tabular-nums">
                    {formatPrice(product.price)}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-[oklch(0.3_0_0)] text-xs tracking-[0.3em] uppercase">
            No items in this category
          </div>
        )}
      </section>
    </main>
  );
}

// ─── PAGE: Cart ───────────────────────────────────────────────────
function PageCart({
  cart,
  onUpdateQty,
  onRemove,
  onNavigate,
}: {
  cart: CartItem[];
  onUpdateQty: (id: number, size: string, qty: number) => void;
  onRemove: (id: number, size: string) => void;
  onNavigate: (page: PageType) => void;
}) {
  const topOffset = ANNOUNCEMENT_HEIGHT + HEADER_HEIGHT;
  const subtotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  return (
    <main className="page-enter" style={{ paddingTop: `${topOffset}px` }}>
      <section className="py-14 px-6 max-w-5xl mx-auto min-h-[calc(100vh-160px)]">
        <div className="mb-10">
          <p className="text-[oklch(0.4_0_0)] text-[9px] tracking-[0.35em] uppercase mb-2">
            {cart.length} {cart.length === 1 ? "Item" : "Items"}
          </p>
          <h1 className="font-display text-5xl md:text-6xl font-black tracking-[0.04em] text-white uppercase">
            Your Cart
          </h1>
        </div>

        {cart.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 gap-6 text-center">
            <div className="w-20 h-20 border border-[oklch(0.2_0_0)] flex items-center justify-center">
              <ShoppingBag size={28} className="text-[oklch(0.3_0_0)]" />
            </div>
            <div>
              <p className="text-[oklch(0.4_0_0)] text-sm tracking-[0.2em] uppercase mb-2">
                Your cart is empty
              </p>
              <p className="text-[oklch(0.3_0_0)] text-xs">
                Add some pieces to get started
              </p>
            </div>
            <button
              type="button"
              onClick={() => onNavigate("shop")}
              className="px-10 py-3.5 bg-white text-black text-[10px] tracking-[0.25em] uppercase font-bold hover:bg-[oklch(0.88_0_0)] transition-all"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="grid lg:grid-cols-[1fr_340px] gap-10">
            {/* Items */}
            <div className="space-y-0">
              {cart.map((item, idx) => (
                <div
                  key={`${item.id}-${item.size}`}
                  className={`flex gap-5 py-6 ${idx < cart.length - 1 ? "border-b border-[oklch(0.12_0_0)]" : ""}`}
                >
                  {/* Image */}
                  <div className="w-24 h-28 flex-shrink-0 bg-[oklch(0.1_0_0)] overflow-hidden">
                    <ProductImage
                      src={item.image}
                      alt={item.name}
                      index={item.id}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="text-white text-sm tracking-wide leading-snug mb-1">
                          {item.name}
                        </p>
                        <div className="flex items-center gap-3 mb-3">
                          <span className="text-[oklch(0.4_0_0)] text-[10px] tracking-[0.15em] uppercase border border-[oklch(0.2_0_0)] px-2 py-0.5">
                            Size: {item.size}
                          </span>
                          <span className="text-white font-bold text-sm tabular-nums">
                            {formatPrice(item.price)}
                          </span>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => onRemove(item.id, item.size)}
                        aria-label={`Remove ${item.name} (${item.size})`}
                        className="text-[oklch(0.3_0_0)] hover:text-[oklch(0.7_0_0)] transition-colors flex-shrink-0 mt-0.5"
                      >
                        <X size={16} />
                      </button>
                    </div>

                    {/* Qty + line total */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center border border-[oklch(0.2_0_0)]">
                        <button
                          type="button"
                          onClick={() =>
                            onUpdateQty(item.id, item.size, item.quantity - 1)
                          }
                          disabled={item.quantity <= 1}
                          aria-label="Decrease quantity"
                          className="w-9 h-9 flex items-center justify-center text-[oklch(0.45_0_0)] hover:text-white transition-colors disabled:opacity-30 border-r border-[oklch(0.2_0_0)]"
                        >
                          <Minus size={11} />
                        </button>
                        <span className="w-10 text-center text-sm text-white tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            onUpdateQty(item.id, item.size, item.quantity + 1)
                          }
                          aria-label="Increase quantity"
                          className="w-9 h-9 flex items-center justify-center text-[oklch(0.45_0_0)] hover:text-white transition-colors border-l border-[oklch(0.2_0_0)]"
                        >
                          <Plus size={11} />
                        </button>
                      </div>
                      <span className="text-[oklch(0.5_0_0)] text-sm tabular-nums">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order summary */}
            <div className="border border-[oklch(0.15_0_0)] bg-[oklch(0.07_0_0)] p-6 h-fit lg:sticky lg:top-[100px]">
              <h2 className="font-display text-lg font-bold tracking-[0.2em] uppercase text-white mb-6">
                Order Summary
              </h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-[oklch(0.45_0_0)] tracking-wide">
                    Subtotal ({cart.reduce((a, i) => a + i.quantity, 0)} items)
                  </span>
                  <span className="text-white font-bold tabular-nums">
                    {formatPrice(subtotal)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[oklch(0.45_0_0)] tracking-wide">
                    Shipping
                  </span>
                  <span
                    className={
                      subtotal >= 2999
                        ? "text-[oklch(0.6_0_0)] text-xs"
                        : "text-[oklch(0.5_0_0)] text-xs"
                    }
                  >
                    {subtotal >= 2999 ? "Free" : "Calculated at checkout"}
                  </span>
                </div>
              </div>

              <div className="border-t border-[oklch(0.15_0_0)] pt-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-[oklch(0.55_0_0)] text-xs tracking-[0.2em] uppercase">
                    Total
                  </span>
                  <span className="text-white text-xl font-black tabular-nums">
                    {formatPrice(subtotal)}
                  </span>
                </div>
              </div>

              <button
                type="button"
                className="w-full bg-white text-black py-4 text-[10px] tracking-[0.25em] uppercase font-bold hover:bg-[oklch(0.88_0_0)] active:scale-[0.98] transition-all mb-3"
              >
                Proceed to Checkout
              </button>
              <button
                type="button"
                onClick={() => onNavigate("shop")}
                className="w-full border border-[oklch(0.2_0_0)] text-[oklch(0.45_0_0)] py-3 text-[10px] tracking-[0.2em] uppercase hover:border-[oklch(0.4_0_0)] hover:text-[oklch(0.7_0_0)] transition-all"
              >
                Continue Shopping
              </button>

              {subtotal < 2999 && (
                <p className="text-[oklch(0.35_0_0)] text-[10px] text-center mt-4 leading-relaxed">
                  Add {formatPrice(2999 - subtotal)} more for free shipping
                </p>
              )}
            </div>
          </div>
        )}
      </section>
    </main>
  );
}

// ─── PAGE: About ──────────────────────────────────────────────────
function PageAbout({ onNavigate }: { onNavigate: (page: PageType) => void }) {
  const topOffset = ANNOUNCEMENT_HEIGHT + HEADER_HEIGHT;

  return (
    <main className="page-enter" style={{ paddingTop: `${topOffset}px` }}>
      {/* Brand story */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-start mb-24">
          <div>
            <h1
              className="font-display font-black leading-none tracking-[0.03em] text-white mb-8"
              style={{ fontSize: "clamp(3rem, 8vw, 6rem)" }}
            >
              OUR
              <br />
              STORY
            </h1>
            <p className="text-[oklch(0.55_0_0)] leading-relaxed text-base mb-6 max-w-md">
              ALDIOR is not just a clothing brand. It's a declaration. Built
              from the ground up in India, fueled by the unfiltered energy of a
              new generation that refuses to follow — we create garments that
              hit different.
            </p>
            <p className="text-[oklch(0.45_0_0)] leading-relaxed text-sm mb-6 max-w-md">
              Fresh off the ground. Every drop intentional. Every silhouette
              built to stand out. We are just getting started, and we are
              already loud.
            </p>
            <p className="text-[oklch(0.38_0_0)] leading-relaxed text-sm max-w-md">
              We exist for those who refuse to blend in — the disruptors, the
              dreamers, the ones who move differently. This is not a phase. This
              is ALDIOR.
            </p>

            <div className="flex items-center gap-3 mt-10">
              <div className="w-8 h-px bg-[oklch(0.3_0_0)]" />
              <span className="text-[oklch(0.45_0_0)] text-[9px] tracking-[0.3em] uppercase">
                🇮🇳 Made with Pride in India
              </span>
            </div>
          </div>

          {/* Stats */}
          <div className="relative">
            <div
              className="absolute -top-4 -right-4 w-full h-full border border-[oklch(0.14_0_0)] pointer-events-none"
              aria-hidden="true"
            />
            <div className="relative grid grid-cols-2 gap-3">
              {[
                { value: "3+", label: "Collections" },
                { value: "100+", label: "Customers" },
                { value: "100%", label: "Made in India" },
                { value: "∞", label: "Possibilities" },
              ].map(({ value, label }) => (
                <div
                  key={label}
                  className="bg-[oklch(0.08_0_0)] border border-[oklch(0.15_0_0)] p-8 flex flex-col items-center justify-center text-center gap-2 hover:border-[oklch(0.35_0_0)] transition-all duration-300 group"
                >
                  <span className="font-display text-4xl font-black text-white group-hover:scale-105 transition-transform duration-300 inline-block">
                    {value}
                  </span>
                  <span className="text-[oklch(0.4_0_0)] text-[9px] tracking-[0.25em] uppercase">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Collections */}
        <div className="mb-16">
          <div className="flex items-center gap-4 mb-10">
            <div className="w-8 h-px bg-[oklch(0.25_0_0)]" />
            <h2 className="text-[9px] tracking-[0.35em] uppercase text-[oklch(0.45_0_0)]">
              Our Collections
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {COLLECTIONS.map((col) => (
              <div
                key={col.title}
                className="bg-[oklch(0.08_0_0)] border border-[oklch(0.15_0_0)] p-8 hover:border-[oklch(0.35_0_0)] transition-all duration-300 group"
              >
                <h3 className="font-display text-3xl font-black text-white tracking-wider mb-1 group-hover:tracking-[0.15em] transition-all duration-300">
                  {col.title}
                </h3>
                <p className="text-[oklch(0.4_0_0)] text-[9px] tracking-[0.3em] uppercase mb-4">
                  {col.subtitle}
                </p>
                <p className="text-[oklch(0.45_0_0)] text-sm leading-relaxed">
                  {col.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Made in India section */}
        <div className="border border-[oklch(0.15_0_0)] bg-[oklch(0.07_0_0)] p-12 text-center">
          <p className="text-5xl mb-6">🇮🇳</p>
          <h2 className="font-display text-3xl font-black tracking-[0.06em] text-white uppercase mb-4">
            Made with Pride in India
          </h2>
          <p className="text-[oklch(0.45_0_0)] text-sm leading-relaxed max-w-xl mx-auto mb-8">
            Every ALDIOR garment is designed and manufactured in India. We
            believe in building quality locally and wearing it globally. From
            India's streets to wardrobes worldwide — this is our identity, our
            pride.
          </p>
          <button
            type="button"
            onClick={() => onNavigate("shop")}
            className="px-10 py-3.5 bg-white text-black text-[10px] tracking-[0.25em] uppercase font-bold hover:bg-[oklch(0.88_0_0)] transition-all"
          >
            Shop the Collection
          </button>
        </div>
      </section>
    </main>
  );
}

// ─── PAGE: Contact ────────────────────────────────────────────────
function PageContact() {
  const topOffset = ANNOUNCEMENT_HEIGHT + HEADER_HEIGHT;
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<typeof form>>({});

  function validate() {
    const e: Partial<typeof form> = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email))
      e.email = "Valid email is required";
    if (!form.message.trim()) e.message = "Message is required";
    return e;
  }

  function handleSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    const e = validate();
    if (Object.keys(e).length) {
      setErrors(e);
      return;
    }
    setErrors({});
    setSubmitted(true);
  }

  return (
    <main className="page-enter" style={{ paddingTop: `${topOffset}px` }}>
      <section className="py-14 px-6 max-w-7xl mx-auto">
        <div className="mb-10">
          <p className="text-[oklch(0.4_0_0)] text-[9px] tracking-[0.35em] uppercase mb-2">
            Reach Out
          </p>
          <h1 className="font-display text-5xl md:text-6xl font-black tracking-[0.04em] text-white uppercase">
            Get in Touch
          </h1>
        </div>

        <div className="grid md:grid-cols-2 gap-16">
          {/* Contact info */}
          <div>
            <p className="text-[oklch(0.45_0_0)] text-sm leading-relaxed mb-10 max-w-sm">
              Whether it's a collaboration, a styling query, or just
              appreciation — we want to hear from you. We usually respond within
              24 hours.
            </p>

            <div className="space-y-8">
              <div className="border-l border-[oklch(0.18_0_0)] pl-5">
                <p className="text-[oklch(0.35_0_0)] text-[9px] tracking-[0.3em] uppercase mb-2">
                  Email
                </p>
                <a
                  href="mailto:ujjwaljain099@gmail.com"
                  className="text-white text-sm hover:text-[oklch(0.75_0_0)] transition-colors"
                >
                  ujjwaljain099@gmail.com
                </a>
              </div>

              <div className="border-l border-[oklch(0.18_0_0)] pl-5">
                <p className="text-[oklch(0.35_0_0)] text-[9px] tracking-[0.3em] uppercase mb-2">
                  Location
                </p>
                <p className="text-white text-sm">India 🇮🇳</p>
                <p className="text-[oklch(0.45_0_0)] text-xs mt-1">
                  Exclusively online — India only
                </p>
              </div>

              <div className="border-l border-[oklch(0.18_0_0)] pl-5">
                <p className="text-[oklch(0.35_0_0)] text-[9px] tracking-[0.3em] uppercase mb-2">
                  Instagram
                </p>
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-white hover:text-[oklch(0.75_0_0)] transition-colors text-sm"
                >
                  <Instagram size={14} />
                  @aldior.in
                </a>
              </div>

              <div className="border-l border-[oklch(0.18_0_0)] pl-5">
                <p className="text-[oklch(0.35_0_0)] text-[9px] tracking-[0.3em] uppercase mb-2">
                  Hours
                </p>
                <p className="text-white text-sm">Mon–Sat, 10am–7pm IST</p>
              </div>
            </div>
          </div>

          {/* Form */}
          <div>
            {submitted ? (
              <div className="border border-[oklch(0.18_0_0)] bg-[oklch(0.07_0_0)] p-10 flex flex-col items-start gap-4">
                <div className="w-12 h-12 border border-[oklch(0.25_0_0)] flex items-center justify-center">
                  <Send size={18} className="text-white" />
                </div>
                <h3 className="font-display text-2xl font-bold text-white tracking-wider">
                  Message Sent
                </h3>
                <p className="text-[oklch(0.45_0_0)] text-sm leading-relaxed">
                  Thanks for reaching out. We'll get back to you within 24 hours
                  at {form.email}.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setForm({ name: "", email: "", message: "" });
                  }}
                  className="text-[10px] tracking-[0.2em] uppercase text-[oklch(0.5_0_0)] border border-[oklch(0.2_0_0)] px-6 py-2.5 hover:bg-white hover:text-black hover:border-white transition-all mt-2"
                >
                  Send Another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                <div>
                  <label
                    htmlFor="contact-name"
                    className="block text-[9px] tracking-[0.3em] uppercase text-[oklch(0.4_0_0)] mb-2"
                  >
                    Name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    autoComplete="name"
                    value={form.name}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, name: e.target.value }))
                    }
                    className={`w-full bg-[oklch(0.08_0_0)] border ${
                      errors.name ? "border-red-500" : "border-[oklch(0.2_0_0)]"
                    } text-white px-4 py-3 text-sm focus:border-[oklch(0.5_0_0)] focus:outline-none transition-colors placeholder:text-[oklch(0.28_0_0)]`}
                    placeholder="Your full name"
                  />
                  {errors.name && (
                    <p role="alert" className="text-red-400 text-xs mt-1.5">
                      {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="contact-email"
                    className="block text-[9px] tracking-[0.3em] uppercase text-[oklch(0.4_0_0)] mb-2"
                  >
                    Email
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    autoComplete="email"
                    value={form.email}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, email: e.target.value }))
                    }
                    className={`w-full bg-[oklch(0.08_0_0)] border ${
                      errors.email
                        ? "border-red-500"
                        : "border-[oklch(0.2_0_0)]"
                    } text-white px-4 py-3 text-sm focus:border-[oklch(0.5_0_0)] focus:outline-none transition-colors placeholder:text-[oklch(0.28_0_0)]`}
                    placeholder="ujjwaljain099@gmail.com"
                  />
                  {errors.email && (
                    <p role="alert" className="text-red-400 text-xs mt-1.5">
                      {errors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="contact-message"
                    className="block text-[9px] tracking-[0.3em] uppercase text-[oklch(0.4_0_0)] mb-2"
                  >
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    rows={5}
                    value={form.message}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        message: e.target.value,
                      }))
                    }
                    className={`w-full bg-[oklch(0.08_0_0)] border ${
                      errors.message
                        ? "border-red-500"
                        : "border-[oklch(0.2_0_0)]"
                    } text-white px-4 py-3 text-sm focus:border-[oklch(0.5_0_0)] focus:outline-none transition-colors resize-none placeholder:text-[oklch(0.28_0_0)]`}
                    placeholder="What would you like to say?"
                  />
                  {errors.message && (
                    <p role="alert" className="text-red-400 text-xs mt-1.5">
                      {errors.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full bg-white text-black py-4 text-[10px] tracking-[0.25em] uppercase font-bold hover:bg-[oklch(0.88_0_0)] transition-all flex items-center justify-center gap-2"
                >
                  <Send size={13} />
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}

// ─── Info Page Layout ─────────────────────────────────────────────
function InfoPageLayout({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const topOffset = ANNOUNCEMENT_HEIGHT + HEADER_HEIGHT;

  return (
    <main className="page-enter" style={{ paddingTop: `${topOffset}px` }}>
      <section className="py-14 px-6 max-w-3xl mx-auto min-h-[calc(100vh-160px)]">
        <h1
          className="font-display font-black tracking-[0.04em] text-white uppercase mb-12 leading-none"
          style={{ fontSize: "clamp(2.5rem, 6vw, 4rem)" }}
        >
          {title}
        </h1>
        <div className="space-y-10">{children}</div>
      </section>
    </main>
  );
}

function InfoSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h2 className="text-[9px] tracking-[0.35em] uppercase text-[oklch(0.45_0_0)] mb-4 border-b border-[oklch(0.12_0_0)] pb-3">
        {title}
      </h2>
      <div className="text-[oklch(0.5_0_0)] text-sm leading-relaxed space-y-3">
        {children}
      </div>
    </div>
  );
}

// ─── PAGE: Shipping Policy ────────────────────────────────────────
function PageShipping() {
  return (
    <InfoPageLayout title="Shipping Policy">
      <InfoSection title="Delivery Timeline">
        <p>
          All ALDIOR orders are processed within 1–2 business days of placement.
          Once dispatched, standard delivery across India takes 5–7 business
          days. We partner with reliable logistics providers to ensure your
          order reaches you safely and on time.
        </p>
        <p>
          You will receive a tracking link via email once your order has been
          shipped. For any delays beyond 7 business days, please contact us at
          ujjwaljain099@gmail.com and we will investigate promptly.
        </p>
      </InfoSection>

      <InfoSection title="Shipping Charges">
        <p>
          We offer free shipping on all orders above ₹2,999. For orders below
          this threshold, a flat shipping fee of ₹99 will be applied at
          checkout. This charge covers packaging, handling, and courier costs.
        </p>
        <p>
          Cash on Delivery (COD) is available across most pin codes in India at
          no additional charge. COD availability is confirmed at checkout based
          on your delivery pin code.
        </p>
      </InfoSection>

      <InfoSection title="Shipping Coverage">
        <p>
          We currently ship exclusively within India. International shipping is
          not available at this time. We are working on expanding our reach —
          stay tuned to our Instagram{" "}
          <a
            href="https://www.instagram.com/aldior.in?igsh=end3nxd4agtiexfz"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white underline underline-offset-2 hover:text-[oklch(0.75_0_0)] transition-colors"
          >
            @aldior.in
          </a>{" "}
          for announcements.
        </p>
      </InfoSection>

      <InfoSection title="Order Issues">
        <p>
          If your package arrives damaged, incorrect, or does not arrive within
          the expected timeframe, please reach out to us within 48 hours of the
          delivery date. We will resolve all issues swiftly and ensure you
          receive the correct product.
        </p>
      </InfoSection>
    </InfoPageLayout>
  );
}

// ─── PAGE: Returns & Exchange ─────────────────────────────────────
function PageReturns() {
  return (
    <InfoPageLayout title="Returns & Exchange">
      <InfoSection title="Return Window">
        <p>
          ALDIOR accepts returns within 7 days of delivery. To be eligible for a
          return, the item must be unused, unwashed, and in its original
          condition with all tags intact. Items that show signs of wear,
          washing, or alteration will not be accepted.
        </p>
        <p>
          To initiate a return, please email us at ujjwaljain099@gmail.com with
          your order number and reason for return. Our team will guide you
          through the process and provide a return shipping address.
        </p>
      </InfoSection>

      <InfoSection title="Exchange for Size">
        <p>
          We understand that sizing can be tricky, especially for oversized
          pieces. We offer one-time size exchanges within 7 days of delivery.
          The item must be in original, unworn condition with all tags attached.
        </p>
        <p>
          Please refer to our Size Guide before placing your order. Exchanges
          are subject to stock availability. If your requested size is
          unavailable, we will offer a store credit.
        </p>
      </InfoSection>

      <InfoSection title="Refund Policy">
        <p>
          Approved returns will be processed as store credit or a refund to the
          original payment method within 7–10 business days. Please note that
          Cash on Delivery orders can only be refunded as store credit.
        </p>
        <p>
          Items purchased during sale periods or with discount codes are not
          eligible for refunds. Size exchanges may be processed for sale items
          subject to availability.
        </p>
      </InfoSection>

      <InfoSection title="Non-Returnable Items">
        <p>
          For hygiene reasons, accessories and items marked as "Final Sale" or
          "Limited" on the product page are not eligible for returns or
          exchanges. All sale items are sold as-is.
        </p>
      </InfoSection>
    </InfoPageLayout>
  );
}

// ─── PAGE: Size Guide ─────────────────────────────────────────────
function PageSizeGuide() {
  const sizeData = [
    { size: "S", chest: "36–38", waist: "30–32", length: "27" },
    { size: "M", chest: "38–40", waist: "32–34", length: "28" },
    { size: "L", chest: "40–42", waist: "34–36", length: "29" },
    { size: "XL", chest: "42–44", waist: "36–38", length: "30" },
  ];

  return (
    <InfoPageLayout title="Size Guide">
      <InfoSection title="How to Measure">
        <p>
          For the best fit, measure yourself before placing your order. Use a
          soft measuring tape and measure over your base layer (not your outer
          garments). All measurements below are in inches.
        </p>
        <ul className="list-disc list-inside space-y-1 pl-1">
          <li>
            <strong className="text-[oklch(0.65_0_0)]">Chest:</strong> Measure
            around the fullest part of your chest, keeping the tape parallel to
            the ground.
          </li>
          <li>
            <strong className="text-[oklch(0.65_0_0)]">Waist:</strong> Measure
            around your natural waistline, the narrowest part of your torso.
          </li>
          <li>
            <strong className="text-[oklch(0.65_0_0)]">Length:</strong> Garment
            length measured from the highest point of the shoulder to the hem.
          </li>
        </ul>
      </InfoSection>

      <InfoSection title="Size Chart">
        <div className="overflow-x-auto -mx-1">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[oklch(0.18_0_0)]">
                <th className="text-left py-3 pr-6 text-[9px] tracking-[0.25em] uppercase text-[oklch(0.45_0_0)] font-normal">
                  Size
                </th>
                <th className="text-left py-3 pr-6 text-[9px] tracking-[0.25em] uppercase text-[oklch(0.45_0_0)] font-normal">
                  Chest (in)
                </th>
                <th className="text-left py-3 pr-6 text-[9px] tracking-[0.25em] uppercase text-[oklch(0.45_0_0)] font-normal">
                  Waist (in)
                </th>
                <th className="text-left py-3 text-[9px] tracking-[0.25em] uppercase text-[oklch(0.45_0_0)] font-normal">
                  Length (in)
                </th>
              </tr>
            </thead>
            <tbody>
              {sizeData.map((row) => (
                <tr
                  key={row.size}
                  className="border-b border-[oklch(0.1_0_0)] hover:bg-[oklch(0.07_0_0)] transition-colors"
                >
                  <td className="py-4 pr-6 text-white font-bold">{row.size}</td>
                  <td className="py-4 pr-6 text-[oklch(0.55_0_0)]">
                    {row.chest}
                  </td>
                  <td className="py-4 pr-6 text-[oklch(0.55_0_0)]">
                    {row.waist}
                  </td>
                  <td className="py-4 text-[oklch(0.55_0_0)]">{row.length}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-[oklch(0.38_0_0)] text-xs italic mt-4">
          All measurements in inches. For a relaxed / oversized fit, size up.
        </p>
      </InfoSection>

      <InfoSection title="Fit Notes">
        <p>
          ALDIOR garments are designed with intentional oversized silhouettes.
          If you prefer a true oversized look, we recommend sizing up from your
          regular size. For a more fitted appearance on our Essentials line,
          stick to your measured size.
        </p>
        <p>
          Lowers are designed with an elasticated waistband and are generally
          true to size. We recommend ordering your exact waist measurement for
          the best fit.
        </p>
      </InfoSection>
    </InfoPageLayout>
  );
}

// ─── PAGE: Privacy Policy ─────────────────────────────────────────
function PagePrivacy() {
  return (
    <InfoPageLayout title="Privacy Policy">
      <InfoSection title="Information We Collect">
        <p>
          When you place an order or contact us, we collect personal information
          including your name, email address, shipping address, and payment
          details. This information is necessary to process your order and
          provide customer support.
        </p>
        <p>
          We may also collect non-personal information such as browser type,
          referring pages, and browsing activity on our website. This data is
          used solely to improve your experience on our platform.
        </p>
      </InfoSection>

      <InfoSection title="How We Use Your Information">
        <p>
          Your personal information is used to fulfill orders, send order
          confirmations and shipping updates, respond to customer inquiries, and
          improve our products and services. We do not sell, rent, or trade your
          personal data to any third parties.
        </p>
        <p>
          We may share your information with trusted logistics partners and
          payment processors solely for the purpose of completing your
          transaction. All such partners are required to maintain the
          confidentiality of your data.
        </p>
      </InfoSection>

      <InfoSection title="Data Security">
        <p>
          We implement industry-standard security measures to protect your
          personal information from unauthorized access, disclosure, or
          alteration. All payment transactions are processed through secure,
          encrypted channels.
        </p>
      </InfoSection>

      <InfoSection title="Your Rights">
        <p>
          You have the right to access, update, or delete your personal
          information at any time. To exercise these rights, please contact us
          at ujjwaljain099@gmail.com. We will process your request within 7
          business days.
        </p>
        <p>
          You may also opt out of marketing communications at any time by
          following the unsubscribe link in any email we send, or by contacting
          us directly.
        </p>
      </InfoSection>

      <InfoSection title="Cookies & Tracking">
        <p>
          Our website may use cookies to enhance your browsing experience and
          remember your preferences. You can disable cookies in your browser
          settings; however, some features of our website may not function
          correctly without them. We do not use tracking technologies for
          advertising purposes.
        </p>
      </InfoSection>
    </InfoPageLayout>
  );
}

// ─── PAGE: Terms of Service ───────────────────────────────────────
function PageTerms() {
  return (
    <InfoPageLayout title="Terms of Service">
      <InfoSection title="Use of This Site">
        <p>
          By accessing and using this website, you agree to be bound by these
          Terms of Service. ALDIOR reserves the right to update these terms at
          any time without prior notice. Your continued use of the site
          constitutes acceptance of any changes.
        </p>
        <p>
          This website and its content are intended for personal, non-commercial
          use only. You may not reproduce, distribute, or create derivative
          works from any content on this site without our express written
          permission.
        </p>
      </InfoSection>

      <InfoSection title="Orders & Payment">
        <p>
          All orders placed through our website are subject to acceptance by
          ALDIOR. We reserve the right to refuse or cancel any order at our
          discretion, including orders that appear to be placed fraudulently or
          in excess quantities.
        </p>
        <p>
          Prices are listed in Indian Rupees (₹) and are inclusive of applicable
          taxes. We accept UPI, net banking, debit/credit cards, and Cash on
          Delivery. Payment must be completed before dispatch.
        </p>
      </InfoSection>

      <InfoSection title="Cancellations">
        <p>
          Orders can be cancelled within 12 hours of placement by contacting us
          at ujjwaljain099@gmail.com. Once an order has been dispatched, it
          cannot be cancelled. Please refer to our Returns & Exchange policy for
          post-delivery options.
        </p>
      </InfoSection>

      <InfoSection title="Intellectual Property">
        <p>
          All content on this website, including but not limited to the ALDIOR
          name, logo, product designs, photographs, and text, is the
          intellectual property of ALDIOR and is protected by applicable Indian
          and international copyright laws.
        </p>
      </InfoSection>

      <InfoSection title="Governing Law">
        <p>
          These Terms of Service shall be governed by and construed in
          accordance with the laws of India. Any disputes arising from the use
          of this website or purchase of our products shall be subject to the
          exclusive jurisdiction of the courts of India.
        </p>
        <p>
          If you have any questions about these terms, please contact us at
          ujjwaljain099@gmail.com.
        </p>
      </InfoSection>
    </InfoPageLayout>
  );
}

// ─── Footer ───────────────────────────────────────────────────────
function Footer({ onNavigate }: { onNavigate: (page: PageType) => void }) {
  const year = new Date().getFullYear();

  const infoLinks: { label: string; page: PageType }[] = [
    { label: "Shipping Policy", page: "shipping" },
    { label: "Returns & Exchange", page: "returns" },
    { label: "Size Guide", page: "size-guide" },
    { label: "Privacy Policy", page: "privacy" },
    { label: "Terms of Service", page: "terms" },
  ];

  return (
    <footer className="border-t border-[oklch(0.12_0_0)] pt-16 pb-8 px-6 relative overflow-hidden">
      {/* Background watermark */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none select-none"
        aria-hidden="true"
        style={{
          fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
          fontSize: "clamp(6rem, 20vw, 18rem)",
          fontWeight: 900,
          letterSpacing: "0.1em",
          color: "oklch(0.96 0 0 / 2%)",
          lineHeight: 1,
          whiteSpace: "nowrap",
        }}
      >
        ALDIOR
      </div>

      <div className="max-w-7xl mx-auto relative">
        {/* 4-column grid */}
        <div className="grid md:grid-cols-4 gap-10 mb-14">
          {/* Brand column */}
          <div>
            <h2 className="font-display text-2xl font-black tracking-[0.3em] text-white mb-4">
              ALDIOR
            </h2>
            <p className="text-sm leading-relaxed text-[oklch(0.38_0_0)] max-w-[220px] mb-6">
              Build Loud. Worn Loose. Streetwear born in India, built for those
              who refuse to blend in.
            </p>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Follow ALDIOR on Instagram"
              className="w-9 h-9 border border-[oklch(0.2_0_0)] flex items-center justify-center text-[oklch(0.45_0_0)] hover:border-white hover:text-white transition-all inline-flex"
            >
              <Instagram size={15} />
            </a>
          </div>

          {/* Navigate column */}
          <div>
            <h4 className="text-[9px] tracking-[0.35em] uppercase text-[oklch(0.38_0_0)] mb-5">
              Navigate
            </h4>
            <ul className="space-y-3">
              {(
                [
                  { label: "Home", page: "home" },
                  { label: "Shop", page: "shop" },
                  { label: "About", page: "about" },
                  { label: "Contact", page: "contact" },
                ] as { label: string; page: PageType }[]
              ).map((item) => (
                <li key={item.label}>
                  <button
                    type="button"
                    onClick={() => onNavigate(item.page)}
                    className="text-sm text-[oklch(0.42_0_0)] hover:text-white transition-colors"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Info column */}
          <div>
            <h4 className="text-[9px] tracking-[0.35em] uppercase text-[oklch(0.38_0_0)] mb-5">
              Info
            </h4>
            <ul className="space-y-3">
              {infoLinks.map((item) => (
                <li key={item.label}>
                  <button
                    type="button"
                    onClick={() => onNavigate(item.page)}
                    className="text-sm text-[oklch(0.42_0_0)] hover:text-white transition-colors text-left"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact column */}
          <div>
            <h4 className="text-[9px] tracking-[0.35em] uppercase text-[oklch(0.38_0_0)] mb-5">
              Contact
            </h4>
            <ul className="space-y-4">
              <li>
                <p className="text-[9px] tracking-[0.25em] uppercase text-[oklch(0.3_0_0)] mb-1">
                  Email
                </p>
                <a
                  href="mailto:ujjwaljain099@gmail.com"
                  className="text-sm text-[oklch(0.45_0_0)] hover:text-white transition-colors"
                >
                  ujjwaljain099@gmail.com
                </a>
              </li>
              <li>
                <p className="text-[9px] tracking-[0.25em] uppercase text-[oklch(0.3_0_0)] mb-1">
                  Location
                </p>
                <p className="text-sm text-[oklch(0.45_0_0)]">India 🇮🇳</p>
              </li>
              <li>
                <p className="text-[9px] tracking-[0.25em] uppercase text-[oklch(0.3_0_0)] mb-1">
                  Instagram
                </p>
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm text-[oklch(0.45_0_0)] hover:text-white transition-colors"
                >
                  <Instagram size={12} />
                  @aldior.in
                </a>
              </li>
              <li>
                <p className="text-[9px] tracking-[0.25em] uppercase text-[oklch(0.3_0_0)] mb-1">
                  Hours
                </p>
                <p className="text-sm text-[oklch(0.45_0_0)]">
                  Mon–Sat, 10am–7pm IST
                </p>
              </li>
            </ul>
          </div>
        </div>

        {/* Horizontal divider */}
        <div className="border-t border-[oklch(0.12_0_0)] mb-6" />

        {/* Copyright row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-[oklch(0.28_0_0)] text-xs tracking-wide">
            © {year} ALDIOR India. All rights reserved.
          </p>
          <p className="text-[oklch(0.28_0_0)] text-xs tracking-wide">
            Made in India 🇮🇳
          </p>
        </div>
      </div>
    </footer>
  );
}

// ─── App ──────────────────────────────────────────────────────────
export default function App() {
  const [currentPage, setCurrentPage] = useState<PageType>("home");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedProductId, setSelectedProductId] = useState<number | null>(
    null,
  );

  function navigate(page: PageType) {
    if (page !== "product") {
      setSelectedProductId(null);
    }
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function selectProduct(id: number) {
    setSelectedProductId(id);
  }

  function addToCart(product: Product, size: string, qty: number) {
    setCart((prev) => {
      const key = `${product.id}-${size}`;
      const existing = prev.find((i) => `${i.id}-${i.size}` === key);
      if (existing) {
        return prev.map((i) =>
          `${i.id}-${i.size}` === key
            ? { ...i, quantity: i.quantity + qty }
            : i,
        );
      }
      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          price: product.discountPrice,
          image: product.image,
          tag: product.tag,
          size,
          quantity: qty,
        },
      ];
    });
  }

  function updateQty(id: number, size: string, qty: number) {
    setCart((prev) =>
      prev.map((i) =>
        i.id === id && i.size === size
          ? { ...i, quantity: Math.max(1, qty) }
          : i,
      ),
    );
  }

  function removeItem(id: number, size: string) {
    setCart((prev) => prev.filter((i) => !(i.id === id && i.size === size)));
  }

  const cartCount = cart.reduce((acc, i) => acc + i.quantity, 0);

  const selectedProduct =
    selectedProductId !== null
      ? (PRODUCTS.find((p) => p.id === selectedProductId) ?? null)
      : null;

  return (
    <div className="grain-overlay min-h-screen bg-background">
      <AnnouncementBar />

      <Header
        cartCount={cartCount}
        currentPage={currentPage}
        onNavigate={navigate}
      />

      {currentPage === "home" && (
        <PageHome onNavigate={navigate} onSelectProduct={selectProduct} />
      )}
      {currentPage === "shop" && (
        <PageShop onNavigate={navigate} onSelectProduct={selectProduct} />
      )}
      {currentPage === "product" && selectedProduct && (
        <PageProduct
          product={selectedProduct}
          onNavigate={navigate}
          onAddToCart={addToCart}
        />
      )}
      {currentPage === "cart" && (
        <PageCart
          cart={cart}
          onUpdateQty={updateQty}
          onRemove={removeItem}
          onNavigate={navigate}
        />
      )}
      {currentPage === "about" && <PageAbout onNavigate={navigate} />}
      {currentPage === "contact" && <PageContact />}
      {currentPage === "shipping" && <PageShipping />}
      {currentPage === "returns" && <PageReturns />}
      {currentPage === "size-guide" && <PageSizeGuide />}
      {currentPage === "privacy" && <PagePrivacy />}
      {currentPage === "terms" && <PageTerms />}

      <Footer onNavigate={navigate} />
    </div>
  );
}
