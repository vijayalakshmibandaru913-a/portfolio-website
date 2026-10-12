import { Router, Request, Response } from 'express';
import { portfolioData } from '../data/portfolioData.js';

const router = Router();

router.get('/profile', (_req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    data: portfolioData.profile
  });
});

router.get('/experience', (_req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    totalItems: portfolioData.experience.length,
    data: portfolioData.experience
  });
});

router.get('/skills', (_req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    categories: portfolioData.skillCategories,
    roadmap: portfolioData.learningRoadmap
  });
});

router.get('/projects', (req: Request, res: Response) => {
  const { category } = req.query;
  let items = portfolioData.projects;

  if (category && typeof category === 'string') {
    items = items.filter(p => p.category.toLowerCase().includes(category.toLowerCase()));
  }

  res.status(200).json({
    success: true,
    total: items.length,
    data: items
  });
});

router.get('/devops-pipeline', (_req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    stages: portfolioData.devOpsPipelineStages
  });
});

router.get('/certifications', (_req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    data: portfolioData.certifications
  });
});

export default router;
