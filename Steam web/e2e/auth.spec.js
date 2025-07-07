import { test, expect } from '@playwright/test';
test('register, login and access protected', async ({ request }) => {
    const email = `e2e_${Date.now()}@test.com`;
    const password = 'password123';
    const register = await request.post('http://localhost:3001/api/auth/register', {
        data: { email, password },
    });
    expect(register.status()).toBe(201);
    const token = (await register.json()).token;
    const ping = await request.get('http://localhost:3001/api/admin/ping', {
        headers: { Authorization: `Bearer ${token}` },
    });
    expect(ping.status()).toBe(200);
});
