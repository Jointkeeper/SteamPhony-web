const request = require('supertest');

let app;

beforeAll(async () => {
  // Dynamically import ESM server
  const module = await import('../src/server.js');
  app = module.default;
});

describe('Lead API', () => {
  const validLeadData = {
    name: 'Test User',
    email: 'test@example.com',
    phone: '+1234567890',
    businessType: 'restaurant',
    message: 'Test message from Jest',
    language: 'ru',
  };

  it('should create lead successfully with all fields', async () => {
    const res = await request(app).post('/api/contact').send(validLeadData).expect(201);
    expect(res.body.success).toBe(true);
    expect(res.body.lead.email).toBe(validLeadData.email);
    expect(res.body.message).toBe('Contact form submitted successfully');
  });

  it('should create lead with minimal required fields', async () => {
    const minimalData = { name: 'Minimal User', email: 'minimal@test.com', message: 'Minimal' };
    const res = await request(app).post('/api/contact').send(minimalData).expect(201);
    expect(res.body.success).toBe(true);
    expect(res.body.lead.name).toBe(minimalData.name);
  });

  it('should default language to ru', async () => {
    const data = { name: 'Lang User', email: 'lang@test.com', message: 'hello' };
    await request(app).post('/api/contact').send(data).expect(201);
    const lead = await global.prisma.lead.findFirst({ where: { email: data.email } });
    expect(lead.language).toBe('ru');
  });

  it('should fail with missing required fields', async () => {
    const res = await request(app).post('/api/contact').send({}).expect(400);
    expect(res.body.success).toBe(false);
    expect(res.body.error.code).toBe('VALIDATION_ERROR');
    expect(res.body.error.type).toBe('validation');
  });
});

describe('Health endpoint', () => {
  it('should return OK status', async () => {
    const res = await request(app).get('/api/health').expect(200);
    expect(res.body.status).toBe('OK');
  });
}); 