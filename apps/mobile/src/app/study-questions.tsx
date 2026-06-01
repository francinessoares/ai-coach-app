import { Redirect, useLocalSearchParams } from 'expo-router';

import { StudyQuestionsScreen } from '@/components/study/study-questions-screen';
import { resolveStudyTopicParam } from '@/config/study';
import { isValidStudyFocus } from '@/config/study/questions';

export default function StudyQuestionsRoute() {
  const { topic, focus } = useLocalSearchParams<{ topic?: string; focus?: string }>();
  const studyTopic = resolveStudyTopicParam(topic);
  const studyFocus = focus?.trim() ?? '';

  if (!studyTopic || !isValidStudyFocus(studyTopic, studyFocus)) {
    return <Redirect href="/study" />;
  }

  return <StudyQuestionsScreen topic={studyTopic} focus={studyFocus} />;
}
