import { CONTAINER } from "@/lib/layout";

const I_AM = [
  {
    title: "A Designer of Global Backgrounds",
    body: "I completed my master's at Parsons Design School and gained valuable work experience in New York and Taipei. Working with top designers shaped my high standards and distinctive design sensibilities.",
  },
  {
    title: "Adaptive in Different Workplace",
    body: "From New York to Taipei, my career led me into all kinds of companies, from creative agencies to multinational corporates to start-ups. The different scales of these companies gave me perfect opportunities to learn different ways of working and how we bring our products to life.",
  },
  {
    title: "Capable in Both Visual and UX",
    body: "I specialize in UI, interaction, and motion design for a wide range of products, such as mobile phones, wearables, websites, TVs, and Set-top boxes. My expertise spans from small-scale applications to large-scale operating systems and ecosystems.",
  },
];

export function Services() {
  return (
    <section className="py-20 sm:py-24">
      <div className={CONTAINER}>
        <h2 className="font-display text-2xl font-bold sm:text-4xl">
          I am...
        </h2>
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-3">
          {I_AM.map((item) => (
            <div
              key={item.title}
              className="rounded-sm border border-white/15 p-7 transition-colors hover:border-accent-light"
            >
              <h3 className="font-display text-lg font-bold leading-snug">
                {item.title}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-ink/60">
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
