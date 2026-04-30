import { mkdir, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { Buffer } from "node:buffer";

const ROOT = path.resolve(import.meta.dirname, "..");
const TARGET_DIR = path.join(ROOT, "public", "callers");

const MAX_PARALLEL = 6;

const ASSETS = [
  // ---- Hero / icons ----
  { url: "https://www.callers.ai/images/phone2-icon.svg", out: "icons/phone2.svg" },
  { url: "https://www.callers.ai/images/slider-arrow.svg", out: "icons/slider-arrow.svg" },
  { url: "https://www.callers.ai/images/check.svg", out: "icons/check.svg" },
  { url: "https://www.callers.ai/images/check-icon.svg", out: "icons/check-icon.svg" },
  { url: "https://www.callers.ai/images/plus.svg", out: "icons/plus.svg" },
  { url: "https://www.callers.ai/images/phone-x.svg", out: "icons/phone-x.svg" },
  { url: "https://www.callers.ai/images/login-icon.svg", out: "icons/login.svg" },
  { url: "https://www.callers.ai/images/linkedin-icon.svg", out: "icons/linkedin.svg" },
  { url: "https://www.callers.ai/images/youtube-icon.svg", out: "icons/youtube.svg" },
  { url: "https://www.callers.ai/images/check-it-out.svg", out: "icons/check-it-out.svg" },
  { url: "https://www.callers.ai/images/arrow-green.svg", out: "icons/arrow-green.svg" },
  { url: "https://www.callers.ai/images/union.svg", out: "icons/union.svg" },
  { url: "https://www.callers.ai/images/union-share.svg", out: "icons/union-share.svg" },
  { url: "https://www.callers.ai/images/caller-ai-img.svg", out: "icons/caller-ai-img.svg" },
  { url: "https://www.callers.ai/images/connection.svg", out: "icons/connection.svg" },
  { url: "https://www.callers.ai/images/AnalyseLabel.svg", out: "icons/analyse-label.svg" },
  { url: "https://www.callers.ai/images/user.svg", out: "icons/user.svg" },
  { url: "https://www.callers.ai/images/mid-call-actions.svg", out: "icons/mid-call-actions.svg" },
  { url: "https://www.callers.ai/images/integrations/trigger.svg", out: "icons/trigger.svg" },
  { url: "https://www.callers.ai/images/integrations/connect.svg", out: "icons/connect.svg" },
  { url: "https://www.callers.ai/images/sections/how-it-works/call&text.svg", out: "icons/call-and-text.svg" },
  { url: "https://www.callers.ai/images/misc/check-it-out.svg", out: "icons/misc-check-it-out.svg" },

  // ---- Compliance logos ----
  { url: "https://www.callers.ai/images/soc2-logo.svg", out: "compliance/soc2.svg" },
  { url: "https://www.callers.ai/images/hipaa-logo.svg", out: "compliance/hipaa.svg" },
  { url: "https://www.callers.ai/images/gdpr-logo.svg", out: "compliance/gdpr.svg" },
  { url: "https://www.callers.ai/images/dss-logo.svg", out: "compliance/dss.svg" },
  { url: "https://www.callers.ai/images/ccpa-logo.svg", out: "compliance/ccpa.svg" },

  // ---- Testimonial backgrounds ----
  { url: "https://www.callers.ai/images/testimonials-left.png", out: "testimonials/bg-left.png" },
  { url: "https://www.callers.ai/images/testimonials-right.png", out: "testimonials/bg-right.png" },

  // ---- Hero ----
  { url: "https://a.storyblok.com/f/336825/274x552/5df6b5051e/iphone.svg", out: "hero/iphone-desktop.svg" },
  { url: "https://a.storyblok.com/f/336825/269x277/b592f8a2f8/iphone-15.svg", out: "hero/iphone-mobile.svg" },

  // ---- Use case icons (header dropdowns + badges) ----
  { url: "https://a.storyblok.com/f/336825/24x24/3061f94e2b/proicons_call.svg", out: "use-cases/ai-call-center.svg" },
  { url: "https://a.storyblok.com/f/336825/68x64/611cfdc264/cold-call-icon.svg", out: "use-cases/cold-calling.svg" },
  { url: "https://a.storyblok.com/f/336825/14x14/35dbcecb52/inbound_support.svg", out: "use-cases/inbound-support.svg" },
  { url: "https://a.storyblok.com/f/336825/16x17/29b58d8838/building-07.svg", out: "use-cases/lead-qualification.svg" },
  { url: "https://a.storyblok.com/f/336825/16x17/c7f4121bff/headphones-01.svg", out: "use-cases/appointment-confirmation.svg" },
  { url: "https://a.storyblok.com/f/336825/16x17/0b2ab71f1d/gaming-pad-01.svg", out: "use-cases/gaming.svg" },
  { url: "https://a.storyblok.com/f/336825/68x64/136bb91dfa/retention-icon.svg", out: "use-cases/retention.svg" },
  { url: "https://a.storyblok.com/f/336825/68x64/d5b5954d7b/welcome-icon-2.svg", out: "use-cases/welcome.svg" },
  { url: "https://a.storyblok.com/f/336825/20x20/e38231fab5/insurance-3.svg", out: "use-cases/insurance.svg" },
  { url: "https://a.storyblok.com/f/336825/20x20/a13643be2e/material-symbols-light_money-bag-outline.svg", out: "use-cases/lending.svg" },
  { url: "https://a.storyblok.com/f/336825/16x17/94f9a4a342/medical-cross.svg", out: "use-cases/healthcare.svg" },
  { url: "https://a.storyblok.com/f/336825/24x24/e30065d2a9/material-symbols-light_business-center-outline-rounded.svg", out: "use-cases/b2c.svg" },

  // ---- Featured-In customer/brand logos ----
  { url: "https://a.storyblok.com/f/336825/96x48/521b5cef82/vgm-logo.svg", out: "logos/vgm.svg" },
  { url: "https://a.storyblok.com/f/336825/123x52/b898e3afdb/the-first-group.svg", out: "logos/the-first-group.svg" },
  { url: "https://a.storyblok.com/f/336825/122x27/79aa79f008/next-cost-venture.svg", out: "logos/next-cost-venture.svg" },
  { url: "https://a.storyblok.com/f/336825/120x30/dd2d1d7063/einride-logo-1.png", out: "logos/einride.png" },
  { url: "https://a.storyblok.com/f/336825/104x104/b09da995c2/silver_social_games_logo.svg", out: "logos/silver-social-games.svg" },
  { url: "https://a.storyblok.com/f/336825/480x142/eaaf77ae36/nobelbiz-logo-ver.svg", out: "logos/nobelbiz.svg" },
  { url: "https://a.storyblok.com/f/336825/159x19/03d4bd18a0/doordash-logo.svg", out: "logos/doordash.svg" },
  { url: "https://a.storyblok.com/f/336825/116x30/b1b82afa20/credit-cube.svg", out: "logos/credit-cube.svg" },
  { url: "https://a.storyblok.com/f/336825/170x30/e9ccafddeb/ilending.svg", out: "logos/ilending.svg" },
  { url: "https://a.storyblok.com/f/336825/162x30/af78aee1f4/padsplit-logo.png", out: "logos/padsplit.png" },
  { url: "https://a.storyblok.com/f/336825/170x50/467e0646e9/armour-logo-black-and-white.svg", out: "logos/armour.svg" },
  { url: "https://a.storyblok.com/f/336825/193x79/bede773407/kodiak-logo.svg", out: "logos/kodiak.svg" },

  // ---- Press / Featured-In ----
  { url: "https://a.storyblok.com/f/336825/24x24/7d3db035f2/iconamoon_news-light.svg", out: "icons/news.svg" },
  { url: "https://a.storyblok.com/f/336825/1200x274/69b0435550/google-cloud-logo.svg", out: "press/google-cloud.svg" },
  { url: "https://a.storyblok.com/f/336825/94x30/0b9585a468/tbi-versus-1.svg", out: "press/business-insider.svg" },
  { url: "https://a.storyblok.com/f/336825/119x31/5a64d903cb/ent_logo_uk_black_copy.svg", out: "press/uk-entrepreneur.svg" },
  { url: "https://a.storyblok.com/f/336825/118x30/272c9f465f/layer_1.svg", out: "press/ceo-weekly.svg" },
  { url: "https://a.storyblok.com/f/336825/90x33/a5f0fd9397/image-1436.svg", out: "press/yahoo-finance.svg" },
  { url: "https://a.storyblok.com/f/336825/34x40/dc3dec1f4b/group-1410104050.svg", out: "press/ap.svg" },
  { url: "https://a.storyblok.com/f/336825/104x28/b8741dc125/10_news_logo-1.svg", out: "press/channel-10.svg" },

  // ---- Section icons (header pills) ----
  { url: "https://a.storyblok.com/f/336825/24x24/a87ed5f4b5/si_lightning-line.svg", out: "section-icons/lightning.svg" },
  { url: "https://a.storyblok.com/f/336825/26x26/f8d18f4975/material-symbols-light_handshake-outline.svg", out: "section-icons/handshake.svg" },
  { url: "https://a.storyblok.com/f/336825/20x20/370e5010a9/flow-horizontal.svg", out: "section-icons/flow-horizontal.svg" },
  { url: "https://a.storyblok.com/f/336825/24x24/91fd340aa6/uil_statistics.svg", out: "section-icons/statistics.svg" },
  { url: "https://a.storyblok.com/f/336825/20x20/f5af9fc2cf/connect.svg", out: "section-icons/connect.svg" },
  { url: "https://a.storyblok.com/f/336825/24x24/ae860e4860/fluent_arrow-growth-24-regular.svg", out: "section-icons/arrow-growth.svg" },
  { url: "https://a.storyblok.com/f/336825/24x24/bebf786d13/solar_global-linear.svg", out: "section-icons/global.svg" },
  { url: "https://a.storyblok.com/f/336825/24x24/b9a6b876c2/material-symbols-light_handshake-outline.svg", out: "section-icons/handshake-md.svg" },
  { url: "https://a.storyblok.com/f/336825/24x24/c3ff05cf6a/mingcute_crystal-ball-line.svg", out: "section-icons/crystal-ball.svg" },
  { url: "https://a.storyblok.com/f/336825/28x26/98deb0b5c9/hugeicons_ai-brain-01.svg", out: "section-icons/ai-brain.svg" },
  { url: "https://a.storyblok.com/f/336825/111x96/c787318a5c/hugeicons_ai-brain-01.png", out: "section-icons/ai-brain-large.png" },

  // ---- Route every customer moment background image ----
  { url: "https://a.storyblok.com/f/336825/1203x644/8ac2245477/bg-min.png", out: "route-moments/bg.png" },

  // ---- Omni-channel tab graphics ----
  { url: "https://a.storyblok.com/f/336825/1116x1344/645eb94a5e/multiligual-agent.png", out: "omni/multilingual.png" },
  { url: "https://a.storyblok.com/f/336825/1116x1344/83f7df5e54/omni-channel.png", out: "omni/omni-channel.png" },
  { url: "https://a.storyblok.com/f/336825/1116x1344/1144bd7274/white-glove-care.png", out: "omni/white-glove-care.png" },
  { url: "https://a.storyblok.com/f/336825/1116x1344/b4056a6e87/native-integrations.png", out: "omni/native-integrations.png" },
  { url: "https://a.storyblok.com/f/336825/1116x1344/4544234136/1white-glove-care.png", out: "omni/insights-mode.png" },
  { url: "https://a.storyblok.com/f/336825/948x606/002a186dcd/omni-channel-2.png", out: "omni/preview-omni.png" },
  { url: "https://a.storyblok.com/f/336825/948x606/569df32094/native-integrations-2.png", out: "omni/preview-native.png" },
  { url: "https://a.storyblok.com/f/336825/948x606/138a8fdab8/scalable-power-2.png", out: "omni/preview-multilingual.png" },
  { url: "https://a.storyblok.com/f/336825/948x606/418171b811/white-glove-care-2.png", out: "omni/preview-white-glove.png" },
  { url: "https://a.storyblok.com/f/336825/948x606/0efd49b8dc/insights-mode-2.png", out: "omni/preview-insights.png" },
  { url: "https://a.storyblok.com/f/336825/902x800/fe1fd7ea5a/omnichannel-heart-website.png", out: "omni/heart-image.png" },
  { url: "https://a.storyblok.com/f/336825/937x831/066b6ba085/frame-2087326152.png", out: "omni/heart-mobile.png" },

  // ---- Testimonials ----
  { url: "https://a.storyblok.com/f/336825/107x36/0b1e431f82/tonny-robins.svg", out: "testimonials/robbins-research.svg" },
  { url: "https://a.storyblok.com/f/336825/150x150/49e30bec26/justin-kahn.png", out: "testimonials/justin-kahn.png" },
  { url: "https://a.storyblok.com/f/336825/157x36/f69704d297/pad-split-svg.svg", out: "testimonials/padsplit.svg" },
  { url: "https://a.storyblok.com/f/336825/385x400/16caa54b73/frame-2087326715.png", out: "testimonials/ben-frasher.png" },
  { url: "https://a.storyblok.com/f/336825/120x36/19246ca090/einride-logo.svg", out: "testimonials/einride.svg" },
  { url: "https://a.storyblok.com/f/336825/150x150/5e471e5448/chelsea-thompson.png", out: "testimonials/chelsea-thompson.png" },
  { url: "https://a.storyblok.com/f/336825/157x36/62417bde1a/armour-svg.svg", out: "testimonials/armour.svg" },
  { url: "https://a.storyblok.com/f/336825/150x150/2130dd2ac7/rob-stevenson.png", out: "testimonials/rob-stevenson.png" },
  { url: "https://a.storyblok.com/f/336825/150x150/220ed60c8a/maria-gomez.png", out: "testimonials/maria-gomez.png" },

  // ---- Lifecycle stages ----
  { url: "https://a.storyblok.com/f/336825/409x249/cc623f53b5/prospects-and-leads.png", out: "lifecycle/prospects-and-leads.png" },
  { url: "https://a.storyblok.com/f/336825/982x598/123947ee4d/new-customer.png", out: "lifecycle/new-customer.png" },
  { url: "https://a.storyblok.com/f/336825/409x249/af33cea5c7/active-loyal-users.png", out: "lifecycle/active-and-loyal.png" },
  { url: "https://a.storyblok.com/f/336825/409x249/394f8b8d81/churn-risk-win-back.png", out: "lifecycle/churn-risk.png" },

  // ---- How it works integration icons ----
  { url: "https://a.storyblok.com/f/336825/16x16/1cd2862772/salesforce.svg", out: "integrations/salesforce.svg" },
  { url: "https://a.storyblok.com/f/336825/16x16/6942e18a6e/ticket.svg", out: "integrations/ticket.svg" },
  { url: "https://a.storyblok.com/f/336825/24x25/13e0d8260d/google.svg", out: "integrations/google.svg" },
  { url: "https://a.storyblok.com/f/336825/24x24/2756df0bd6/stripe.svg", out: "integrations/stripe.svg" },
  { url: "https://a.storyblok.com/f/336825/16x16/d183996c5a/woo.svg", out: "integrations/woo.svg" },
  { url: "https://a.storyblok.com/f/336825/16x16/5881d9d60a/sperse.svg", out: "integrations/sperse.svg" },
  { url: "https://a.storyblok.com/f/336825/16x16/71024255bb/shopify.svg", out: "integrations/shopify.svg" },
  { url: "https://a.storyblok.com/f/336825/16x16/c04cd1fafe/cal-com.svg", out: "integrations/cal-com.svg" },
  { url: "https://a.storyblok.com/f/336825/16x16/acc6cdc2e9/telegram.svg", out: "integrations/telegram.svg" },
  { url: "https://a.storyblok.com/f/336825/16x16/ac29a03cf8/hubspot.svg", out: "integrations/hubspot.svg" },
  { url: "https://a.storyblok.com/f/336825/16x16/e98e2cdc11/monkey.svg", out: "integrations/monkey.svg" },
  { url: "https://a.storyblok.com/f/336825/16x17/dd632446e4/whatsapp.svg", out: "integrations/whatsapp.svg" },
  { url: "https://a.storyblok.com/f/336825/12x16/8344fa1617/exel.svg", out: "integrations/excel.svg" },
  { url: "https://a.storyblok.com/f/336825/20x20/f63f7d77f6/business.svg", out: "integrations/business.svg" },

  // ---- Integration chips icons ----
  { url: "https://a.storyblok.com/f/336825/500x500/a073ce3ddf/intercom.webp", out: "integrations/intercom.webp" },
  { url: "https://a.storyblok.com/f/336825/500x500/219329f96e/woocommerce.webp", out: "integrations/woocommerce.webp" },
  { url: "https://a.storyblok.com/f/336825/500x500/fca676e564/google-forms.webp", out: "integrations/google-forms.webp" },
  { url: "https://a.storyblok.com/f/336825/500x500/df28baf91e/monday.webp", out: "integrations/monday.webp" },
  { url: "https://a.storyblok.com/f/336825/500x500/98bf922c70/slack.webp", out: "integrations/slack.webp" },

  // ---- Industry use cases ----
  { url: "https://a.storyblok.com/f/336825/24x24/f9d14bb7b1/iconamoon_funnel-thin.svg", out: "industries/funnel.svg" },
  { url: "https://a.storyblok.com/f/336825/24x24/083b32c76a/event.svg", out: "industries/event.svg" },
  { url: "https://a.storyblok.com/f/336825/24x24/3562e61941/streamline-ultimate_headphones-customer-support-question.svg", out: "industries/support.svg" },
  { url: "https://a.storyblok.com/f/336825/598x426/0eab01f501/chatgpt-image-oct-7-2025-04_20_09-pmff-1.png", out: "industries/concierge.png" },

  // ---- Numbers section ----
  { url: "https://a.storyblok.com/f/336825/37x35/df0cfdce40/icon1.svg", out: "numbers/icon-1.svg" },
  { url: "https://a.storyblok.com/f/336825/450x256/e3fffb5634/linkedin-state-of-voice-customer-engagement-7.png", out: "numbers/illu-1.png" },
  { url: "https://a.storyblok.com/f/336825/36x36/56eedd6281/2.svg", out: "numbers/icon-2.svg" },
  { url: "https://a.storyblok.com/f/336825/450x256/8056a0fe3b/linkedin-state-of-voice-customer-engagement-7-1.png", out: "numbers/illu-2.png" },
  { url: "https://a.storyblok.com/f/336825/36x37/e1f72765bf/icon3.svg", out: "numbers/icon-3.svg" },
  { url: "https://a.storyblok.com/f/336825/450x256/bfa34dd87b/linkedin-state-of-voice-customer-engagement-7-2.png", out: "numbers/illu-3.png" },
  { url: "https://a.storyblok.com/f/336825/40x40/4d449a9bb9/icon4.svg", out: "numbers/icon-4.svg" },
  { url: "https://a.storyblok.com/f/336825/450x256/afed665e37/4.png", out: "numbers/illu-4.png" },

  // ---- AI ask section ----
  { url: "https://a.storyblok.com/f/336825/24x24/92944c5acc/hugeicons_chat-gpt.svg", out: "ai-ask/chatgpt.svg" },
  { url: "https://a.storyblok.com/f/336825/24x24/b984957916/claude.svg", out: "ai-ask/claude.svg" },
  { url: "https://a.storyblok.com/f/336825/24x24/48e17d0b52/perplexity.svg", out: "ai-ask/perplexity.svg" },

  // ---- Try It section / agents ----
  { url: "https://a.storyblok.com/f/336825/764x1024/ce01cabc57/adobestock_494817999-1.png/m/filters:format(webp)", out: "try-it/cassie.webp" },
  { url: "https://a.storyblok.com/f/336825/378x505/998378f5ee/paul-website.png/m/filters:format(webp)", out: "try-it/paul.webp" },

  // ---- Favicon / SEO ----
  { url: "https://www.callers.ai/favicon.ico", out: "../seo/favicon.ico" },
  { url: "https://www.callers.ai/images/favicon-192.png", out: "../seo/favicon-192.png" },
];

async function ensureDir(p) {
  if (!existsSync(p)) await mkdir(p, { recursive: true });
}

async function downloadOne({ url, out }) {
  const dest = path.join(TARGET_DIR, out);
  if (existsSync(dest)) return { url, out, skipped: true };
  await ensureDir(path.dirname(dest));
  try {
    const res = await fetch(url, {
      headers: {
        "user-agent": "Mozilla/5.0 (clone-tool)",
        accept: "image/*,*/*",
      },
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const buf = Buffer.from(await res.arrayBuffer());
    await writeFile(dest, buf);
    return { url, out, ok: true, bytes: buf.length };
  } catch (err) {
    return { url, out, error: err.message };
  }
}

async function main() {
  await ensureDir(TARGET_DIR);
  const queue = [...ASSETS];
  const results = [];
  const workers = Array.from({ length: MAX_PARALLEL }, async () => {
    while (queue.length) {
      const job = queue.shift();
      const r = await downloadOne(job);
      results.push(r);
      if (r.error) console.error(`✗ ${job.out} — ${r.error}`);
      else if (r.skipped) console.log(`= ${job.out} (cached)`);
      else console.log(`✓ ${job.out} (${r.bytes} bytes)`);
    }
  });
  await Promise.all(workers);

  const okCount = results.filter((r) => r.ok || r.skipped).length;
  const errCount = results.filter((r) => r.error).length;
  console.log(`\nDone. ${okCount} ok, ${errCount} errors, ${results.length} total`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
