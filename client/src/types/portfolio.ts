export interface Education {
  degree: string;
  institution: string;
  location: string;
  year: number;
}

export interface ProfileData {
  name: string;
  title: string;
  headline: string;
  subheadline: string;
  location: string;
  email: string;
  phone: string;
  linkedin: string;
  github: string;
  experienceYears: number;
  education: Education;
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  projectOrDomain?: string;
  location: string;
  period: string;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
  responsibilities: string[];
  technologies: string[];
}

export interface SkillItem {
  name: string;
  level: 'Professional Experience' | 'Working Knowledge';
  verifiedByResume: boolean;
}

export interface SkillCategory {
  id: string;
  category: string;
  description: string;
  icon: string;
  skills: SkillItem[];
}

export interface RoadmapItem {
  name: string;
  category: string;
  status: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  category: 'Resume Featured' | 'DevOps Lab Project (Planned)' | string;
  status: 'Production / Verified' | 'Portfolio Lab (Planned)' | string;
  description: string;
  features: string[];
  techStack: string[];
  architectureSummary: string;
  liveDemoUrl?: string;
  githubUrl: string;
  dockerReady: boolean;
  ciPipeline: string;
}

export interface DevOpsStage {
  id: string;
  name: string;
  shortDescription: string;
  importance: string;
  tools: string[];
  codeSnippetTitle: string;
  codeSnippet: string;
  commonFailures: string[];
  troubleshootingTips: string[];
}

export interface CertificationItem {
  id: string;
  title: string;
  issuer: string;
  status: 'Completed' | 'In Progress' | string;
  type: 'Verified' | 'In Progress' | string;
  description: string;
}

export interface HealthData {
  status: string;
  service: string;
  uptimeSeconds: number;
  timestamp: string;
  environment: string;
  memoryUsageMB: number;
}
