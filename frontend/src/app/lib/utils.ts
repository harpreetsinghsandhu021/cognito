import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const pastels = [
  "#E4D0D0",
  "#E5E0FF",
  "#FFDCDC",
  "#F5EFFF",
  "#F8E8EE",
  "#FAFAFA",
  "#EAEBD0",
  "#FFF1D9",
  "#ECFAE5",
  "#F7CFD8",
  "#E0EBFE",
  "#9FB3DF",
  "#FFF1D5",
  "#F6F0F0",
  "#CAE8E2",
  "#EEF1DA",
  "#C1CFA1",
  "#C599B6",
  "#FFCDB2",
  "#FBF3B9",
  "#FFF7F3",
  "#D7D3BF",
  "#B3C8CF",
  "#CDC1FF",
];

export const categories = {
  "cs.AI": "Artificial Intelligence",
  "cs.CY": "Computers and Society",
  "cs.HC": "Human-Computer Interaction",
  "cs.LG": "Machine Learning",
  "cs.CL": "Computation and Language",
  "cs.CV": "Computer Vision",
  "cs.SE": "Software Engineering",
  "cs.CE": "Computational Engineering, Finance, and Science",
  "cs.CC": "Computational Complexity",
  "cs.CG": "Computational Geometry",
  "cs.DS": "Data Structures and Algorithms",
  "cs.DB": "Databases",
  "cs.CR": "Cryptography and Security",
  "cs.MS": "Mathematical Software",
  "cs.RO": "Robotics",
  "cs.GT": "Computer Science and Game Theory",
  "cs.DL": "Digital Libraries",
  "cs.LO": "Logic in Computer science",
};
