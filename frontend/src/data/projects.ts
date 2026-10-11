// frontend/src/data/projects.ts

// LearnIT Project Images
import LearnITLogo from "../assets/logo/LearnITLogo.jpg";
import LearnITPic1 from "../assets/images/LearnITPic1.png";

// ExamSync Project Images
import ExamSyncLogo from "../assets/logo/ExamSyncLogo.jpg";
import ExamSyncPic1 from "../assets/images/examsync/Pic1.png";
import ExamSyncPic2 from "../assets/images/examsync/Pic2.png";
import ExamSyncPic3 from "../assets/images/examsync/Pic3.png";
import ExamSyncPic4 from "../assets/images/examsync/Pic4.png";
import ExamSyncVid1 from "../assets/images/examsync/ExamSyncVid1.mp4";

// PDFConvert Project Images
import SwiftconvertLogo from "../assets/logo/PDFCLogo.svg";
import SwiftconvertPic1 from "../assets/images/PDFConverter/Pic1.png";
import SwiftconvertPic2 from "../assets/images/PDFConverter/Pic2.png";
import SwiftconvertPic3 from "../assets/images/PDFConverter/Pic3.png";
import SwiftconvertVid1 from "../assets/images/PDFConverter/SwiftConvertVid1.mp4";

// ValueCare Project Images
import ValueCareLogo from "../assets/logo/ValueCareLogo.png";
import ValueCarePic1 from "../assets/images/ValueCare/img1.png";
import ValueCarePic2 from "../assets/images/Work Experiences/ValueCare/img2.png";

export type ProjectCategory = "solo" | "group" | "collaboration";

export interface ProjectProof {
  id: string;
  label: string;
  src: string;
}

export interface Project {
  id: string;
  name: string;
  category: ProjectCategory;
  logo: string;
  targetAudience: string;
  version: string;
  coreStack: string;
  description: string;
  proofs: ProjectProof[];
  liveUrl?: string;
}

export const projects: Project[] = [

  // Project 1: LearnIT
  {
    id: "learnit",
    name: "LearnIT",
    category: "solo",
    logo: LearnITLogo,
    targetAudience: "IT Enthusiasts, IT students, and learners",
    version: "1.0.0",
    coreStack: "Django, Python, React, Vite",
    description:
      "LearnIT is a video library for IT students to share, collaborate, and learn from other users through videos and comments.",
    proofs: [
      { id: "learnit-1", label: "Pic 1", src: LearnITPic1 },
      { id: "learnit-2", label: "Pic 2", src: LearnITPic1 },
      { id: "learnit-3", label: "Pic 3", src: LearnITPic1 },
    ],
  },

  // Project 2: ExamSync
  {
    id: "examsync",
    name: "ExamSync",
    category: "group",
    logo: ExamSyncLogo,
    targetAudience: "Dean, Faculty Members",
    version: "2.0.0",
    coreStack:
      "Django, Django REST Framework, PostgreSQL database, React,TypeScript, Vite",
    description:
      "The original system’s source code was intended to be continued, but no response or access was ever provided. Because of this, the team decided to rebuild ExamSync completely from the ground up. Designed for academic institutions, ExamSync simplifies complex exam workflows into a single, secure platform accessible to all stakeholders.",
    proofs: [
      { id: "examsync-1", label: "Pic 1", src: ExamSyncPic1 },
      { id: "examsync-2", label: "Pic 2", src: ExamSyncPic2 },
      { id: "examsync-3", label: "Pic 3", src: ExamSyncPic3 },
      { id: "examsync-4", label: "Pic 4", src: ExamSyncPic4 },
      { id: "examsync-5", label: "Vid 1", src: ExamSyncVid1 },
    ],
    liveUrl: "https://examsyncv2.com",
  },

  // Project 3: PDFConvert
  {
    id: "swiftconvert",

    name: "PDFConvert",

    category: "solo",

    logo: SwiftconvertLogo,

    targetAudience: "Students, Professionals, Businesses",

    version: "1.0.0",

    coreStack:
      "Django, Django REST Framework, PostgreSQL, React, TypeScript, Vite",

    description:
      "PDFConvert is a secure and user-friendly online file conversion platform that allows users to convert documents and files directly from their browser. The platform is designed to simplify common file conversion tasks without requiring users to install additional software. Built with a scalable architecture, PDFConvert supports multiple document tools while automatically processing and deleting uploaded files for improved privacy and security.",

    proofs: [
      { id: "swiftconvert-1", label: "Pic 1", src: SwiftconvertPic1 },
      { id: "swiftconvert-2", label: "Pic 2", src: SwiftconvertPic2 },
      { id: "swiftconvert-3", label: "Pic 3", src: SwiftconvertPic3 },
      { id: "swiftconvert-5", label: "Vid 1", src: SwiftconvertVid1 },
    ],

    liveUrl: "https://fileconvert-iota.vercel.app/",
  },

  // Project 4: ValueCare
  {
    id: "valuecare",

    name: "ValueCare",

    category: "solo",

    logo: ValueCareLogo,

    targetAudience: "Students, Professionals, Businesses",

    version: "1.0.0",

    coreStack:
      "Django, Django REST Framework, PostgreSQL, React, TypeScript, Vite",

    description:
      "ValueCare is a comprehensive medical supplies management platform that streamlines the procurement and distribution of essential healthcare products. The platform is designed to enhance efficiency and reduce costs for medical facilities while ensuring the availability of high-quality supplies.",

    proofs: [
      { id: "swiftconvert-1", label: "Pic 1", src: ValueCarePic1 },
      { id: "swiftconvert-2", label: "Pic 2", src: ValueCarePic2 },
    ],

    liveUrl: "https://valuecare-web-ph-one.vercel.app/",
  },
];
