import type { StudyTopic } from '../study';
import { studyTopicSuggestions } from '../study';

import { angularQuestions } from './angular';
import { flutterQuestions } from './flutter';
import { jsQuestions } from './javascript';
import { reactQuestions } from './react';

const questionsByTopic: Record<StudyTopic, Record<string, readonly string[]>> = {
  React: reactQuestions,
  Angular: angularQuestions,
  Flutter: flutterQuestions,
  Javascript: jsQuestions,
};

function buildFallbackQuestions(topic: StudyTopic, focus: string): readonly string[] {
  return [
    `O que é ${focus} e por que é importante em ${topic}?`,
    `Me explique ${focus} com um exemplo simples.`,
    `Quais erros comuns ao estudar ${focus}?`,
    `Como praticar ${focus} em um projeto real?`,
    `Me dê um exercício curto sobre ${focus}.`,
    `Como ${focus} aparece em entrevistas técnicas?`,
    `Recursos gratuitos para aprofundar ${focus}?`,
    `Compare ${focus} com uma alternativa em ${topic}.`,
  ];
}

export function getStudyQuestionSuggestions(topic: StudyTopic, focus: string): readonly string[] {
  const questions = questionsByTopic[topic][focus];
  if (questions?.length) {
    return questions;
  }

  return buildFallbackQuestions(topic, focus);
}

export function isValidStudyFocus(topic: StudyTopic, focus: string): boolean {
  return (studyTopicSuggestions[topic] as readonly string[]).includes(focus);
}
