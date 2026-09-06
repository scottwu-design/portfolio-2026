export type ContentNode =
  | { type: "heading"; text: string }
  | { type: "para"; text: string }
  | { type: "list"; items: string[] };

export type Section =
  | {
      kind: "content";
      nodes: ContentNode[];
      images: string[];
    }
  | {
      kind: "roleTeamDuration";
      role: string[];
      team: string[];
      duration: string[];
      images: string[];
    };

export interface PageContent {
  page: string;
  sections: Section[];
}

export interface ProjectSummary {
  slug: string;
  title: string;
  meta: string;
  year: string;
  thumbnail: string;
}
