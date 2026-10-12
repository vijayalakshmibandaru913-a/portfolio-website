import request from 'supertest';
import app from '../index.js';

describe('DevOps Portfolio REST API Endpoints', () => {
  it('GET /api/health returns 200 with health metrics', async () => {
    const res = await request(app).get('/api/health');
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('healthy');
    expect(res.body.service).toBeDefined();
    expect(res.body.uptimeSeconds).toBeGreaterThanOrEqual(0);
  });

  it('GET /api/profile returns profile of Vijaya Bandaru', async () => {
    const res = await request(app).get('/api/profile');
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.name).toBe('Vijaya Bandaru');
    expect(res.body.data.experienceYears).toBe(2);
  });

  it('GET /api/experience returns verified professional experience', async () => {
    const res = await request(app).get('/api/experience');
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.totalItems).toBe(2);
    expect(res.body.data[0].company).toBe('WNS');
    expect(res.body.data[1].company).toBe('Wipro');
  });

  it('GET /api/projects returns featured and lab projects', async () => {
    const res = await request(app).get('/api/projects');
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.length).toBeGreaterThanOrEqual(5);
  });

  it('POST /api/contact validates payload and rejects empty fields', async () => {
    const res = await request(app)
      .post('/api/contact')
      .send({
        name: '',
        email: 'bad-email',
        subject: '',
        message: ''
      });
    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
  });

  it('POST /api/contact accepts valid submission and returns confirmation', async () => {
    const res = await request(app)
      .post('/api/contact')
      .send({
        name: 'Hiring Manager',
        email: 'recruiter@techcorp.com',
        subject: 'DevOps & Full-Stack Opportunity',
        message: 'Hello Vijaya, we reviewed your ERP and CI/CD projects and would like to speak!'
      });
    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.recordId).toBeDefined();
  });
});
