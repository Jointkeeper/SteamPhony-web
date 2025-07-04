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

- `GET /api/health` – health check
- `POST /api/contact` – contact form
- `POST /api/analytics/event` – analytics event 