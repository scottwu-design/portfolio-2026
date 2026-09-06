export interface ResumeEntry {
  title: string;
  dateRange: string;
  location: string;
  projects?: string;
  award?: string;
  intro?: string;
  bullets: string[];
}

export const EXPERIENCE: ResumeEntry[] = [
  {
    title: "Sr. UX Design Manager, KaiOS",
    dateRange: "Oct 2023 - Present",
    location: "Taipei City",
    projects: "Projects: KaiStore Apps, KaiOS Smart Feature Phone, KaiOS Smart Touch",
    award:
      "🏆 Award: SFF Global FinTech Hackcelerator Winner 2024 – Award by The Monetary Authority of Singapore (MAS) and the Singapore FinTech Association (SFA)",
    bullets: [
      "Responsible for UX, visual, motion design, and execution across all KaiOS products worldwide.",
      "Creating concept videos, prototypes, and high-level flow in UX and UI motion mockups to help convey interaction and design ideas to vendors and stakeholders.",
      "Creating the design and implementation guidelines of KaiOS products and services for partners and 3rd party developers.",
    ],
  },
  {
    title: "Sr. Visual Design Manager, KaiOS",
    dateRange: "Jun 2016 - Sep 2023",
    location: "Taipei City",
    projects:
      "Projects: Alcatel Go Flip 2, Reliance JioPhone, Reliance JioPhone 2, Nokia 8110 4G, Nokia 2720 Flip, Nokia 6300 4G, Doro 7050/7060, CAT B35, and Orange Sanza 3G, etc.",
    award:
      "🏆 Award: Red Dot Winner 2021, Interface Design – Awarded by Red Dot Design Award",
    intro:
      "Leads a visual design team of 4 members, responsible for all UI design, motion design, prototype, and execution of all KaiOS products, including:",
    bullets: [
      "Defining the visual design direction of KaiOS Smart Touch, Smart Feature Phone, Smart Watch, and Set-top Box.",
      "Creating concept videos, prototypes, and high-level flow in UX and UI motion mockups to help convey interaction and design ideas to vendors and stakeholders.",
      "Supervising the designers on plan execution from scratch to completion, from concept design to developed product, bringing the team's collaborative ideas to life.",
      "Supporting the brand and product creatives for the marketing team. Works range from web design, product video, and brand identity to brand guidelines.",
      "Creating the design and implementation guidelines of KaiOS products and services for partners and 3rd party developers.",
      "Designing the interaction of the ads on KaiOS ecosystem to help grow revenue.",
    ],
  },
  {
    title: "Visual Design Manager, Acadine",
    dateRange: "Jul 2015 - May 2015",
    location: "Taipei City",
    projects: "Projects: H5OS for Feature Phone, Home Automation, Smart Watch",
    intro:
      "Led a design team of 6 members, responsible for all visual/motion design and execution of all Acadine products, including:",
    bullets: [
      "Defining the visual design direction of Acadine's products through leading ideation exercises, and brainstorming workshops.",
      "Supervising the designers on plan execution from scratch to completion.",
      "Providing guidance and insights to team members on visual design skills, elevating team members' aesthetic standards.",
      "Creating concept videos and UI motion mockups to help convey interaction and design ideas to vendors and stakeholders.",
    ],
  },
  {
    title: "UX Designer, Mozilla",
    dateRange: "Sep 2014 - Jun 2015",
    location: "Taipei City",
    projects: "Projects: Firefox OS for Panasonic TV, Smartphone, Smart Watch, Feature Phone",
    bullets: [
      "Served as visual design lead, supervising and guiding a design team of 5 members to provide UI design for new and existing Firefox OS Connected device products and features.",
      "Responsible for UX, visual, motion design, and execution across all Firefox OS Connected device products worldwide.",
      "Built up UX design for Firefox OS Panasonic TV project; worked collaboratively with client's PMs and developers to ensure successful launch worldwide.",
    ],
  },
  {
    title: "Interaction Design Lead, HTC",
    dateRange: "Sep 2013 - Aug 2014",
    location: "Taipei City",
    projects: "Projects: HTC One M7, HTC One M8",
    bullets: [
      "Led a team of 2 interaction designers to ensure successful feature product delivery.",
      "Developed mockup videos and prototypes to help effectively communicate interaction and design ideas.",
      "Worked collaboratively with PMs, visual designers, developers, and the marketing team to ensure design concepts were fully conveyed and implemented.",
    ],
  },
  {
    title: "Principal Visual UI Designer, HTC",
    dateRange: "Apr 2011 - Sep 2013",
    location: "Taipei City",
    projects: "Projects: HTC Sensation, HTC Flyer, HTC One X, HTC Titan Windows Phone 7",
    bullets: [
      "Led a team of 3 UI designers, responsible for ensuring successful feature product delivery from beginning to end, including initiating design concepts, coordinating with other teams, controlling the qualities of the production process, to the completion of the products.",
      "Provided user interface design for new and existing HTC Sense products and features.",
      "Developed detailed storyboards, high-fidelity mockups, and prototypes to help convey interaction and design concepts visually.",
      "Worked collaboratively with PMs, UX designers, developers, and the marketing team to ensure design concepts were fully conveyed and implemented.",
    ],
  },
  {
    title: "Interaction & Multimedia Designer, Skypunch Creative",
    dateRange: "Jun 2009 - Apr 2011",
    location: "New York City",
    projects: "Clients: Energy Stars, U.S. Department of Energy (DOE), etc.",
    bullets: [
      "Responsible for web design and development, motion graphic design, and print design.",
    ],
  },
  {
    title: "Visual & Motion Graphic Design (Intern), Click 3X",
    dateRange: "Jan 2009 - May 2009",
    location: "New York City",
    projects: "Clients: MTV, TIME Inc., Crawford, Frontline Plus, E*Trade.",
    bullets: [
      "Web design — designed and developed the look and feel for sites, and was responsible for site navigation design, banner ads, and visual execution.",
      "Motion graphic design — responsible for concept development and motion design such as broadcast television, advertisement, and film titling from concept storyboard sketch to completion.",
    ],
  },
];

export const SPECIALTIES = [
  "Creative Leadership & Design Management",
  "Creative Direction & Art Direction",
  "Product Innovation",
  "User Experience Design",
  "Visual Design",
  "Motion Graphics Design",
  "High Fidelity Prototyping",
  "Production Management",
];

export const TOOLS = [
  "Figma",
  "Sketch",
  "Principle",
  "Photoshop",
  "Illustrator",
  "After Effects",
  "InDesign",
  "Maya",
  "HTML & CSS",
];

export const STUDY = [
  {
    school: "Parsons School of Design | The New School",
    dateRange: "2006 - 2008",
    degree: "MFA, Photography and Related Media",
  },
  {
    school: "Kun Shan University of Technology",
    dateRange: "2000 - 2004",
    degree: "BFA, Department of Motion Pictures and Video",
  },
];

export const LANGUAGES = [
  { name: "English", level: "Professional Working Proficiency" },
  { name: "Mandarin", level: "Native" },
];
