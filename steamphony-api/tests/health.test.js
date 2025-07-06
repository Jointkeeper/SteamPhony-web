const request = require('supertest');

let app;

beforeAll(async () => {
  const module = await import('../src/server.js');
  app = module.default;
});

describe('Health probes', () => {
  it('/live should return OK', async () => {
    const res = await request(app).get('/live').expect(200);
    expect(res.text).toBe('OK');
  });

  it('/ready should return READY or 503', async () => {
    const res = await request(app).get('/ready');
    expect([200, 503]).toContain(res.status);
  });
});

describe('Metrics', () => {
  it('/metrics should expose Prometheus data', async () => {
    const res = await request(app).get('/metrics').expect(200);
    expect(res.text).toContain('# HELP');
  });
}); 