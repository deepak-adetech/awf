# Callers.ai — Page Topology

Source: https://www.callers.ai/
Document height (1440px viewport): 11972px
Sections: 14 + fixed header + footer

## Layout fundamentals
- Body width: 1440px (matches viewport in extraction)
- Body font: `inter` (Inter via next/font with Geist fallback chain present in baseline)
- Background: white (#fff / oklch(1 0 0))
- Foreground: oklch(14.5% 0 0)
- Brand blue: `#3655E8`
- Dark/charcoal: `#1E1E1E`, `#040A27`
- Container: max-w-1394 on lg, with horizontal padding `dynamic-section-padding`
- Border radius pattern: 25px (cards/sections), 12px (buttons), 50px (footer top)

## Order of sections (top-to-bottom)

| # | Component name | Top | Height | Notes |
|---|---|---|---|---|
| H | `Header` | 0 | 97 | fixed, z-1000, transparent on md+, white on mobile |
| 1 | `HeroSection` | 0 | 812 | Lottie line animation bg + iPhone visual right; phone-input CTA |
| 2 | `TldrSection` | 847 | 546 | "TL.DR" + 3 stat cards + Featured-In logo strip (marquee) |
| 3 | `JourneyEngineSection` | 1393 | 1140 | "See it in Action — customer journey engine" with iPhone showcase |
| 4 | `RouteMomentSection` | 2533 | 893 | 4 feature cards "Route every customer moment to the right place" |
| 5 | `OmniChannelSection` | 3426 | 838 | Tabbed: Omni-channel / Native integrations / Multilingual / White-glove / Insights, with image showcase |
| 6 | `WhiteGloveSection` | 4264 | 1070 | "We do the setup" + DAY 1/3/7/10/14 timeline marquee + 3 testimonials |
| 7 | `LifecycleSection` | 5334 | 918 | "Across the Customer Lifecycle" — 4 columns with images |
| 8 | `HowItWorksSection` | 6252 | 904 | "Turn every signal into action" — Pre/Mid/Post call panels with bg image |
| 9 | `IndustryUseCasesSection` | 7156 | 863 | Tabbed industries (Real Estate, Gaming, Healthcare, Lending, Transport) |
| 10 | `IntegrationsSection` | 8019 | 854 | "610+ Native Integrations" — flowing chips |
| 11 | `NumbersSection` | 8873 | 726 | "Callers In Numbers" — 4 stat cards |
| 12 | `AiAskSection` | 9599 | 368 | "Still not sure?" — Ask ChatGPT / Claude / Perplexity |
| 13 | `TryItSection` | 9967 | 810 | "C'mon, make that call!" — Cassie / Paul AI agent cards with phone input |
| F | `Footer` | 10776 | 1196 | Use Cases / Industries / Resources columns + compliance logos |

## Z-index layers
- Header: z-1000 (fixed)
- Hero blue panel rounded-bl: z-1
- Hero phone image: z-100
- Lottie animation: behind everything

## Fixed/sticky overlays
- Only the header is fixed.
- Footer has `rounded-b-[50px]` on its inner white card.

## Interaction model summary (per section)
- Hero — static; Lottie loop in background; phone input field
- TL.DR — static; logo strip is **marquee** (CSS keyframe `--animate-marquee: marquee 12s linear infinite`)
- Journey Engine — likely **carousel/swiper** of phone screen (Swiper present per `--swiper-theme-color`)
- RouteMoment — static cards, hover state
- OmniChannel — **tab/click-driven** (4-5 tabs cycling content with `--animate-tabs: animate-tabs .6s cubic-bezier...`)
- WhiteGlove — DAY timeline is **marquee**; testimonial card cluster is static
- Lifecycle — **tabbed** with click switching; each tab shows a different image
- HowItWorks — static columns over background image; small SVG composition graphics
- IndustryUseCases — **tab-driven** (Real Estate / Gaming / Healthcare / Lending / Transport)
- Integrations — **marquee chips** (animation visible)
- Numbers — static stat cards
- AiAsk — static buttons that link out
- TryIt — phone input forms, Cassie + Paul cards

## Page-level wrapper
- Outer: `<div class="overflow-hidden">` wraps all sections (ensures marquees don't cause horizontal scroll)
- No Lenis/Locomotive smooth scroll detected
