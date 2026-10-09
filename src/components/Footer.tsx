import { Reveal } from "@/components/Reveal";
import { CONTAINER } from "@/lib/layout";

const SOCIAL_LINKS = [
  { href: "https://www.facebook.com/menghw", label: "Facebook" },
  { href: "https://www.instagram.com/how.letter.works/", label: "Instagram" },
  { href: "https://www.linkedin.com/in/scott-wu-8152b112", label: "LinkedIn" },
  { href: "mailto:shin71630@gmail.com", label: "Email" },
];

export function Footer() {
  return (
    <footer id="contact" className="bg-accent text-white">
      <div className={`${CONTAINER} py-16 sm:py-20`}>
        <Reveal>
          <h2 className="font-display text-[15vw] font-bold leading-[0.85] tracking-tight sm:text-[9rem]">
            Scott Wu
          </h2>
        </Reveal>

        <Reveal
          delay={100}
          className="mt-14 grid grid-cols-1 gap-12 sm:grid-cols-3"
        >
          <div>
            <p className="text-sm text-white/80">+886 911 621113</p>
            <p className="mt-1 text-sm text-white/80">shin71630@gmail.com</p>
            <p className="mt-1 text-sm text-white/80">Taipei City, Taiwan</p>
          </div>

          <div>
            {SOCIAL_LINKS.map((s, i) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className={`block text-sm text-white/80 transition-colors hover:text-white ${
                  i > 0 ? "mt-1" : ""
                }`}
              >
                {s.label}
              </a>
            ))}
          </div>

          <div>
            <p className="text-sm text-white/80">Want to work together?</p>
            <a
              href="mailto:shin71630@gmail.com"
              className="mt-4 inline-block rounded-full bg-white px-7 py-3 text-sm font-semibold text-accent transition-transform hover:-translate-y-0.5"
            >
              Write Me an Email
            </a>
          </div>
        </Reveal>

        <p className="mt-16 text-xs text-white/60">
          Copyright &copy; {new Date().getFullYear()} Scott Wu. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
