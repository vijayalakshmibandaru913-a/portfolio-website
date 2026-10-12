"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const portfolioData_js_1 = require("../data/portfolioData.js");
const router = (0, express_1.Router)();
router.get('/profile', (_req, res) => {
    res.status(200).json({
        success: true,
        data: portfolioData_js_1.portfolioData.profile
    });
});
router.get('/experience', (_req, res) => {
    res.status(200).json({
        success: true,
        totalItems: portfolioData_js_1.portfolioData.experience.length,
        data: portfolioData_js_1.portfolioData.experience
    });
});
router.get('/skills', (_req, res) => {
    res.status(200).json({
        success: true,
        categories: portfolioData_js_1.portfolioData.skillCategories,
        roadmap: portfolioData_js_1.portfolioData.learningRoadmap
    });
});
router.get('/projects', (req, res) => {
    const { category } = req.query;
    let items = portfolioData_js_1.portfolioData.projects;
    if (category && typeof category === 'string') {
        items = items.filter(p => p.category.toLowerCase().includes(category.toLowerCase()));
    }
    res.status(200).json({
        success: true,
        total: items.length,
        data: items
    });
});
router.get('/devops-pipeline', (_req, res) => {
    res.status(200).json({
        success: true,
        stages: portfolioData_js_1.portfolioData.devOpsPipelineStages
    });
});
router.get('/certifications', (_req, res) => {
    res.status(200).json({
        success: true,
        data: portfolioData_js_1.portfolioData.certifications
    });
});
exports.default = router;
