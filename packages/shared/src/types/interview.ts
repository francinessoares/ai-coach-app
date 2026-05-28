export type InterviewResult = {
  scores: {
    clarity: number;
    depth: number;
    communication: number;
  };
  feedback: string;
  improvements: string[];
};
