// Verified resume content (from the supplied resume PDF). Shared by /resume and the homepage.
export const competencies: { label: string; items: string }[] = [
  {
    label: "Design & Construction Leadership",
    items: "Renovation & New-Build Delivery, Design Management, Constructability Review, Owner Representation",
  },
  {
    label: "Capital Planning & Budgeting",
    items: "Multi-Year CapEx Planning, Construction Budgeting & Cost Control, Value Engineering, P&L Management",
  },
  {
    label: "Portfolio & Team Leadership",
    items: "Multi-Site Oversight, Mentoring PMs & Superintendents, Executive & Ownership Reporting",
  },
  {
    label: "Procurement & Logistics",
    items: "Global Procurement, Supply Chain Resilience, Remote-Site Logistics; Procore (Certified), BIM Workflows",
  },
  {
    label: "Hospitality Expertise",
    items: "Luxury Hotels & Resorts, Private Clubs, Spa and Food & Beverage Facilities, Ultra-High-End Residential",
  },
];

export type Role = {
  company: string;
  title: string;
  location: string;
  period: string;
  note?: string;
  bullets: { label?: string; text: string }[];
};

export const experience: Role[] = [
  {
    company: "The Mangrove Group (Private Consulting)",
    title: "CEO & Head of Operations (Contract)",
    location: "San Antonio, FL",
    period: "May 2026 – Aug 2026",
    bullets: [
      {
        label: "Executive Leadership",
        text: "Led company operations on a contract basis, reporting directly to ownership and setting priorities across the active construction portfolio.",
      },
      {
        label: "Portfolio Oversight",
        text: "Held project teams accountable for budget, schedule, and quality through consistent cost reporting and executive-level project reviews.",
      },
      {
        label: "Process Improvement",
        text: "Standardized procurement, scheduling, and project reporting workflows to give ownership clearer cost visibility and faster decisions.",
      },
      {
        label: "Team Development",
        text: "Led and mentored project managers, superintendents, and field staff, tightening accountability between office and field.",
      },
    ],
  },
  {
    company: "NewQuest Properties",
    title: "Sr. Project Manager / Owner's Representative",
    location: "Houston, TX",
    period: "2022 – 2025",
    note: "The Clubs at Houston Oaks & The Links at Houston Oaks",
    bullets: [
      {
        label: "Renovation & New Build",
        text: "Oversaw design and construction of club renovations and new facilities, applying architectural expertise to protect design intent, finish quality, and member experience.",
      },
      {
        label: "Capital Stewardship",
        text: "Directed construction phases of a $67MM private club portfolio, holding to multi-year budget and schedule requirements through value engineering and proactive risk mitigation.",
      },
      {
        label: "Ownership Liaison",
        text: "Served as primary executive liaison between the design team, the field, high-net-worth developers, and institutional stakeholders.",
      },
      {
        label: "Procurement Strategy",
        text: "Built localized procurement frameworks that cut material lead times by 15% during post-pandemic supply chain disruption.",
      },
    ],
  },
  {
    company: "The Mangrove Group",
    title: "Project Manager / Owner's Representative",
    location: "International / Remote",
    period: "2020 – 2022",
    bullets: [
      {
        label: "Portfolio Management",
        text: "Directed a $75M pipeline of five large private residential estates in the U.S. and abroad (Bahamas, Mexico), delivering every project within ±2% of budget.",
      },
      {
        label: "Regulatory Navigation",
        text: "Standardized permitting and entitlement workflows across international jurisdictions, pulling project starts forward by an average of 4 weeks.",
      },
      {
        label: "Full-Cycle Oversight",
        text: "Managed every phase from permitting to final inspection, holding a consistent quality standard across geographically dispersed sites.",
      },
      {
        label: "Team Leadership",
        text: "Aligned multilingual, culturally diverse project teams around shared schedules and quality expectations.",
      },
    ],
  },
  {
    company: "Yellowstone Club",
    title: "Project Manager",
    location: "Big Sky, MT",
    period: "2018 – 2020",
    bullets: [
      {
        label: "Resort Development",
        text: "Led construction oversight for multimillion-dollar luxury condominium towers, spa facilities, and restaurants in North America's premier private ski and golf community.",
      },
      {
        label: "Owner Representation",
        text: "Managed stakeholder communication to align project goals with the exacting expectations of an ultra-exclusive membership.",
      },
      {
        label: "Compliance & Entitlements",
        text: "Ran permit and entitlement processes under complex mountain-resort and environmental regulations.",
      },
    ],
  },
  {
    company: "Discovery Land Company / Starfish Company",
    title: "Project Manager — Bakers Bay Resort",
    location: "Great Guana Cay, Abaco Islands, Bahamas",
    period: "2015 – 2018",
    bullets: [
      {
        label: "Resort Portfolio",
        text: "Directed construction of Owner, Resort, and Private products, including the Beach Club Restaurant, Beach Club Spa, Market by the Pier, and multiple ultra-luxury single-family residences.",
      },
      {
        label: "Island Logistics",
        text: "Ran procurement and logistics for remote-island construction with limited local infrastructure, keeping materials and crews moving on schedule.",
      },
      {
        label: "Cross-Cultural Leadership",
        text: "Used native-level Spanish to lead and communicate with an international workforce.",
      },
    ],
  },
  {
    company: "Private Owner / Developer — Private Island Estate",
    title: "Owner's Representative / Project Manager",
    location: "Abaco Islands, Bahamas",
    period: "2015 – 2018",
    bullets: [
      {
        label: "Executive Representation",
        text: "Represented the owner on a $125M+ estate development, managing design, development consulting, and land development, with project budgets from $500K to $125M.",
      },
      {
        label: "Workforce Development",
        text: "Worked with government officials to secure skilled labor from multiple regions and launched training programs that built construction skills and lasting jobs for local Bahamians.",
      },
    ],
  },
  {
    company: "Architectural Design & Construction Consultant",
    title: "Private Owners / Developers",
    location: "Great Guana Cay & Great Abaco Island, Bahamas",
    period: "2013 – 2018",
    bullets: [
      {
        label: "Design & Constructability",
        text: "Provided architectural and constructability consulting so design intent translated cleanly to field execution.",
      },
      {
        label: "Logistics & Compliance",
        text: "Developed logistics strategies for remote-island sites and managed local permitting, codes, and environmental requirements.",
      },
    ],
  },
  {
    company: "Big D Construction — Signature Homes & Hospitality Division",
    title: "Construction Consultant / Sr. Project Manager",
    location: "Multi-State (concurrent engagement)",
    period: "2014 – 2016",
    bullets: [
      {
        label: "Luxury Portfolio",
        text: "Directed luxury home projects across multiple U.S. states with budgets of $12.5MM–$25MM, plus a $74MM private resort project.",
      },
      {
        label: "Process Optimization",
        text: "Reduced costs through strategic logistics and procurement management while holding luxury-market standards.",
      },
    ],
  },
  {
    company: "RCC Construction",
    title: "Sr. Designer / Owner / Construction Licensee",
    location: "Del Monte Forest, CA",
    period: "2004 – 2013",
    bullets: [
      {
        label: "Design-Build Leadership",
        text: "Directed construction management and partial design for two private resorts valued at $76MM.",
      },
      {
        label: "Signature Project",
        text: "Designed and built a large Texas equestrian ranch on a $24MM budget, with full architectural and construction oversight.",
      },
      {
        label: "Client Representation",
        text: "Served as owner's representative and trusted advisor to high-net-worth clients on private estates valued at $7.5MM–$28MM.",
      },
    ],
  },
];

