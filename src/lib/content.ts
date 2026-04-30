import type {
  BrandLogo,
  FeatureCard,
  OmniTab,
  DayMilestone,
  Testimonial,
  LifecycleStage,
  IntegrationChip,
  IndustryCase,
  NumberStat,
  FooterColumn,
} from "@/types/content";

export const navUseCases = [
  { label: "AI call center", href: "#", icon: "/callers/use-cases/ai-call-center.svg" },
  { label: "AI Cold Calling", href: "#", icon: "/callers/use-cases/cold-calling.svg" },
  { label: "Inbound Support", href: "#", icon: "/callers/use-cases/inbound-support.svg" },
  { label: "Lead Qualification", href: "#", icon: "/callers/use-cases/lead-qualification.svg" },
  { label: "Appointment & Event Confirmation", href: "#", icon: "/callers/use-cases/appointment-confirmation.svg" },
  { label: "Win-Back & Re-Engage", href: "#", icon: "/callers/use-cases/gaming.svg" },
  { label: "Cancellation & Retention Flows", href: "#", icon: "/callers/use-cases/retention.svg" },
  { label: "Onboarding & Welcome Flows", href: "#", icon: "/callers/use-cases/welcome.svg" },
];

export const navIndustries = [
  { label: "Insurance", href: "#", icon: "/callers/use-cases/insurance.svg" },
  { label: "Lending", href: "#", icon: "/callers/use-cases/lending.svg" },
  { label: "Gaming & Casino", href: "#", icon: "/callers/use-cases/gaming.svg" },
  { label: "Real Estate", href: "#", icon: "/callers/use-cases/lead-qualification.svg" },
  { label: "Healthcare", href: "#", icon: "/callers/use-cases/healthcare.svg" },
];

// ========== TL.DR ==========
export const tldrCards = [
  {
    eyebrow: "1 in 4 Customers",
    title: "leave after just one bad service experience.",
    body: "If you don't pick up, they'll churn. CometLab ensures every voice is heard.",
  },
  {
    eyebrow: "65% Faster Resolution",
    title: "with AI agents handling the routine.",
    body: "Free up your team for the moments that actually matter.",
  },
  {
    eyebrow: "10X More Conversations",
    title: "without expanding your team.",
    body: "Scale outreach, support, and retention without scaling headcount.",
  },
];

export const featuredInLogos: BrandLogo[] = [
  { name: "Google Cloud", src: "/callers/press/google-cloud.svg", width: 1200, height: 274 },
  { name: "Business Insider", src: "/callers/press/business-insider.svg", width: 94, height: 30 },
  { name: "UK Entrepreneur", src: "/callers/press/uk-entrepreneur.svg", width: 119, height: 31 },
  { name: "CEO Weekly", src: "/callers/press/ceo-weekly.svg", width: 118, height: 30 },
  { name: "Yahoo Finance", src: "/callers/press/yahoo-finance.svg", width: 90, height: 33 },
  { name: "AP", src: "/callers/press/ap.svg", width: 34, height: 40 },
  { name: "Channel 10", src: "/callers/press/channel-10.svg", width: 104, height: 28 },
];

export const customerLogos: BrandLogo[] = [
  { name: "VGM", src: "/callers/logos/vgm.svg", width: 96, height: 48 },
  { name: "The First Group", src: "/callers/logos/the-first-group.svg", width: 123, height: 52 },
  { name: "Next Cost Venture", src: "/callers/logos/next-cost-venture.svg", width: 122, height: 27 },
  { name: "Einride", src: "/callers/logos/einride.png", width: 120, height: 30 },
  { name: "Silver Social Games", src: "/callers/logos/silver-social-games.svg", width: 104, height: 104 },
  { name: "NobelBiz", src: "/callers/logos/nobelbiz.svg", width: 480, height: 142 },
  { name: "DoorDash", src: "/callers/logos/doordash.svg", width: 159, height: 19 },
  { name: "Credit Cube", src: "/callers/logos/credit-cube.svg", width: 116, height: 30 },
  { name: "iLending", src: "/callers/logos/ilending.svg", width: 170, height: 30 },
  { name: "PadSplit", src: "/callers/logos/padsplit.png", width: 162, height: 30 },
  { name: "Armour", src: "/callers/logos/armour.svg", width: 170, height: 50 },
  { name: "Kodiak", src: "/callers/logos/kodiak.svg", width: 193, height: 79 },
];

