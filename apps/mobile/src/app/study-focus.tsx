import { Redirect, useLocalSearchParams } from 'expo-router';

import { StudyFocusScreen } from '@/components/study/study-focus-screen';
import { resolveStudyTopicParam } from '@/config/study';

export default function StudyFocusRoute() {
  const { topic } = useLocalSearchParams<{ topic?: string }>();
  const studyTopic = resolveStudyTopicParam(topic);

  if (!studyTopic) {
    return <Redirect href="/study" />;
  }

  return <StudyFocusScreen topic={studyTopic} />;
}
