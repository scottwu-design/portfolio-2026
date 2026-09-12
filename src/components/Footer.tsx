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
    <footer id="contact" className="bg-accent text-white">
      <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
        <h2 className="font-display text-[15vw] font-bold leading-[0.85] tracking-tight sm:text-[9rem]">
          Scott Wu
        </h2>

        <div className="mt-14 flex flex-col gap-12 sm:flex-row sm:justify-between">
          <div>
            <p className="text-sm font-semibold">Scott Wu</p>
            <p className="mt-3 text-sm text-white/80">+886 911 621113</p>
            <p className="mt-1 text-sm text-white/80">shin71630@gmail.com</p>
            <p className="mt-1 text-sm text-white/80">Taipei City, Taiwan</p>

            <div className="mt-6 flex items-center gap-3">
              {SOCIAL_LINKS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15 transition-colors hover:bg-white/30"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={asset(s.icon)}
                    alt={s.label}
                    width={18}
                    height={18}
                    className="invert"
                  />
                </a>
              ))}
            </div>
          </div>

          <div className="sm:text-right">
            <p className="text-sm font-semibold">Say Hello</p>
            <p className="mt-3 text-sm text-white/80">Want to work together?</p>
            <a
              href="mailto:shin71630@gmail.com"
              className="mt-4 inline-block rounded-full bg-white px-7 py-3 text-sm font-semibold text-accent transition-transform hover:-translate-y-0.5"
            >
              Write Me an Email
            </a>
          </div>
        </div>

        <p className="mt-16 text-xs text-white/60">
          Copyright &copy; {new Date().getFullYear()} Scott Wu. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