// ========== Route every customer moment ==========
export const routeFeatureCards: FeatureCard[] = [
  {
    iconSrc: "/callers/use-cases/ai-call-center.svg",
    title: "Human time where it matters",
    description:
      "CometLab keeps your teams on the moments where judgment and presence actually change the outcome, not on routine questions and follow‑ups.",
  },
  {
    iconSrc: "/callers/section-icons/handshake.svg",
    title: "Coverage across the whole lifecycle",
    description:
      "From first outreach to win‑back, CometLab handles simple questions, checks, nudges, and outreach across every stage of the customer journey.",
  },
  {
    iconSrc: "/callers/section-icons/ai-brain.svg",
    title: "AI that feels human, not robotic",
    description:
      "Calls and messages are handled the way a good human would, so customers get quick, natural responses without feeling the AI underneath.",
  },
  {
    iconSrc: "/callers/section-icons/connect.svg",
    title: "Built into your existing stack",
    description:
      "CometLab plugs into the systems you already run, answering, qualifying, re‑engaging, and routing through your current tools in seconds.",
  },
  {
    iconSrc: "/callers/section-icons/flow-horizontal.svg",
    title: "Clear routing between AI and people",
    description:
      "Simple work goes to CometLab, high‑stakes moments go to your team—so customer work is always routed to the right place.",
  },
];

// ========== Omni-channel tabs ==========
export const omniTabs: OmniTab[] = [
  {
    id: "omni",
    iconSrc: "/callers/section-icons/ai-brain.svg",
    label: "Omni-channel",
    heading: "CometLab unifies your conversations",
    body:
      "One central brain orchestrates human-grade conversations across voice, SMS, WhatsApp, and Telegram. Customers never repeat themselves. Context never dies. Your brand speaks with one voice, everywhere.",
    bullets: [
      "One brain for every channel",
      "Shared memory across calls, SMS, and chat",
      "Consistent tone, no matter where they show up",
      "Instant responses that still feel human",
    ],
    imageSrc: "/callers/omni/preview-omni.png",
    imageAlt: "Omni-channel preview",
  },
  {
    id: "native",
    iconSrc: "/callers/section-icons/connect.svg",
    label: "Native integrations",
    heading: "No fumbling for answers, just spot-on conversations",
    body:
      "Your customer data is GOLD. CometLab treats it that way. We plug into your CRM and 300+ tools, using live data for spot-on, personalized conversations.",
    bullets: [
      "Live data from your CRM, support, and billing tools",
      "Personalized conversations every time",
      "Automatic context handoff to your team",
      "300+ supported integrations",
    ],
    imageSrc: "/callers/omni/preview-native.png",
    imageAlt: "Native integrations preview",
  },
  {
    id: "multilingual",
    iconSrc: "/callers/section-icons/global.svg",
    label: "Multilingual Agent",
    heading: "78+ languages and regional dialects",
    body:
      "The AI voice agent detects the caller's language in real time and switches automatically. No language barriers. Just natural conversations at scale.",
    bullets: [
      "Real-time language detection",
      "78+ languages and dialects",
      "Native-sounding pronunciation",
      "Seamless mid-call switching",
    ],
    imageSrc: "/callers/omni/preview-multilingual.png",
    imageAlt: "Multilingual agent preview",
  },
  {
    id: "white-glove",
    iconSrc: "/callers/section-icons/handshake.svg",
    label: "White-glove care",
    heading: "All taken care of, every single day",
    body:
      "Imagine having an AI voice expert on speed dial. That's us. We build and fine tune everything for you. Your brand tone. Your goals. Your peace of mind.",
    bullets: [
      "Dedicated CSM and prompt engineer",
      "Weekly insights review",
      "Continuous tuning and optimization",
      "Done-for-you onboarding",
    ],
    imageSrc: "/callers/omni/preview-white-glove.png",
    imageAlt: "White-glove care preview",
  },
  {
    id: "insights",
    iconSrc: "/callers/section-icons/crystal-ball.svg",
    label: "Insights mode",
    heading: "Like a crystal ball for your business.",
    body:
      "Want to know what your customers really say and think? Our insights show you everything. Sentiment. Questions. Where calls drop off.",
    bullets: [
      "Real-time sentiment analysis",
      "Most-asked questions surfaced",
      "Drop-off heatmaps",
      "Conversion intelligence",
    ],
    imageSrc: "/callers/omni/preview-insights.png",
    imageAlt: "Insights mode preview",
  },
];

