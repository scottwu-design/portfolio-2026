import type { PageContent, ProjectSummary } from "@/data/types";

import homeData from "@/data/content/home.json";
import aboutData from "@/data/content/about.json";
import resumeData from "@/data/content/resume.json";
import projectsIndex from "@/data/content/projects-index.json";

import hoyTvApp from "@/data/content/hoy-tv-app.json";
import kaiosStLockScreen from "@/data/content/kaios-st-lock-screen.json";
import kaiosSmartTouch from "@/data/content/kaios-smart-touch.json";
import kaiosSmartFeaturePhone from "@/data/content/kaios-smart-feature-phone.json";
import kaiosSmartTvLauncher from "@/data/content/kaios-smart-tv-launcher.json";
import kaiosSmartWatch from "@/data/content/kaios-smart-watch.json";
import yadeaEScooter from "@/data/content/yadea-e-scooter.json";
import homeAutomation from "@/data/content/home-automation.json";
import h5osSmartFeaturePhone from "@/data/content/h5os-smart-feature-phone.json";
import fxosSmartTv from "@/data/content/fxos-smart-tv.json";
import fxosSmartFeaturePhone from "@/data/content/fxos-smart-feature-phone.json";
import fxosSmartphone from "@/data/content/fxos-smartphone.json";
import htcLifeme from "@/data/content/htc-lifeme.json";
import htcSenseUi from "@/data/content/htc-sense-ui.json";
import htcMultiWindows from "@/data/content/htc-multi-windows.json";
import webDesign from "@/data/content/web-design.json";

const PROJECT_CONTENT: Record<string, PageContent> = {
  "hoy-tv-app": hoyTvApp as PageContent,
  "kaios-st-lock-screen": kaiosStLockScreen as PageContent,
  "kaios-smart-touch": kaiosSmartTouch as PageContent,
  "kaios-smart-feature-phone": kaiosSmartFeaturePhone as PageContent,
  "kaios-smart-tv-launcher": kaiosSmartTvLauncher as PageContent,
  "kaios-smart-watch": kaiosSmartWatch as PageContent,
  "yadea-e-scooter": yadeaEScooter as PageContent,
  "home-automation": homeAutomation as PageContent,
  "h5os-smart-feature-phone": h5osSmartFeaturePhone as PageContent,
  "fxos-smart-tv": fxosSmartTv as PageContent,
  "fxos-smart-feature-phone": fxosSmartFeaturePhone as PageContent,
  "fxos-smartphone": fxosSmartphone as PageContent,
  "htc-lifeme": htcLifeme as PageContent,
  "htc-sense-ui": htcSenseUi as PageContent,
  "htc-multi-windows": htcMultiWindows as PageContent,
  "web-design": webDesign as PageContent,
};

export const home = homeData as PageContent;
export const about = aboutData as PageContent;
export const resume = resumeData as PageContent;
export const projects = projectsIndex as ProjectSummary[];

export function getProjectSummary(slug: string): ProjectSummary | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getProjectContent(slug: string): PageContent | undefined {
  return PROJECT_CONTENT[slug];
}

export function getAllProjectSlugs(): string[] {
  return projects.map((p) => p.slug);
}
