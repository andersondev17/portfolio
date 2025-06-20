// types/project.ts
export interface Project {
    id: number;
    title: string;
    des: string;
    img: string;
    images?: string[];
    iconLists: string[];
    link: string;
    github?: string;
    features?: string[]; // Hacemos features opcional
    techStack?: {
      name: string;
      icon: string;
    }[];
    screenshots?: string[];
    highlights?: string[];
    role?: string;
    duration?: string;
  }