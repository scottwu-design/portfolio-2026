import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { Projects } from "@/components/Projects";
import { projects } from "@/lib/content";

export default function Home() {
  const featured = projects.slice(0, 6);

  return (
    <div className="bg-navy text-ink">
      <Hero />
      <Services />
      <Projects projects={featured} />
    </div>
  );
}
