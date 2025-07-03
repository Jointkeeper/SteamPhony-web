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

## Scripts

- `npm run dev` – start with nodemon
- `npm start` – start production
- `npm test` – run Jest tests
- `npm run lint` – run ESLint

## Endpoints

- `GET /api/health` – health check
- `POST /api/contact` – contact form
- `POST /api/analytics/event` – analytics event 