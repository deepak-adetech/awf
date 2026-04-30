import { cn } from "@/lib/utils";

interface IconProps extends React.SVGAttributes<SVGElement> {
  className?: string;
}

/**
 * MantleAI wordmark — "Mantle" wordmark + small "AI" superscript badge.
 * viewBox aspect ratio (140:31) matches the original site's logo so it renders
 * at the same visual height when sized to width 140px.
 */
export function BrandLogo({ className, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 140 31"
      fill="none"
      aria-label="CometLab"
      role="img"
      className={cn("w-auto h-auto", className)}
      {...props}
    >
      <text
        x="0"
        y="26"
        fontFamily="Inter, system-ui, sans-serif"
        fontWeight="700"
        fontSize="30"
        letterSpacing="-1.4"
        fill="currentColor"
      >
        Comet
      </text>
      <text
        x="92"
        y="26"
        fontFamily="Inter, system-ui, sans-serif"
        fontWeight="700"
        fontSize="30"
        letterSpacing="-1.4"
        fill="#7C3AED"
      >
        Lab
      </text>
    </svg>
  );
}

/** @deprecated kept for backwards compatibility — use BrandLogo */
export const CallersLogo = BrandLogo;

export function ChevronDownIcon({ className, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 8 8"
      fill="none"
      className={cn("size-2", className)}
      {...props}
    >
      <path d="M1 2.5L4 5.5L7 2.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ArrowRightIcon({ className, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      className={cn("size-4", className)}
      {...props}
    >
      <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function HamburgerIcon({ className, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      className={cn("size-6", className)}
      {...props}
    >
      <path
        fill="currentColor"
        d="M14.616 2.154V4H5.692V2.154zm-4.308 4.923v1.846H1.385V7.077zM14.616 12v1.846H5.692V12z"
      />
    </svg>
  );
}

export function CheckIcon({ className, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      className={cn("size-5", className)}
      {...props}
    >
      <path
        d="M5 13l4 4L19 7"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function PlayIcon({ className, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={cn("size-5", className)}
      {...props}
    >
      <path d="M8 5v14l11-7L8 5z" />
    </svg>
  );
}

export function PlusIcon({ className, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      className={cn("size-5", className)}
      {...props}
    >
      <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