// ========== White-glove timeline + testimonials ==========
export const dayMilestones: DayMilestone[] = [
  { day: "DAY 1", label: "CSM kickoff" },
  { day: "DAY 3", label: "Scripts live" },
  { day: "DAY 7", label: "Weekly Insights review" },
  { day: "DAY 10", label: "10X calls with 3X ROI" },
  { day: "DAY 14", label: "Optimized & Scaling Meeting" },
];

export const testimonials: Testimonial[] = [
  {
    quote:
      "CometLab cut our call center load by 65% and 10X our outreach with significantly better results.",
    authorName: "Justin Kahn",
    authorRole: "Head of Digital Innovation",
    companyLogoSrc: "/callers/testimonials/robbins-research.svg",
    authorAvatarSrc: "/callers/testimonials/justin-kahn.png",
  },
  {
    quote:
      "Agents hated outbound. Now they talk to people who want to talk. Morale is up.",
    authorName: "Ben Frasher",
    authorRole: "Director of Acquisition & Growth",
    companyLogoSrc: "/callers/testimonials/padsplit.svg",
    authorAvatarSrc: "/callers/testimonials/ben-frasher.png",
  },
  {
    quote:
      "We were up and running faster than expected and started seeing measurable results within the first week.",
    authorName: "Chelsea Thompson",
    authorRole: "Director of Operations",
    companyLogoSrc: "/callers/testimonials/einride.svg",
    authorAvatarSrc: "/callers/testimonials/chelsea-thompson.png",
  },
  {
    quote:
      "CometLab reduced outbound time by 46% and accelerated inbound demand leading us to expand our sales team.",
    authorName: "Rob Stevenson",
    authorRole: "Vice President",
    companyLogoSrc: "/callers/testimonials/armour.svg",
    authorAvatarSrc: "/callers/testimonials/rob-stevenson.png",
  },
  {
    quote: "We increased the number of qualified appointments by engaging prospects faster.",
    authorName: "Maria Gomez",
    authorRole: "System Administrator",
    authorAvatarSrc: "/callers/testimonials/maria-gomez.png",
  },
];

// ========== Lifecycle ==========
export const lifecycleStages: LifecycleStage[] = [
  {
    id: "prospect",
    title: "Prospect and Leads",
    description: "Capture and qualify leads the moment they show interest.",
    imageSrc: "/callers/lifecycle/prospects-and-leads.png",
    bgClassName: "bg-[#FFF6F0]",
  },
  {
    id: "new-customer",
    title: "New Customer",
    description: "Onboard with a warm, branded welcome that activates faster.",
    imageSrc: "/callers/lifecycle/new-customer.png",
    bgClassName: "bg-[#F0F4FF]",
  },
  {
    id: "active",
    title: "Active and Loyal Users",
    description: "Stay top of mind with renewals, upsells, and helpful nudges.",
    imageSrc: "/callers/lifecycle/active-and-loyal.png",
    bgClassName: "bg-[#F1FFEE]",
  },
  {
    id: "churn",
    title: "Churn Risk and Win Back",
    description: "Re-engage at the moment of risk and bring customers back.",
    imageSrc: "/callers/lifecycle/churn-risk.png",
    bgClassName: "bg-[#FFF1F2]",
  },
];