export const earlierCareer: { role: string; org: string; period: string; text: string }[] = [
  {
    role: "Designer / Construction Consultant",
    org: "The Pebble Beach Company",
    period: "1993 – 1996",
    text: "Design, remodel, and construction consulting for one of America's most iconic resort properties.",
  },
  {
    role: "Construction & Operations Consultant",
    org: "Inn of the Anasazi",
    period: "1991 – 1993",
    text: "Recruited by the cofounder to establish operations for a new boutique hotel in Santa Fe, NM.",
  },
  {
    role: "Architectural Design Assistant",
    org: "Robert Young and Associates",
    period: "1987 – 1989",
    text: "Design support for retail, commercial, and hospitality venues in Dallas, TX.",
  },
  {
    role: "Design / Remodel Team Member",
    org: "Rosewood Hotel Group",
    period: "1986 – 1987",
    text: "Collaborated on innovative design solutions for luxury hotel remodel projects in Dallas, TX.",
  },
];

export const impact: { value: string; label: string }[] = [
  { value: "37+ Years", label: "Industry Experience" },
  { value: "$500M+", label: "Construction Value Managed" },
  { value: "$500K – $125M", label: "Project Range" },
  { value: "12 States · 4 Countries", label: "Geographic Reach" },
];

export const certifications = [
  {
    label: "Procore Certified",
    text: "Financial Management & Core Tools",
  },
  {
    label: "Languages",
    text: "English; Spanish (native-level fluency, used daily on international job sites)",
  },
];

