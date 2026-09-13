import type { Metadata } from "next";
import { asset } from "@/lib/asset";
import { CONTAINER } from "@/lib/layout";

export const metadata: Metadata = {
  title: "About",
  description:
    "About Scott Wu — creative professional, UX design lead at KaiOS, tennis player, and urban explorer.",
};

const ANNIVERSARY_PHOTOS = Array.from(
  { length: 9 },
  (_, i) => `/images/outside-work-${i + 1}.jpg`,
);

export default function AboutPage() {
  return (
    <div className="bg-navy text-ink">
      <section className={`${CONTAINER} py-20 sm:py-24`}>
        <div className="grid grid-cols-1 items-start gap-12 md:grid-cols-2">
          <div className="order-2 md:order-1">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-light">
              About
            </p>
            <h1 className="mt-2 font-display text-3xl font-bold sm:text-4xl">
              I&apos;m Scott Wu,
            </h1>

            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={asset("/images/c60fa277d215e63f.png")}
              alt="Scott Wu"
              className="mt-6 h-28 w-28 rounded-full object-cover"
            />

            <p className="mt-6 leading-relaxed text-ink/70">
              Hi, I&apos;m Scott Wu. I have a passion for both tennis and
              working out, and I enjoy the physical and mental challenges that
              come with these activities. When I&apos;m not on the court or in
              the gym, I&apos;m exploring new cities and discovering diverse
              artistic expressions as an urban explorer and outdoor lifestyle
              adventurer. I&apos;m also a beginner in hand lettering and type
              design, which I love to practice and incorporate into my design
              work. Whether I&apos;m playing sports or pursuing creative
              endeavors, I&apos;m always pushing myself to grow and learn new
              things.
            </p>
            <p className="mt-4 leading-relaxed text-ink/70">
              Currently, I&apos;m leading the UX Design team at{" "}
              <a
                href="https://www.kaiostech.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent-light underline-offset-4 hover:underline"
              >
                KaiOS
              </a>
              , with a mission to empower people with the internet through
              technology.
            </p>
          </div>

          <div className="order-1 md:order-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={asset("/images/d24a8874968cc013.jpg")}
              alt="Scott Wu playing tennis"
              className="w-full rounded-xl object-cover"
            />
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 py-20 sm:py-24">
        <div className={CONTAINER}>
          <h2 className="font-display text-2xl font-bold sm:text-4xl">
            Outside of Work...
          </h2>

          <p className="mt-6 max-w-2xl text-sm leading-relaxed text-ink/60">
            I bring my design ideas into my daily life. These anniversary
            photos are designed for my family every year. My design spirit
            brings fun and artistic elements into the photos, making
            memorable curation for my family.
          </p>

          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {ANNIVERSARY_PHOTOS.map((src, i) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={src}
                src={asset(src)}
                alt={`Family anniversary photo ${i + 1}`}
                loading="lazy"
                className="aspect-square w-full rounded-sm object-cover"
              />
            ))}
          </div>

          <p className="mt-16 max-w-2xl text-sm leading-relaxed text-ink/60">
            Hand lettering and type design have become my latest obsession,
            and I make it a daily routine to practice and experiment with
            different styles. I enjoy the process of getting my hands dirty
            and creating designs inspired by my surroundings and the diverse
            cultures and art forms I encounter. Whenever possible, I try to
            incorporate social messages into my work to make a positive
            impact. Overall, I find that hand lettering and type design
            allow me to express myself creatively and communicate in unique
            and meaningful ways.
          </p>

          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={asset("/images/hand-lettering.jpg")}
            alt="Hand lettering artwork by Scott Wu"
            loading="lazy"
            className="mt-8 aspect-square w-full max-w-sm rounded-sm object-cover"
          />

          <a
            href="https://www.instagram.com/how.letter.works/"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-10 inline-block rounded-full border border-white/25 px-8 py-3 text-sm font-semibold text-ink transition-colors hover:border-accent-light"
          >
            Visit My Instagram
          </a>
        </div>
      </section>
    </div>
  );
}
