import { useLocalSearchParams } from 'expo-router';

import { ChatScreen } from '@/components/chat/chat-screen';
import { resolveStudyTopicParam } from '@/config/study';
import { getStudyQuestionSuggestions } from '@/config/study/questions';

export default function StudySessionRoute() {
  const { topic, focus, day, questionIndex } = useLocalSearchParams<{
    topic?: string;
    focus?: string;
    day?: string;
    questionIndex?: string;
  }>();

  const studyTopic = topic?.trim() ?? '';
  const studyFocus = focus?.trim() ?? '';
  const studyLabel = studyFocus ? `${studyTopic}: ${studyFocus}` : studyTopic;
  const resolvedTopic = resolveStudyTopicParam(studyTopic);
  const parsedQuestionIndex = questionIndex !== undefined ? Number(questionIndex) : NaN;
  const selectedQuestion =
    resolvedTopic &&
    studyFocus &&
    Number.isInteger(parsedQuestionIndex) &&
    parsedQuestionIndex >= 0
      ? getStudyQuestionSuggestions(resolvedTopic, studyFocus)[parsedQuestionIndex]
      : undefined;

  const subtitle = day
    ? `Dia ${day} · ${studyLabel}`
    : studyFocus
      ? `${studyTopic} · ${studyFocus}`
      : studyTopic
        ? `Coach focado em ${studyTopic}`
        : 'Continue seu plano de estudos';

  const initialPrompt = day
    ? `Estou no ${studyLabel} (dia ${day}). Me ajude a continuar: `
    : selectedQuestion
      ? selectedQuestion
      : studyFocus
        ? `Quero estudar ${studyFocus} em ${studyTopic}. Me explique do básico com exemplos: `
        : studyTopic
          ? `Quero estudar ${studyTopic}. Por onde começo? `
          : undefined;

  return (
    <ChatScreen
      title={studyFocus || studyTopic || 'Sessão de estudo'}
      subtitle={subtitle}
      studyTopic={studyLabel || undefined}
      placeholder={
        studyLabel
          ? `Pergunte algo sobre ${studyLabel}...`
          : 'Continue estudando...'
      }
      initialPrompt={initialPrompt}
    />
  );
}
