# Steamphony API

Express.js backend for Steamphony project.

## Getting Started

1. Install dependencies:

```bash
cd steamphony-api
npm install
```

2. Copy environment file and adjust values:

```bash
cp env.example .env
```

3. Run development server:

```bash
npm run dev
```

API available at `http://localhost:3001` by default.

### Run with Docker

Ensure Docker Desktop is running, then in `steamphony-api` folder execute:

```bash
docker-compose up --build -d
```

This will start:

* `postgres` – Postgres 15 on port **5432**
* `api` – Steamphony API on port **3001** with code mounted for live reload

Environment variables are loaded from `.env` (see `env.example`). The API service waits for Postgres via `depends_on`.

### Key Environment Variables

| Category | Variable | Description |
|----------|----------|-------------|
| Captcha  | `CAPTCHA_SECRET` | reCAPTCHA v3 secret key used to verify tokens from frontend |
| Security | `JWT_SECRET` | Secret for signing JWT tokens |
| Redis    | `REDIS_HOST` / `REDIS_PORT` | Connection settings for Redis (BullMQ queue) |
| Logging  | `LOG_TO_FILE` | Enable file logs (`true/false`) |
| Logging  | `LOG_DIR` | Directory for log files |
| Logging  | `LOG_ROTATE_DAYS` | How many days to keep rotated files |
| Logging  | `LOKI_ENABLED` | Enable Loki transport (`true/false`) |
| Logging  | `LOKI_HOST` | Loki endpoint URL |

Refer to `env.example` for full list.

Stop and remove containers:

```bash
docker-compose down
```

## Scripts

- `npm run dev` – start with nodemon
- `npm start` – start production
- `npm test` – run Jest tests
- `npm run lint` – run ESLint

## Endpoints

- `GET /live` – liveness probe
- `GET /ready` – readiness probe
- `GET /metrics` – Prometheus metrics
- `GET /api/health` – legacy health check
- `POST /api/contact` – contact form
- `POST /api/analytics/event` – analytics event
- `POST /api/auth/register` – register user and get JWT
- `POST /api/auth/login` – login and get JWT
- `GET /api/admin/ping` – sample protected route (role: admin)