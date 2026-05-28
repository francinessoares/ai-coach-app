# Documentação

## Visão geral

| Pasta | Responsabilidade |
|-------|------------------|
| `apps/mobile` | Interface do usuário (Expo Router, React Native) |
| `apps/backend` | API HTTP, integração Google Gemini |
| `packages/shared` | Tipos e utilitários usados por mobile e backend |
| `packages/design-system` | Tokens de design e componentes base |

## Fluxo de dados (planejado)

1. O app mobile envia mensagens para o backend.
2. O backend chama o Gemini e devolve a resposta do coach.
3. Tipos compartilhados via aliases `@shared/*` e UI via `@ds/*` garantem contrato entre cliente e servidor.

## Próximos passos sugeridos

- Configurar NativeWind em `apps/mobile`
- Adicionar autenticação na API
- Publicar pacotes internos com versionamento semântico