// ========== Integrations chips ==========
export const integrationChips: IntegrationChip[] = [
  { iconSrc: "/callers/integrations/woocommerce.webp", label: "Abandoned cart" },
  { iconSrc: "/callers/integrations/stripe.svg", label: "Missed payment" },
  { iconSrc: "/callers/integrations/intercom.webp", label: "New Ticket Issued" },
  { iconSrc: "/callers/integrations/woocommerce.webp", label: "Abandoned Cart" },
  { iconSrc: "/callers/integrations/salesforce.svg", label: "New lead created" },
  { iconSrc: "/callers/integrations/shopify.svg", label: "Order Shipped" },
  { iconSrc: "/callers/integrations/google-forms.webp", label: "Form submitted" },
  { iconSrc: "/callers/integrations/google.svg", label: "Post Call Email Sent" },
  { iconSrc: "/callers/integrations/business.svg", label: "Record updated" },
  { iconSrc: "/callers/integrations/monday.webp", label: "Task Created for Implementation Team" },
  { iconSrc: "/callers/integrations/whatsapp.svg", label: "10% Off Message Sent" },
  { iconSrc: "/callers/integrations/hubspot.svg", label: "Opportunity created" },
  { iconSrc: "/callers/integrations/excel.svg", label: "Tracking Link Sent" },
  { iconSrc: "/callers/integrations/slack.webp", label: "Notification Sent" },
];

// ========== Industry use cases ==========
export const industries: IndustryCase[] = [
  {
    id: "real-estate",
    label: "Real Estate",
    iconSrc: "/callers/use-cases/lead-qualification.svg",
    popularUseCases: ["Lead Qualification", "Appointment Confirmation", "Support"],
    stats: [
      { value: "400%", label: "in CVR" },
      { value: "25–35%", label: "in show-up rate" },
    ],
    videoTitle: "Your Always-On Property Concierge",
    videoDuration: "01:53",
  },
  {
    id: "gaming",
    label: "Gaming & Casinos",
    iconSrc: "/callers/use-cases/gaming.svg",
    popularUseCases: ["Player Re-engagement", "Reward Notifications", "Support"],
    stats: [
      { value: "3X", label: "in player retention" },
      { value: "60%", label: "automation rate" },
    ],
    videoTitle: "Player Concierge in Action",
    videoDuration: "01:53",
  },
  {
    id: "healthcare",
    label: "Healthcare",
    iconSrc: "/callers/use-cases/healthcare.svg",
    popularUseCases: ["Appointment Booking", "Reminders", "Patient Support"],
    stats: [
      { value: "70%", label: "fewer no-shows" },
      { value: "24/7", label: "patient coverage" },
    ],
    videoTitle: "Always-On Patient Concierge",
    videoDuration: "01:53",
  },
  {
    id: "lending",
    label: "Lending & Finance",
    iconSrc: "/callers/use-cases/lending.svg",
    popularUseCases: ["Application Follow-ups", "Payment Reminders", "Support"],
    stats: [
      { value: "2X", label: "in collections" },
      { value: "85%", label: "automation rate" },
    ],
    videoTitle: "Loan Officer on Speed Dial",
    videoDuration: "01:53",
  },
  {
    id: "transport",
    label: "Transportation & Logistics",
    iconSrc: "/callers/use-cases/ai-call-center.svg",
    popularUseCases: ["Driver Outreach", "Dispatch Updates", "Support"],
    stats: [
      { value: "5X", label: "in driver pickup" },
      { value: "40%", label: "faster dispatch" },
    ],
    videoTitle: "Logistics Concierge in Action",
    videoDuration: "01:53",
  },
];

