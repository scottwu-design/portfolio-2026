import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { Projects } from "@/components/Projects";
import { projects } from "@/lib/content";

export default function Home() {
  const featured = projects.slice(0, 6);

  return (
    <div className="bg-navy text-ink">
      <Hero
        eyebrow="Digital Product Designer"
        title={
          <>
            Hello, I&apos;m Scott Wu, a creative professional focused on{" "}
            <span className="bg-gradient-to-r from-accent-light to-accent bg-clip-text text-transparent">
              digital product design.
            </span>
          </>
        }
        primaryAction={{ label: "View My Work", href: "/#selected-works" }}
        secondaryAction={{ label: "Get in Touch", href: "/#contact" }}
      />
      <Services />
      <Projects projects={featured} />
    </div>
  );
}
