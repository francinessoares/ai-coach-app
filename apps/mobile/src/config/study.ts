export const studyTopics = ['React', 'Angular', 'Flutter', 'JS'] as const;

export type StudyTopic = (typeof studyTopics)[number];

export const currentStudy = {
  topic: 'React' as StudyTopic,
  title: 'React Hooks',
  day: 3,
};
