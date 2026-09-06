import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "About Scott Wu — creative professional, UX design lead at KaiOS, tennis player, and urban explorer.",
};

export default function AboutPage() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-20">
      <div className="grid grid-cols-1 items-start gap-12 md:grid-cols-2">
        <div className="order-2 md:order-1">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-400">
            About
          </p>
          <h1 className="mt-2 text-3xl font-semibold text-neutral-900 sm:text-4xl">
            I&apos;m Scott Wu,
          </h1>

          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/c60fa277d215e63f.png"
            alt="Scott Wu"
            className="mt-6 h-28 w-28 rounded-full object-cover"
          />

          <p className="mt-6 leading-relaxed text-neutral-700">
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
          <p className="mt-4 leading-relaxed text-neutral-700">
            Currently, I&apos;m leading the UX Design team at KaiOS, with a
            mission to empower people with the internet through technology.
          </p>
        </div>

        <div className="order-1 md:order-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/d24a8874968cc013.jpg"
            alt="Scott Wu playing tennis"
            className="w-full rounded-xl object-cover"
          />
        </div>
      </div>
    </section>
  );
}
