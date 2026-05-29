# AI Coach App

Mobile app powered by AI that helps developers:

- Study programming topics
- Simulate technical interviews
- Get structured feedback

## Architecture

- React Native (Expo SDK 54)
- Node.js backend
- Google Gemini integration
- Shared design system

## Monorepo structure

```
ai-coach-app/
├── apps/
│   ├── mobile/              # React Native (Expo)
│   └── backend/             # Node.js + Google Gemini API
├── packages/
│   ├── shared/              # Shared types & utils
│   └── design-system/       # Tokens & base UI components
└── docs/
```

## Path aliases

Apps import shared code via TypeScript paths:

```json
"@shared/*": ["../../packages/shared/src/*"],
"@ds/*": ["../../packages/design-system/src/*"]
```

```ts
import type { StudyPlan } from '@shared/types/study-plan';
import { Button } from '@ds/components/Button';
```

## Getting started

**Requirements:** Node.js **22** (ver `.nvmrc` / `.node-version`), npm 10+

O repositório inclui `.nvmrc` com `22`. Com [nvm](https://github.com/nvm-sh/nvm) ou [nvm-windows](https://github.com/coreybutler/nvm-windows):

```bash
nvm install
nvm use
node -v
```

Com [fnm](https://github.com/Schniz/fnm): `fnm use`.

```bash
npm install
```

| Command | Description |
|---------|-------------|
| `npm run mobile` | Start Expo dev server |
| `npm run mobile:web` | Run on web |
| `npm run mobile:android` | Run on Android |
| `npm run backend` | Start API with nodemon |
| `npm run backend:build` | Build backend for production |

### Environment

Copy `apps/backend/.env.example` to `apps/backend/.env` and set `GEMINI_API_KEY`.

## API endpoints

- `GET /health` — health check
- `POST /api/chat` — conversa com o coach (body validado com Zod)
- `POST /api/interview/evaluate` — avaliação de resposta de entrevista
- `POST /ai-test` — teste rápido do Gemini (dev)

## Learn more

See [docs/README.md](./docs/README.md).
