import type { ReactNode } from "react";
import Link from "next/link";
import { CONTAINER } from "@/lib/layout";

export interface HeroAction {
  label: string;
  href: string;
}

export type HeroBackground =
  | { type: "image"; src: string; alt?: string }
  | { type: "video"; src: string; poster?: string };

export interface HeroProps {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  primaryAction?: HeroAction;
  secondaryAction?: HeroAction;
  /** Optional background image/video. Falls back to the plain navy
   * background (inherited from the page) when omitted. */
  background?: HeroBackground;
  /** Optional extra content (e.g. a profile photo + bio) rendered
   * below the subtitle and above the action buttons. */
  children?: ReactNode;
}

export function Hero({
  eyebrow,
  title,
  subtitle,
  primaryAction,
  secondaryAction,
  background,
  children,
}: HeroProps) {
  return (
    <section className="relative overflow-hidden border-b border-white/10 py-20 sm:py-28">
      {background?.type === "image" && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={background.src}
          alt={background.alt ?? ""}
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}
      {background?.type === "video" && (
        <video
          src={background.src}
          poster={background.poster}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}
      {background && <div className="absolute inset-0 bg-navy/70" />}

      <div className={`relative ${CONTAINER}`}>
        {eyebrow && (
          <p className="animate-[rise_0.7s_ease_forwards] text-xs font-semibold uppercase tracking-[0.2em] text-accent-light opacity-0">
            {eyebrow}
          </p>
        )}

        <h1 className="mt-6 animate-[rise_0.8s_0.1s_ease_forwards] font-display text-4xl font-bold leading-[1.05] tracking-tight opacity-0 sm:text-6xl sm:leading-[1.02]">
          {title}
        </h1>

        {subtitle && (
          <p className="mt-6 max-w-xl animate-[rise_0.8s_0.2s_ease_forwards] text-base leading-relaxed text-ink/70 opacity-0">
            {subtitle}
          </p>
        )}

        {children && <div className="mt-8">{children}</div>}

        {(primaryAction || secondaryAction) && (
          <div className="mt-10 flex animate-[rise_0.8s_0.3s_ease_forwards] items-center gap-4 opacity-0">
            {primaryAction && (
              <Link
                href={primaryAction.href}
                className="rounded-full bg-accent px-8 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
              >
                {primaryAction.label}
              </Link>
            )}
            {secondaryAction && (
              <Link
                href={secondaryAction.href}
                className="rounded-full border border-white/25 px-8 py-3 text-sm font-semibold text-ink transition-colors hover:border-accent-light"
              >
                {secondaryAction.label}
              </Link>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
