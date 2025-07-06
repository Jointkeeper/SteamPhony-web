const request = require('supertest');

let app;

beforeAll(async () => {
  const module = await import('../src/server.js');
  app = module.default;
});

describe('Auth flow', () => {
  const email = `user_${Date.now()}@test.com`;
  const password = 'password123';
  let token;

  it('should register new user', async () => {
    const res = await request(app).post('/api/auth/register').send({ email, password }).expect(201);
    expect(res.body.token).toBeDefined();
    token = res.body.token;
    expect(res.body.user.email).toBe(email);
  });

  it('should login existing user', async () => {
    const res = await request(app).post('/api/auth/login').send({ email, password }).expect(200);
    expect(res.body.token).toBeDefined();
    token = res.body.token;
  });

  it('should access protected route with token', async () => {
    const res = await request(app).get('/api/admin/ping').set('Authorization', `Bearer ${token}`).expect(200);
    expect(res.body.message).toBe('pong');
  });

  it('should fail protected route without token', async () => {
    await request(app).get('/api/admin/ping').expect(401);
  });
}); 