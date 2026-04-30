export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export interface BrandLogo {
  name: string;
  src: string;
  width: number;
  height: number;
}

export interface FeatureCard {
  iconSrc: string;
  title: string;
  description: string;
}

export interface OmniTab {
  id: string;
  iconSrc: string;
  label: string;
  heading: string;
  body: string;
  bullets: string[];
  imageSrc: string;
  imageAlt: string;
}

export interface DayMilestone {
  day: string;
  label: string;
}

export interface Testimonial {
  quote: string;
  authorName: string;
  authorRole: string;
  companyLogoSrc?: string;
  authorAvatarSrc?: string;
}

export interface LifecycleStage {
  id: string;
  title: string;
  description?: string;
  imageSrc: string;
  bgClassName?: string;
}

export interface IntegrationChip {
  iconSrc: string;
  label: string;
}

export interface IndustryCase {
  id: string;
  label: string;
  iconSrc: string;
  popularUseCases: string[];
  stats?: { value: string; label: string }[];
  videoTitle?: string;
  videoDuration?: string;
}

export interface NumberStat {
  iconSrc: string;
  value: string;
  title: string;
  body: string;
  illustrationSrc?: string;
}

export interface FooterColumn {
  title: string;
  links: { label: string; href: string }[];
}
