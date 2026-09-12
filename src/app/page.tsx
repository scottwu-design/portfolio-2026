import { Hero } from "@/components/Hero";
import { AboutMe } from "@/components/AboutMe";
import { SelectedWorks } from "@/components/SelectedWorks";
import { projects } from "@/lib/content";

export default function Home() {
  const featured = projects.slice(0, 6);

  return (
    <div className="bg-navy text-ink">
      <Hero />
      <AboutMe />
      <SelectedWorks projects={featured} />
    </div>
  );
}
