# @ai-coach/mobile

App React Native com Expo Router.

## API (backend)

Copie `.env.example` para `.env` e ajuste se necessário:

```bash
EXPO_PUBLIC_API_URL=http://localhost:3001
```

No celular físico, use o IP da sua máquina: `http://192.168.x.x:3001`.

## Desenvolvimento

Backend e mobile em paralelo:

```bash
# terminal 1 (raiz)
npm run backend

# terminal 2 (raiz)
npm run mobile
```

Ou dentro desta pasta:

```bash
npm start
```

## Pacotes internos (aliases)

- `@shared/*` → `packages/shared/src/*`
- `@ds/*` → `packages/design-system/src/*`

```ts
import type { StudyPlan } from '@shared/types/study-plan';
import { Button } from '@ds/components/Button';
```
