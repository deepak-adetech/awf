# Callers.ai — Interaction & Behavior Bible

## Global animations
- `--animate-marquee: marquee 12s linear infinite` — used by logo strips and integration chips
- `--animate-tabs: animate-tabs .6s cubic-bezier(.4,0,.2,1) forwards` — content fade-in for tab switches
- `--animate-accordion-down/up: 0.2s ease-out`
- All transitions use `cubic-bezier(.4,0,.2,1)` (default Tailwind ease-in-out)

## Header
- Fixed at top, full-width, z-1000
- Mobile: `bg-[#ffffff]`
- Desktop: `bg-transparent` (sits over hero white area)
- Inner pill `<div>` wraps nav with `rounded-[25px] p-[10px] pl-[18px]`
- Background does NOT change on scroll based on initial inspection. (No scroll-triggered re-style observed.)
- Logo: 139px wide SVG (Callers wordmark)
- Nav items hidden on mobile, visible at lg
- Mobile shows: "Book a Meeting" pill + hamburger
- Desktop shows full menu: Use Cases (dropdown), Industries (dropdown), Pricing, Customers, Integrations, Knowledge Base, Log In, Book a Meeting

## Hero
- Lottie line animation on the right (status: cosmetic) — we'll skip the Lottie and use a simple SVG/decorative element
- Right side has rounded-bl-[100px] blue panel (#3655E8)
- iPhone svg `iphone.svg` (274×552) overlaid (z-100)
- Phone-input CTA at bottom: country picker + "Try Now" button → links to demo

## Marquees (CSS only)
```css
@keyframes marquee {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}
.animate-marquee { animation: marquee 12s linear infinite; }
```
Used in:
- TL.DR Featured-In logo strip
- WhiteGlove DAY timeline
- Integrations chips
- Across-Lifecycle pills

## Tabs
- OmniChannel: 5 vertical tabs with image preview on right; click switches active tab and image fades.
- IndustryUseCases: 5 horizontal tabs (Real Estate active by default)
- Lifecycle: 4 stages with auto-switch or click

## Hover
- Footer link: `hover:translate-x-[8px] hover:text-[#3655E8] duration-300`
- Buttons primary: `hover:bg-primary/90`
- Cards: most have subtle elevation/translate on hover

## Responsive breakpoints (Tailwind defaults)
- sm: 640
- md: 768
- lg: 1024
- xl: 1280

## Per-viewport notes
- Mobile (390): single-column stack, header turns white, marquees still run
- Tablet (768): 2-col card layouts, hero image scales down
- Desktop (1440): full layout

## Things to skip / simplify for the clone
- Lottie line animation in hero — replace with static SVG / CSS gradient; the page works fine without it
- intl-tel-input country picker — use a simple "+91" prefix display (functionality not in scope per defaults)
- Sheet/drawer mobile nav — implement basic hamburger drawer using shadcn Sheet
