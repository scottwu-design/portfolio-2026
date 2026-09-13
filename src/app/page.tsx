import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { SelectedWorks } from "@/components/SelectedWorks";
import { projects } from "@/lib/content";

export default function Home() {
  const featured = projects.slice(0, 6);

  return (
    <div className="bg-navy text-ink">
      <Hero />
      <Services />
      <SelectedWorks projects={featured} />
    </div>
  );
}
