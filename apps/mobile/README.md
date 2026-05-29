# @ai-coach/mobile

App React Native com Expo Router (**Expo SDK 54**).

Compatível com versões recentes do **Expo Go** da App Store / Play Store (SDK 54).

**Monorepo:** o entry é `index.js` (não `expo-router/entry`) para o Metro resolver `src/app` corretamente.

**Erros comuns:**
- `EXPO_ROUTER_APP_ROOT` → `npx expo start -c`
- `Worklets ... version mismatch` → na raiz do monorepo: apagar `node_modules` e `package-lock.json`, depois `npm install`, e iniciar com `npx expo start -c`

## API (backend)

O app descobre o IP do PC automaticamente no **Expo Go** (mesmo IP do QR code / Metro).

1. Na **raiz** do monorepo: `npm run backend`
2. No terminal do backend aparecem URLs `http://192.168.x.x:3001` — use a mesma rede Wi‑Fi no celular
3. `npm run mobile` e abra no Expo Go

Opcional: copie `.env.example` → `.env` e defina `EXPO_PUBLIC_API_URL` se a detecção automática falhar.

No log do Expo você deve ver: `[AI Coach] API: http://192.168.x.x:3001`

**Checklist se não conectar:**
- Backend rodando (`npm run backend`)
- Celular e PC na **mesma Wi‑Fi** (evite rede “convidado”)
- Firewall do Windows permitindo Node na porta **3001**
- Reinicie o Expo com `npx expo start -c`

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
