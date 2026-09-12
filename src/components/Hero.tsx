import Link from "next/link";
import { CONTAINER } from "@/lib/layout";

export function Hero() {
  return (
    <section className="border-b border-white/10 py-20 sm:py-28">
      <div className={CONTAINER}>
        <p className="animate-[rise_0.7s_ease_forwards] text-xs font-semibold uppercase tracking-[0.2em] text-accent-light opacity-0">
          Digital Product Designer
        </p>
        <h1 className="mt-6 animate-[rise_0.8s_0.1s_ease_forwards] font-display text-4xl font-bold leading-[1.05] tracking-tight opacity-0 sm:text-6xl sm:leading-[1.02]">
          Hello, I&apos;m Scott Wu, a creative professional focused on{" "}
          <span className="bg-gradient-to-r from-accent-light to-accent bg-clip-text text-transparent">
            digital product design.
          </span>
        </h1>
        <div className="mt-10 flex animate-[rise_0.8s_0.3s_ease_forwards] items-center gap-4 opacity-0">
          <Link
            href="/work"
            className="rounded-full bg-accent px-8 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
          >
            View My Work
          </Link>
          <Link
            href="/#contact"
            className="rounded-full border border-white/25 px-8 py-3 text-sm font-semibold text-ink transition-colors hover:border-accent-light"
          >
            Get in Touch
          </Link>
        </div>
      </div>
    </section>
  );
}
