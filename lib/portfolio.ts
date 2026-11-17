export const profile = {
  name: "Aayush Nilesh Buchade",
  given: "Aayush",
  family: "Nilesh Buchade",
  title: "AI & ML Engineer | Cybersecurity Enthusiast",
  location: "Pune, India",
  availability: "Open to full-time / fresher roles",
  email: "aayush.buchade@gmail.com",
  github: "https://github.com/AayushBuchade",
  githubHandle: "AayushBuchade",
  linkedin: "https://www.linkedin.com/in/aayush-buchade/",
};

export const experience = [
  {
    mark: "G",
    role: "ML Intern",
    org: "GrowGrid",
    period: "Sep 2026",
  },
  {
    mark: "T",
    role: "B.E. Computer Engineering",
    org: "Trinity Academy of Engineering",
    period: "Graduating 2027",
  },
] as const;

export const stack = [
  "Python",
  "TypeScript",
  "React",
  "Next.js",
  "FastAPI",
  "Node.js",
  "scikit-learn",
  "PostgreSQL",
  "MongoDB",
  "Tailwind",
  "Docker",
] as const;

export type ProjectImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type Project = {
  slug: string;
  name: string;
  status: string;
  summary: string;
  repo: string;
  images: ProjectImage[];
  stack: string[];
  context: string[];
  built: string[];
  scope: string[];
};

export const projects: Project[] = [
  {
    slug: "threatiq",
    name: "ThreatIQ",
    status: "In development",
    summary:
      "An explainable detection and SOC intelligence platform. The repository documents a Phase 0 foundation, with the twelve product modules still planned.",
    repo: "https://github.com/AayushBuchade/ThreatIQ",
    images: [],
    stack: [
      "Python",
      "FastAPI",
      "React",
      "PostgreSQL",
      "Redis",
      "SQLAlchemy",
      "scikit-learn",
      "Docker",
    ],
    context: [
      "ThreatIQ is described as a detection and decision-support system for security telemetry. The stated rule is that destructive response actions stay outside the product and require manual authorization.",
      "The README marks Phase 0, foundation and architecture, as complete on the dev/foundation branch. Phases 1–7, covering the twelve detection and SOC modules, are still upcoming.",
    ],
    built: [
      "FastAPI backend, Pydantic schemas, and a non-destructive action check.",
      "SQLAlchemy models for security events and system metrics, plus an Alembic baseline migration.",
      "A React, Vite, and Tailwind console with status cards, a module catalog, and a telemetry view.",
      "Docker Compose for the local stack, pytest coverage, and a GitHub Actions workflow.",
      "A documented PHISHGUARD migration audit. Email protection itself is scheduled for a later phase.",
      "Baseline machine-learning and token-attribution notes in the technical status table. The feature modules that would use them are still marked planned.",
    ],
    scope: [
      "The README states that only the Phase 0 foundation is implemented.",
      "Live log ingestion, anomaly detection, email protection, URL intelligence, incident workflow, and the copilot are planned, not finished.",
      "No public deployment is documented.",
    ],
  },
  {
    slug: "codebase-intelligence",
    name: "AI Codebase Intelligence",
    status: "Repository",
    summary:
      "A Next.js app that indexes a public GitHub repository and opens it through an architecture wiki, cited chat, and hybrid retrieval traces.",
    repo: "https://github.com/AayushBuchade/AI-Driven-Repository-Intelligence-and-Architecture-Analysis-System",
    images: [
      {
        src: "/work/codebase-workspace.jpeg",
        alt: "Codebase Intelligence after ingest, with wiki, cited chat, and retrieval traces",
        width: 1600,
        height: 765,
      },
      {
        src: "/work/codebase-landing.jpeg",
        alt: "Codebase Intelligence landing page for pasting a public repository URL",
        width: 1600,
        height: 750,
      },
      {
        src: "/work/codebase-graph.jpeg",
        alt: "Codebase Intelligence visual representation of a repository",
        width: 1600,
        height: 753,
      },
    ],
    stack: [
      "Next.js",
      "TypeScript",
      "Tailwind",
      "Gemini",
      "Zod",
      "Pinecone",
    ],
    context: [
      "Paste a public repository URL, index the source, then read a generated wiki beside a cited chat and the retrieval trace for the last question.",
      "Embeddings are local feature hashes. Pinecone is optional. If it is missing, vectors stay in memory.",
    ],
    built: [
      "Ingest of up to 500 source files, chunking, and an import graph.",
      "Streaming architecture wiki and a chat that cites file ranges.",
      "Hybrid retrieval: vector search and BM25, fused 60/40, with per-chunk traces.",
      "Dependency questions use the static import graph and a high, medium, or low risk label.",
      "A rolling conversation summary across chat turns.",
    ],
    scope: [
      "A Google Gemini API key is required to run chat and wiki generation.",
      "A GitHub token is recommended for rate limits. Pinecone is optional.",
      "No public deployment is documented.",
    ],
  },
  {
    slug: "smart-canteen",
    name: "Smart Canteen AI",
    status: "Repository",
    summary:
      "A canteen operations backend with accounts, role-based records, analytics, and a prep-time decision endpoint backed by MongoDB.",
    repo: "https://github.com/AayushBuchade/DY-Patil-Innovex-Aayush_Buchade",
    images: [],
    stack: ["TypeScript", "MongoDB", "Socket.io", "Node.js"],
    context: [
      "The README documents a MongoDB-backed API for a smart canteen: authentication, menu and order records, analytics, and an AI calculate endpoint.",
      "A combined dev script starts the frontend and backend together. The documented base URL is local.",
    ],
    built: [
      "Register, login, logout, and current-user routes.",
      "Menu, order, and user CRUD with owner, admin, and student limits described in the README.",
      "An owner analytics route and a calculate endpoint that returns prep time, start time, rush level, meal suggestions, and kitchen notes from the request.",
      "Socket.io events for queue updates, AI results, and order changes.",
      "A seed script for local food data.",
    ],
    scope: [
      "The README documents local setup. No public deployment is listed.",
      "Demo accounts exist for local testing and are intentionally left off this page.",
    ],
  },
  {
    slug: "phishguard",
    name: "PHISHGUARD",
    status: "Repository",
    summary:
      "A passive email-threat classifier with header checks, a risk score, and token-level explanations, presented in a Streamlit console.",
    repo: "https://github.com/AayushBuchade/PHISHGUARD",
    images: [
      {
        src: "/work/phishguard-roc.png",
        alt: "PHISHGUARD ROC curves for the four evaluated classifiers",
        width: 1400,
        height: 1000,
      },
      {
        src: "/work/phishguard-confusion.png",
        alt: "PHISHGUARD confusion matrix for the calibrated linear SVM",
        width: 1200,
        height: 1000,
      },
      {
        src: "/work/phishguard-features.png",
        alt: "PHISHGUARD chart of the highest-weighted phishing and safe tokens",
        width: 2000,
        height: 1200,
      },
    ],
    stack: ["Python", "scikit-learn", "Streamlit", "LIME", "TF-IDF"],
    context: [
      "PHISHGUARD compares four classifiers on a labeled email corpus and explains the decision with linear token weights and LIME.",
      "Analysis is static. URLs are defanged, and the app does not request the domains it finds.",
    ],
    built: [
      "The README reports 18,650 labeled emails: 11,322 safe and 7,328 phishing, drawn from the Nazario corpus, Enron, and SpamAssassin.",
      "Reported holdout result for the calibrated linear SVM: 97.16% accuracy, 96.42% F1, and 0.9957 ROC-AUC on 3,727 test emails.",
      "Logistic regression, random forest, and multinomial naive Bayes are included as comparisons.",
      "RFC header parsing, passive indicators, a 0–100 risk score, and a downloadable PDF report.",
      "A Streamlit interface with sample messages and an end-to-end test script.",
    ],
    scope: [
      "Metrics above are the figures published in the project README, not a separate audit.",
      "The app is documented as a local Streamlit process. No public deployment is listed.",
    ],
  },
];

