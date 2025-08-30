⚡ Node.js-ZTM

A clean, production-ready Node.js scaffold for APIs, CLIs, and jobs — fast, secure, and maintainable.

✨ Features

⚡ Express 5 or Fastify

🟦 TypeScript-first

🔐 Env validation (Zod)

🧹 ESLint + Prettier

✅ Jest + Supertest

📑 Logging (Pino/Winston)

📘 OpenAPI docs

🐳 Docker ready

🧰 Tech Stack

🟢 Node.js 18+

🟦 TypeScript 5

⚡ Express/Fastify

🗄️ PostgreSQL (Prisma) / MongoDB (Mongoose)

🧪 Jest + Supertest

🚀 Quick Start
npm i
cp .env.example .env
npm run dev

🌐 Visit: http://localhost:3000/health

🗂️ Structure
src/
  📂 app.ts       # bootstrap
  📂 routes/      # API routes
  📂 controllers/ # handlers
  📂 services/    # logic
  📂 middlewares/ # auth, error
  📂 config/      # env setup
🔐 Env

📄 .env.example

PORT=3000
DATABASE_URL=
🧪 API Example
// health.controller.ts
export const health = (_req, res) => res.json({ ok: true });
📦 Scripts
{
  "dev": "tsx watch src/server.ts",
  "build": "tsc",
  "start": "node dist/server.js",
  "test": "jest"
}
🐳 Docker
FROM node:18-alpine
WORKDIR /app
COPY . .
RUN npm ci && npm run build
CMD ["node", "dist/server.js"]
📈 Quality

🧹 npm run lint

✅ npm run test

🟦 npm run typecheck

🤝 Contributing

💡 PRs welcome! Fork → branch → PR ✅

📄 License

© 2025 Your Name · MIT License
