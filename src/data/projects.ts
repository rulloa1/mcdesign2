import bakersBay from "@/assets/bakers-bay-cover.webp";
import yellowstone from "@/assets/yellowstone-club-cover.webp";
import houstonOaks from "@/assets/houston-oaks-cover.webp";
import miamiBeachAsset from "@/assets/miami-beach-sunset-pool.png.asset.json";
const miamiBeach = miamiBeachAsset.url;
import alpineRanchAsset from "@/assets/alpine-ranch-cover-pro.png.asset.json";
const alpineRanch = alpineRanchAsset.url;
import hospitalityPool from "@/assets/hospitality-pool-cover.webp";
import northFloridaAsset from "@/assets/north-florida-vero-cover.png.asset.json";
const northFlorida = northFloridaAsset.url;
import southcoastAsset from "@/assets/southcoast-cover-pro.png.asset.json";
const southcoast = southcoastAsset.url;
import bigsurCivil from "@/assets/bigsur-civil-cover.webp";
import carmelKnolls from "@/assets/carmel-knolls-cover.webp";
import developmentCivil from "@/assets/development-civil-cover.jpg";
import pacificGrove from "@/assets/pacific-grove-cover.webp";
import lagunaGrande from "@/assets/laguna-grande-cover.webp";
import abacoBoathouse from "@/assets/abaco-luxe-boathouse-cover.webp";
import coastalRestorationAsset from "@/assets/coastal-restoration-deck-cover.png.asset.json";
const coastalRestoration = coastalRestorationAsset.url;
import beachfront from "@/assets/beachfront-cover.webp";
import montanaCondo from "@/assets/montana-condo-cover.webp";
import carmelValleyNew from "@/assets/carmel-valley-new-cover.webp";
import carmelForest from "@/assets/carmel-forest-cover.webp";
import syracuse from "@/assets/syracuse-cover.webp";
import carmelRemodel from "@/assets/carmel-remodel-23-cover.webp";
import hillside from "@/assets/hillside-restoration-cover.webp";

const infrastructureCover = "/projects/assets/development-site.webp";

export type Category =
  | "owners-representation"
  | "residential-construction"
  | "design-build"
  | "hospitality"
  | "civil"
  | "development"
  | "commercial"
  | "estate-management";

export type Project = {
  id: string;
  title: string;
  subtitle: string;
  categories: Category[];
  location: string;
  role: string;
  specs: string;
  cover: string;
};

export const categoryLabels: Record<Category | "all", string> = {
  all: "All Projects",
  "owners-representation": "Owner's Representation",
  "residential-construction": "Residential Construction",
  "design-build": "Design-Build",
  hospitality: "Hospitality",
  civil: "Civil",
  development: "Development",
  commercial: "Commercial",
  "estate-management": "Estate Management",
};