// ========== Numbers ==========
export const numberStats: NumberStat[] = [
  {
    iconSrc: "/callers/numbers/icon-1.svg",
    value: "73%",
    title: "of Customers Prefer Voice!",
    body: "Most customers love voice, so you connect better and win more trust. Get the edge.",
    illustrationSrc: "/callers/numbers/illu-1.png",
  },
  {
    iconSrc: "/callers/numbers/icon-2.svg",
    value: "Answer in Under 10 Seconds,",
    title: "Boost Conversions by 400%!",
    body: "Fast responses mean more deals! Jump on calls quickly and watch your conversions soar.",
    illustrationSrc: "/callers/numbers/illu-2.png",
  },
  {
    iconSrc: "/callers/numbers/icon-3.svg",
    value: "90+ NPS",
    title: "with AI Agents vs. 70 for Humans",
    body: "Consistency builds loyalty. Our AI agents deliver top-notch trust, outshining human scores!",
    illustrationSrc: "/callers/numbers/illu-3.png",
  },
  {
    iconSrc: "/callers/numbers/icon-4.svg",
    value: "95%",
    title: "of Your Routine Inquiries Can Be Automated!",
    body: "Drowning in boring calls? 95% of your routine inquiries can be automated. Our AI handles the busy work. Free up your team for what really matters.",
    illustrationSrc: "/callers/numbers/illu-4.png",
  },
];

// ========== Footer ==========
export const footerColumns: FooterColumn[] = [
  {
    title: "Use Cases",
    links: [
      { label: "AI call center", href: "#" },
      { label: "AI Cold Calling", href: "#" },
      { label: "Inbound Support", href: "#" },
      { label: "Lead Qualification", href: "#" },
      { label: "Appointment & Event Confirmation", href: "#" },
      { label: "Win-Back & Re-Engage", href: "#" },
      { label: "Cancellation & Retention Flows", href: "#" },
      { label: "Onboarding & Welcome Flows", href: "#" },
    ],
  },
  {
    title: "Industries",
    links: [
      { label: "Insurance", href: "#" },
      { label: "Lending", href: "#" },
      { label: "Gaming & Casino", href: "#" },
      { label: "Real Estate", href: "#" },
      { label: "Healthcare", href: "#" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Customers Stories", href: "#" },
      { label: "Integrations", href: "#" },
      { label: "Blog", href: "#" },
      { label: "Cookie Policy", href: "#" },
      { label: "Knowledge Base", href: "#" },
    ],
  },
];

export const complianceLogos = [
  { name: "SOC 2 Compliant", src: "/callers/compliance/soc2.svg", width: 61, height: 61 },
  { name: "HIPAA Compliant", src: "/callers/compliance/hipaa.svg", width: 87, height: 61 },
  { name: "GDPR Compliant", src: "/callers/compliance/gdpr.svg", width: 61, height: 61 },
  { name: "DSS Compliant", src: "/callers/compliance/dss.svg", width: 61, height: 61 },
  { name: "CCPA Compliant", src: "/callers/compliance/ccpa.svg", width: 61, height: 61 },
];

// ========== Pre/Mid/Post call columns (HowItWorks) ==========
export const preCallTriggers = [
  { icon: "/callers/integrations/salesforce.svg", label: "New lead captured" },
  { icon: "/callers/integrations/ticket.svg", label: "Ticket opened" },
  { icon: "/callers/integrations/stripe.svg", label: "New Subscription" },
  { icon: "/callers/integrations/shopify.svg", label: "New Abandoned Checkout" },
];

export const midCallActions = [
  { icon: "/callers/integrations/google.svg", label: "Get Fulfillment Status" },
  { icon: "/callers/integrations/business.svg", label: "Run Query Status" },
  { icon: "/callers/integrations/cal-com.svg", label: "Schedule a Call" },
];

export const postCallActions = [
  { icon: "/callers/integrations/hubspot.svg", label: "Add contact To List" },
  { icon: "/callers/integrations/whatsapp.svg", label: "Send a summary message" },
  { icon: "/callers/integrations/excel.svg", label: "Update Row" },
];
