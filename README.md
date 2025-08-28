# Node.js‑ZTM

> A clean, production‑ready Node.js project scaffold with best practices for APIs, CLIs, and background jobs.

<p align="center">
  <a href="#-features">Features</a> ·
  <a href="#-tech-stack">Tech Stack</a> ·
  <a href="#-quick-start">Quick Start</a> ·
  <a href="#-project-structure">Structure</a> ·
  <a href="#-scripts">Scripts</a> ·
  <a href="#-configuration">Configuration</a> ·
  <a href="#-testing--quality">Testing</a> ·
  <a href="#-docker--deployment">Docker</a> ·
  <a href="#-contributing">Contributing</a>
</p>

---

## 🔥 Overview

This repository contains a professional Node.js setup suitable for REST/JSON APIs, microservices, or background workers. It emphasizes developer experience, reliability, and clear structure. You can use it as a template or as a learning companion while mastering Node.js.

> Maintained by **[Riyanshu-256](https://github.com/Riyanshu-256)**

---

## ✨ Features

* **TypeScript‑ready** (optional): strict types, path aliases, and fast TS execution with `ts-node` or `tsx`.
* **Express 5 / Fastify** (pick one): production middleware, CORS, security headers.
* **Config management** via `.env` and schema validation (e.g., `zod`/`joi`).
* **Logging** with request correlation IDs and pretty/dev vs JSON/prod output.
* **Error handling** unified: typed errors, error middleware, problem+json responses.
* **Testing** with Jest/Vitest and Supertest for HTTP.
* **Linting & Formatting** with ESLint + Prettier. Conventional commits supported.
* **Dockerized** for parity across dev/stage/prod. Healthchecks included.
* **GitHub Actions** CI: lint → test → build → publish (example workflow).
* **OpenAPI** (Swagger) generation & UI (optional).

> Tip: Keep only what you need. Remove sections or deps that don’t fit your project.

---

## 🧰 Tech Stack

* **Runtime:** Node.js LTS (≥ 20.x)
* **Language:** JavaScript / TypeScript (choose one)
* **Web Framework:** Express or Fastify
* **Data:** PostgreSQL / MongoDB / Redis (optional, plug‑in ready)
* **Testing:** Jest or Vitest, Supertest
* **Tooling:** ESLint, Prettier, Husky, lint‑staged, Commitlint
* **Docs:** OpenAPI/Swagger (via `swagger-ui-express` or `fastify-swagger`)

---

## 🚀 Quick Start

### 1) Requirements

* Node.js **20+** (LTS)
* Package manager: **npm** / **pnpm** / **yarn**
* Docker (optional) and Docker Compose

### 2) Clone & Install

```bash
# HTTPS
git clone https://github.com/Riyanshu-256/Node.js-ZTM.git
cd Node.js-ZTM

# install deps
npm install
# or: pnpm install / yarn
```

### 3) Environment Variables

Copy the example env and update values:

```bash
cp .env.example .env
```

Minimal variables:

```
NODE_ENV=development
PORT=3000
LOG_LEVEL=info
# If using a DB
DATABASE_URL=postgresql://user:pass@localhost:5432/app
# If using JWT
JWT_SECRET=replace-me
```

### 4) Run in Development

```bash
npm run dev
```

App runs at: `http://localhost:3000`

### 5) Build & Start (Production)

```bash
npm run build
npm start
```

---

## 🗂 Project Structure

```
Node.js-ZTM/
├─ src/
│  ├─ app.ts              # app bootstrap (Express/Fastify instance)
│  ├─ server.ts           # HTTP server listen / graceful shutdown
│  ├─ config/             # env schema, config loader
│  ├─ api/
│  │  ├─ routes/          # route definitions
│  │  ├─ controllers/     # request handlers
│  │  ├─ validators/      # zod/joi schemas
│  │  └─ middlewares/     # auth, error, logging
│  ├─ services/           # business logic
│  ├─ repositories/       # DB access
│  ├─ libs/               # utilities (logger, http, etc.)
│  └─ jobs/               # cron/queue workers (optional)
├─ tests/                 # unit/integration tests
├─ prisma/ or migrations/ # if using ORM
├─ public/                # static assets (optional)
├─ .env.example
├─ package.json
├─ tsconfig.json          # if TS
├─ Dockerfile
├─ docker-compose.yml
└─ README.md
```

---

## 📜 Example API

```http
GET /health          → 200 { status: "ok", uptime: 123.45 }
GET /v1/users        → list users (paginated)
POST /v1/auth/login  → issue access token
```

### Health Route (Express)

```ts
// src/api/routes/health.ts
import { Router } from 'express';
export const health = Router();
health.get('/health', (req, res) => {
  res.json({ status: 'ok', uptime: process.uptime() });
});
```

---

## 🧩 Scripts

Add/adjust these in `package.json`:

```json
{
  "scripts": {
    "dev": "nodemon --exec tsx src/server.ts",
    "build": "tsc -p .",
    "start": "node dist/server.js",
    "lint": "eslint .",
    "lint:fix": "eslint . --fix",
    "test": "vitest run",
    "test:watch": "vitest",
    "format": "prettier --check .",
    "format:write": "prettier --write .",
    "prepare": "husky install"
  }
}
```

---

## ⚙️ Configuration

Centralize configuration and validate on boot:

```ts
// src/config/env.ts
import { z } from 'zod';

const EnvSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z.coerce.number().default(3000),
  LOG_LEVEL: z.enum(['debug', 'info', 'warn', 'error']).default('info'),
  DATABASE_URL: z.string().url().optional(),
  JWT_SECRET: z.string().min(16).optional()
});

export const env = EnvSchema.parse(process.env);
```

---

## 🧪 Testing & Quality

* **Unit tests:** business logic and utilities
* **Integration tests:** HTTP endpoints with **Supertest**
* **Coverage:** enforce thresholds in CI

Example test:

```ts
import request from 'supertest';
import { createApp } from '../src/app';

it('GET /health returns ok', async () => {
  const app = await createApp();
  const res = await request(app).get('/health');
  expect(res.status).toBe(200);
  expect(res.body.status).toBe('ok');
});
```

Linting & formatting:

```bash
npm run lint
npm run format
```

Git hooks (optional):

```bash
npx husky add .husky/pre-commit "npm run lint && npm run test && npm run format"
```

---

## 🐳 Docker & Deployment

### Build & Run

```bash
docker build -t nodejs-ztm:latest .
docker run --env-file .env -p 3000:3000 nodejs-ztm:latest
```

### docker-compose (dev)

```yaml
services:
  api:
    build: .
    command: npm run dev
    ports:
      - "3000:3000"
    env_file: .env
    volumes:
      - ./:/app
      - /app/node_modules
    depends_on:
      - db
  db:
    image: postgres:16
    environment:
      POSTGRES_USER: user
      POSTGRES_PASSWORD: pass
      POSTGRES_DB: app
    ports:
      - "5432:5432"
```

### Production Notes

* Enable **graceful shutdown** (SIGTERM) and health endpoints
* Use **process managers** (PM2) or container orchestration (Kubernetes)
* Configure **observability**: logs, metrics, traces (e.g., OpenTelemetry)

---

## 🛡 Security

* Sanitize and validate all inputs
* Use `helmet` (Express) or built‑ins (Fastify) for headers
* Store secrets outside the repo; rotate keys
* Rate limit and enable CORS rules as required

---

## 🗺 Roadmap (example)

* [ ] Add OpenAPI docs
* [ ] Add Redis caching layer
* [ ] Add background job queue (BullMQ)
* [ ] Add e2e tests in CI

---

## 🤝 Contributing

1. Fork the repo & create a feature branch
2. Commit using **Conventional Commits** (e.g., `feat: add user routes`)
3. Open a PR with a clear description and screenshots/logs if relevant

> Run `npm run lint && npm test` before pushing.

---

## 📄 License

This project is licensed under the **MIT License**. See `LICENSE` for details.

---

## 🙌 Acknowledgements

* Inspired by community best practices and Node.js learning paths.
* Thanks to contributors and maintainers keeping the stack up to date.

---

### Badges

![CI](https://img.shields.io/github/actions/workflow/status/Riyanshu-256/Node.js-ZTM/ci.yml)
![License](https://img.shields.io/badge/license-MIT-green)
![Node](https://img.shields.io/badge/node-%3E%3D20.x-339933)
![GitHub Repo stars](https://img.shields.io/github/stars/Riyanshu-256/Node.js-ZTM?style=social)

---

### How to Use This as a Template

* Replace placeholders like stack choices you don’t use
* Remove sections not relevant to your project
* Keep the README updated as your architecture evolves
