import { Router } from 'express';

import { postInterviewEvaluate } from '../controllers/interview.controller';

export const interviewRouter = Router();

interviewRouter.post('/evaluate', postInterviewEvaluate);
