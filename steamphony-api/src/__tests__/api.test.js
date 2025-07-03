import request from 'supertest';
import app from '../../server.js';

describe('API Health Check', () => {
  it('should return health status', async () => {
    const res = await request(app).get('/api/health').expect(200);
    expect(res.body.status).toBe('ok');
    expect(res.body.timestamp).toBeDefined();
  });
});

describe('Contact Form', () => {
  it('should accept valid contact form submission', async () => {
    const contactData = {
      name: 'Test User',
      email: 'test@example.com',
      phone: '+1234567890',
      businessType: 'restaurant',
      message: 'Test message content',
      language: 'en',
    };

    const res = await request(app).post('/api/contact').send(contactData).expect(201);
    expect(res.body.success).toBe(true);
    expect(res.body.id).toBeDefined();
  });

  it('should reject contact form without required fields', async () => {
    const contactData = {
      name: 'Test User',
    };

    const res = await request(app).post('/api/contact').send(contactData).expect(400);
    expect(res.body.success).toBe(false);
  });
}); 