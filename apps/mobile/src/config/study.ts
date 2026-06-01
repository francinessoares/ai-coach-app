export const studyTopics = ['React', 'Angular', 'Flutter', 'Javascript'] as const;

export type StudyTopic = (typeof studyTopics)[number];

export const studyTopicSuggestions: Record<StudyTopic, readonly string[]> = {
  React: [
    'Hooks (useState, useEffect, useContext)',
    'Componentes, props e composição',
    'Estado global (Context, Redux, Zustand)',
    'React Router e data fetching',
    'Performance (memo, useMemo, useCallback)',
    'TypeScript com React',
    'Testes com React Testing Library',
    'Formulários e React Hook Form',
    'Next.js e Server Components',
    'Acessibilidade (a11y) no React',
  ],
  Angular: [
    'Componentes, templates e data binding',
    'Services, DI e RxJS',
    'Roteamento (Router) e guards',
    'Formulários reativos e validação',
    'Signals, change detection e performance',
    'NgRx e estado reativo',
    'HTTP Client e interceptors',
    'Testes unitários e de componente',
    'Standalone components (Angular moderno)',
    'Internacionalização (i18n)',
  ],
  Flutter: [
    'Widgets (Stateless vs Stateful)',
    'Layout (Row, Column, Stack, ListView)',
    'Gerenciamento de estado (setState, Provider)',
    'Navegação e rotas',
    'Async, Futures e integração com APIs',
    'Animações e transições',
    'Temas, Material e Cupertino',
    'Persistência local (SharedPreferences)',
    'Testes de widget e integração',
    'Build e publicação (Android/iOS)',
  ],
  Javascript: [
    'Tipos, variáveis e escopo (let, const)',
    'Funções, arrow functions e closures',
    'Arrays, objetos e métodos modernos (map, filter)',
    'Promises, async/await e fetch',
    'ES Modules, classes e padrões de código',
    'DOM, eventos e manipulação da página',
    'TypeScript para desenvolvedores JS',
    'Testes com Jest ou Vitest',
    'Node.js essencial (módulos, APIs)',
    'Debugging e Chrome DevTools',
  ],
};

export function isStudyTopic(value: string): value is StudyTopic {
  return (studyTopics as readonly string[]).includes(value);
}

export function getStudySuggestions(topic: string): readonly string[] {
  if (isStudyTopic(topic)) {
    return studyTopicSuggestions[topic];
  }

  return [];
}

export function resolveStudyTopicParam(topic: string | undefined): StudyTopic | null {
  const value = topic?.trim() ?? '';
  return isStudyTopic(value) ? value : null;
}

export const currentStudy = {
  topic: 'React' as StudyTopic,
  title: 'React Hooks',
  day: 3,
};