export const sideQuests = [
  {
    mark: "H",
    name: "Human Firewall",
    status: "Awareness platform",
    description:
      "Phishing simulation, security training, risk scores, and an admin view. React, Express, and PostgreSQL, with synthetic training data.",
    href: "https://github.com/AayushBuchade/Human-Firewall",
  },
  {
    mark: "C",
    name: "Customer Segmentation",
    status: "Study",
    description:
      "K-means segmentation from demographic and behavior attributes, with scaling, elbow and silhouette checks, and cluster plots.",
    href: "https://github.com/AayushBuchade/Customer-Segmentation-KMeans-",
  },
  {
    mark: "U",
    name: "Uber Fare Prediction",
    status: "Study",
    description:
      "Fare regression from distance, traffic, demand, and surge, with preprocessing and a model comparison in scikit-learn.",
    href: "https://github.com/AayushBuchade/Uber-Cab-Fare-Prediction-ML",
  },
  {
    mark: "D",
    name: "Diabetes Prediction",
    status: "Study",
    description:
      "A classification study on patient health data, with preprocessing, exploratory analysis, training, and evaluation.",
    href: "https://github.com/AayushBuchade/Diabetes-Prediction-ML",
  },
] as const;

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export function getNextProject(slug: string) {
  const index = projects.findIndex((project) => project.slug === slug);
  if (index < 0) return projects[0];
  return projects[(index + 1) % projects.length];
}
