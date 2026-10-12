import { useState, useEffect } from 'react';
import { Navbar } from './components/layout/Navbar';
import { HeroSection } from './components/sections/HeroSection';
import { DevOpsPipelineSimulator } from './components/sections/DevOpsPipelineSimulator';
import { ProjectsSection } from './components/sections/ProjectsSection';
import { SkillsSection } from './components/sections/SkillsSection';
import { ExperienceSection } from './components/sections/ExperienceSection';
import { CertificationsSection } from './components/sections/CertificationsSection';
import { ContactSection } from './components/sections/ContactSection';
import { Footer } from './components/layout/Footer';
import { InteractiveTerminal } from './components/modals/InteractiveTerminal';

import {
  fetchProfile,
  fetchExperience,
  fetchSkills,
  fetchProjects,
  fetchDevOpsPipeline,
  fetchCertifications,
  fetchHealth,
} from './services/api';

import {
  fallbackProfile,
  fallbackExperience,
  fallbackSkillCategories,
  fallbackRoadmap,
  fallbackProjects,
  fallbackDevOpsStages,
  fallbackCertifications,
} from './data/fallbackData';

import type {
  ProfileData,
  ExperienceItem,
  SkillCategory,
  RoadmapItem,
  ProjectItem,
  DevOpsStage,
  CertificationItem,
  HealthData,
} from './types/portfolio';

export function App() {
  const [profile, setProfile] = useState<ProfileData>(fallbackProfile);
  const [experience, setExperience] = useState<ExperienceItem[]>(fallbackExperience);
  const [skillCategories, setSkillCategories] = useState<SkillCategory[]>(fallbackSkillCategories);
  const [roadmap, setRoadmap] = useState<RoadmapItem[]>(fallbackRoadmap);
  const [projects, setProjects] = useState<ProjectItem[]>(fallbackProjects);
  const [pipelineStages, setPipelineStages] = useState<DevOpsStage[]>(fallbackDevOpsStages);
  const [certifications, setCertifications] = useState<CertificationItem[]>(fallbackCertifications);

  const [health, setHealth] = useState<{ data: HealthData | null; latencyMs: number; isOnline: boolean }>({
    data: null,
    latencyMs: 14,
    isOnline: true,
  });

  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [isPipelineTriggered, setIsPipelineTriggered] = useState(false);

  // Initial Data Fetching from REST API
  useEffect(() => {
    async function initData() {
      try {
        const [profData, expData, skillData, projData, pipeData, certData, healthData] = await Promise.all([
          fetchProfile(),
          fetchExperience(),
          fetchSkills(),
          fetchProjects(),
          fetchDevOpsPipeline(),
          fetchCertifications(),
          fetchHealth(),
        ]);

        if (profData) setProfile(profData);
        if (expData && expData.length > 0) setExperience(expData);
        if (skillData && skillData.categories) {
          setSkillCategories(skillData.categories);
          setRoadmap(skillData.roadmap);
        }
        if (projData && projData.length > 0) setProjects(projData);
        if (pipeData && pipeData.length > 0) setPipelineStages(pipeData);
        if (certData && certData.length > 0) setCertifications(certData);
        if (healthData) setHealth(healthData);
      } catch (err) {
        console.warn('API sync warning (using verified local baseline):', err);
      }
    }

    initData();

    // Periodic health poll every 25 seconds
    const interval = setInterval(async () => {
      const h = await fetchHealth();
      setHealth(h);
    }, 25000);

    return () => clearInterval(interval);
  }, []);

  // Global Keyboard Shortcut: Pressing `Ctrl+K` or `~` opens the CLI Terminal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey && e.key === 'k') || e.key === '`') {
        e.preventDefault();
        setIsTerminalOpen((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleTriggerPipeline = () => {
    setIsPipelineTriggered(true);
    // Smooth scroll to pipeline section
    const el = document.getElementById('pipeline');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    setTimeout(() => setIsPipelineTriggered(false), 2000);
  };

  return (
    <div className="app-container">
      {/* Fixed Navigation Bar */}
      <Navbar
        onOpenTerminal={() => setIsTerminalOpen(true)}
        health={health}
      />

      {/* Main Content Sections */}
      <main>
        {/* Hero Section with Interactive 3D DevOps Core */}
        <HeroSection
          profile={profile}
          onOpenTerminal={() => setIsTerminalOpen(true)}
          onTriggerPipeline={handleTriggerPipeline}
        />

        {/* Interactive 7-Stage DevOps CI/CD Pipeline Simulator */}
        <DevOpsPipelineSimulator
          stages={pipelineStages}
          isTriggeredExternally={isPipelineTriggered}
        />

        {/* Featured Projects with Architecture Specs */}
        <ProjectsSection
          projects={projects}
        />

        {/* Skill Matrix & Active Learning Roadmap */}
        <SkillsSection
          categories={skillCategories}
          roadmap={roadmap}
        />

        {/* Experience Timeline & Education */}
        <ExperienceSection
          experience={experience}
          education={profile.education}
        />

        {/* Certifications & Accreditations */}
        <CertificationsSection
          certifications={certifications}
        />

        {/* Direct Contact & Transmission Form */}
        <ContactSection
          profile={profile}
        />
      </main>

      {/* Footer */}
      <Footer
        profile={profile}
        onOpenTerminal={() => setIsTerminalOpen(true)}
      />

      {/* Interactive CLI Terminal Modal */}
      <InteractiveTerminal
        isOpen={isTerminalOpen}
        onClose={() => setIsTerminalOpen(false)}
        profile={profile}
        onTriggerPipeline={handleTriggerPipeline}
      />
    </div>
  );
}

export default App;