export const projects: Project[] = [
  {
    id: "bakers-bay",
    title: "Bakers Bay Resort",
    subtitle: "Luxury Resort Development",
    categories: ["owners-representation"],
    location: "Bahamas",
    role: "Discovery Land Company Project's Rep",
    specs: "Resort Portfolio",
    cover: bakersBay,
  },
  {
    id: "yellowstone-club",
    title: "Yellowstone Club",
    subtitle: "Ultra-Luxury Alpine Community",
    categories: ["owners-representation"],
    location: "Montana",
    role: "Project Management: Final Finish of Main Lodge Addition & Completion of Private Condos",
    specs: "550,000 sqft • Final Finish of Main Lodge & 48 Private Condos",
    cover: yellowstone,
  },
  {
    id: "houston-oaks",
    title: "Houston Oaks",
    subtitle: "Premium Country Club Estate",
    categories: ["owners-representation"],
    location: "Texas",
    role: "Chief Projects Officer & Owner's Rep",
    specs: "Country Club Portfolio",
    cover: houstonOaks,
  },
  {
    id: "miami-beach",
    title: "S. Florida High Rise Luxe Condo",
    subtitle: "High Rise Luxe Condo",
    categories: ["residential-construction", "owners-representation"],
    location: "S. Florida",
    role: "Design (Co-Design of Structure / Int. Design by Others), Project Management, Owner Representative, Craftsmen-Contractor / Contract Coordination, Property Management",
    specs: "4,200 sqft • 5 months • 4 bed · 4 bath",
    cover: miamiBeach,
  },
  {
    id: "alpine-ranch",
    title: "High Alpine Mtn. Ranch Luxe Retreat",
    subtitle: "Ranch Luxe Retreat",
    categories: ["residential-construction", "owners-representation"],
    location: "Montana",
    role: "Owner Representation, Design Oversight, Contractor Procurement, Contract Negotiation, Project Management, Property Management",
    specs: "2,300 sqft • 24 months • 2 bed · 2 bath",
    cover: alpineRanch,
  },
  {
    id: "hospitality-pool",
    title: "Luxe Pool Design & Construction",
    subtitle: "Private Club / Resort Amenity",
    categories: ["hospitality", "design-build", "owners-representation"],
    location: "SE Texas",
    role: "Owner Representation, Daily Project Management, Co-Design of Many Elements, Property Management",
    specs: "189,000 Gallon • 18 months",
    cover: hospitalityPool,
  },
  {
    id: "north-florida",
    title: "North Florida Renovation/Addition",
    subtitle: "Residential Addition",
    categories: ["owners-representation", "estate-management"],
    location: "N. Florida",
    role: "Designer (Manage/Oversight of Architect / Int. Design by Others), Project Management, Owner Representative, Craftsmen-Contractor / Contract Coordination, Property Management",
    specs: "3,600 + 1,200 sqft • 10 months",
    cover: northFlorida,
  },
  {
    id: "southcoast",
    title: "South Coast Renovation",
    subtitle: "Complete Coastal Remodel",
    categories: ["design-build"],
    location: "Big Sur, CA",
    role: "Design (Structure & Int. Design), Builder, Project Manager, Owner Representative",
    specs: "3,800 sqft • 16 months",
    cover: southcoast,
  },
  {
    id: "bigsur-civil",
    title: "Coastal Mountain Residence",
    subtitle: "Civil Site Work",
    categories: ["civil", "residential-construction"],
    location: "Big Sur, CA",
    role: "Owner Representative, Designer, Builder, Permit Procurement",
    specs: "11 months • 3,000 cu yds earth moved • 320 ln ft retaining walls",
    cover: bigsurCivil,
  },
  {
    id: "civil-infrastructure",
    title: "Civil Engineering — Infrastructure Projects",
    subtitle: "Multi-State Civil Engineering Portfolio",
    categories: ["civil", "development"],
    location: "CA · TX · NM · CO · MT",
    role: "Civil Engineering Contractor/Builder, Project Management, Permit Procurement",
    specs: "2015–2024 • 50,000 cu yds earth moved • 2,500 ln ft retaining walls",
    cover: infrastructureCover,
  },
  {
    id: "carmel-knolls",
    title: "Carmel Knolls",
    subtitle: "More Than Lipstick on an Old Lady!",
    categories: ["residential-construction", "civil", "design-build"],
    location: "Carmel, CA",
    role: "Designer, Int. Designer, Builder, Project Manager, Permit Procurement",
    specs: "2,200 sqft • 1,400 sqft decking • 12 months",
    cover: carmelKnolls,
  },
  {
    id: "development-civil",
    title: "Development Civil",
    subtitle: "Development / Civil Engineering",
    categories: ["development", "civil", "residential-construction"],
    location: "SE Texas",
    role: "Project Management, Development / Civil Engineering Contractor/Builder",
    specs: "103 Acres • 36 months",
    cover: developmentCivil,
  },
  {
    id: "pacific-grove",
    title: "New Residential Construction In Historic Neighborhood",
    subtitle: "In Historic Neighborhood",
    categories: ["residential-construction", "design-build"],
    location: "Central Coast, CA",
    role: "Designer (Structure & Int. Design), Project Management, Owner Representative",
    specs: "2,600 sqft • 14 months",
    cover: pacificGrove,
  },
  {
    id: "laguna-grande",
    title: "Laguna Grande",
    subtitle: "Spanish Revival Commercial",
    categories: ["design-build", "commercial"],
    location: "Seaside, CA",
    role: "Design (Structure), Builder, Project Manager, Owner's Representative, Civil Engineering Construction",
    specs: "12,000 sqft • 14 months",
    cover: lagunaGrande,
  },
  {
    id: "abaco-boathouse",
    title: "Abaco Luxe Boat House",
    subtitle: "Construction",
    categories: ["residential-construction"],
    location: "Abaco, Bahamas",
    role: "Project Manager in a Foreign Country for US Owners",
    specs: "1,800 sqft • 6 months",
    cover: abacoBoathouse,
  },
  {
    id: "coastal-restoration",
    title: "Coastal Restoration",
    subtitle: "Erosion Repair",
    categories: ["civil"],
    location: "Monterey Peninsula, CA",
    role: "Civil Engineering Contractor, Builder, Permit Procurement (Emergency Construction Permit to save residence)",
    specs: "9 months • 2,500 cu yds earth moved • 180 ln ft retaining walls",
    cover: coastalRestoration,
  },
  {
    id: "beachfront-estate",
    title: "Beachfront Estate Abaco",
    subtitle: "House Residence",
    categories: ["residential-construction", "development"],
    location: "Abaco, Bahamas",
    role: "Project Manager in Foreign Country for US Owners",
    specs: "6,800 sqft • 2.5 Acres • 180 ft beach frontage",
    cover: beachfront,
  },
  {
    id: "montana-condo",
    title: "Mtn. Mid-Rise Luxe Condo",
    subtitle: "Condo",
    categories: ["residential-construction", "owners-representation"],
    location: "Montana",
    role: "Owner Representation, Project Management, Property Management",
    specs: "2,800 sqft • 8 months • New Build",
    cover: montanaCondo,
  },
  {
    id: "carmel-valley-new",
    title: "Carmel Valley New",
    subtitle: "Custom Residence",
    categories: ["design-build", "civil", "residential-construction"],
    location: "Carmel Valley, CA",
    role: "Designer (Structure), Builder, Project Manager, Civil Engineering Contractor",
    specs: "4,800 sqft • 20 months",
    cover: carmelValleyNew,
  },
  {
    id: "carmel-forest",
    title: "Carmel Forest to Ocean View",
    subtitle: "Custom Addition",
    categories: ["residential-construction", "design-build"],
    location: "Carmel By the Sea, CA",
    role: "Designer, Builder, Project Manager",
    specs: "Custom Addition • Forest to Ocean Views",
    cover: carmelForest,
  },
  {
    id: "syracuse",
    title: "Syracuse House",
    subtitle: "N. Utah Craftsman Estate",
    categories: ["design-build", "residential-construction", "owners-representation"],
    location: "N. Utah",
    role: "Owner Representation, Project Management, Property Management",
    specs: "6,200 sqft • 18 months",
    cover: syracuse,
  },
  {
    id: "carmel-remodel-23",
    title: "Carmel Remodel 2023",
    subtitle: "Modern Coastal Update",
    categories: ["residential-construction", "owners-representation"],
    location: "Carmel, CA",
    role: "Owner Rep & Construction Manager",
    specs: "Modern Coastal Update",
    cover: carmelRemodel,
  },
  {
    id: "hillside-restoration",
    title: "Hillside Restoration & Environmental Cleanup",
    subtitle: "Environmental Restoration",
    categories: ["civil", "residential-construction"],
    location: "Carmel, CA",
    role: "Civil Engineering Contractor/Builder, Permit Procurement",
    specs: "4 months • 1.5 Acres • 80 Tons debris removed",
    cover: hillside,
  },
];
