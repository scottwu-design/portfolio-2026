import { Hero } from "@/components/Hero";
import { IntroHighlights } from "@/components/IntroHighlights";
import { SelectedWorks } from "@/components/SelectedWorks";
import { projects } from "@/lib/content";

export default function Home() {
  const featured = projects.slice(0, 6);

  return (
    <div className="bg-navy text-ink">
      <Hero />
      <IntroHighlights />
      <SelectedWorks projects={featured} />
    </div>
  );
}
