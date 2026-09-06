import { asset } from "@/lib/asset";

const SOCIAL_LINKS = [
  {
    href: "https://www.facebook.com/menghw",
    label: "Facebook",
    icon: "/images/9cf388ba2ea50bcd.png",
  },
  {
    href: "https://www.instagram.com/how.letter.works/",
    label: "Instagram",
    icon: "/images/70687357e2ef3d12.png",
  },
  {
    href: "https://www.linkedin.com/in/scott-wu-8152b112",
    label: "LinkedIn",
    icon: "/images/6597c834071c4a1c.png",
  },
  {
    href: "mailto:shin71630@gmail.com",
    label: "Email",
    icon: "/images/14485076feace914.png",
  },
];

export function Footer() {
  return (
    <footer id="contact" className="border-t border-white/10 bg-black text-white">
      <div className="mx-auto max-w-6xl px-6 py-16 text-center">
        <h2 className="text-2xl font-semibold sm:text-3xl">
          Want to say hello?
        </h2>
        <a
          href="mailto:shin71630@gmail.com"
          className="mt-4 inline-block border-b border-white/40 pb-1 text-lg text-white/90 transition-colors hover:border-white hover:text-white"
        >
          Write me an email
        </a>
        <p className="mt-3 text-sm text-white/50">
          Taipei City, Taiwan · +886 911 621113
        </p>

        <div className="mt-10 flex items-center justify-center gap-5">
          {SOCIAL_LINKS.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noreferrer"
              aria-label={s.label}
              className="opacity-80 transition-opacity hover:opacity-100"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={asset(s.icon)}
                alt={s.label}
                width={32}
                height={32}
                className="invert"
              />
            </a>
          ))}
        </div>

        <p className="mt-12 text-xs text-white/40">
          Copyright &copy; {new Date().getFullYear()} Scott Wu. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
