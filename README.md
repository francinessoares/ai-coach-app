# AI Coach App

Mobile app powered by AI that helps developers:

- Study programming topics
- Simulate technical interviews
- Get structured feedback

## Architecture

- React Native (Expo)
- Node.js backend
- OpenAI integration
- Shared design system

## Monorepo structure

```
ai-coach-app/
├── apps/
│   ├── mobile/              # React Native (Expo)
│   └── backend/             # Node.js + OpenAI API
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

**Requirements:** Node.js >= 20.19.4, npm 10+

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

Copy `apps/backend/.env.example` to `apps/backend/.env` and set `OPENAI_API_KEY`.

## API endpoints

- `GET /health` — service health check
- `POST /api/chat` — AI coach conversation

## Learn more

See [docs/README.md](./docs/README.md).
