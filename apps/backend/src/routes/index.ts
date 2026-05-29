import { Router } from 'express';

import { aiTestRouter } from './ai-test.routes';
import { chatRouter } from './chat.routes';
import { healthRouter } from './health.routes';
import { interviewRouter } from './interview.routes';

export const routes = Router();

routes.use('/health', healthRouter);
routes.use('/api/chat', chatRouter);
routes.use('/api/interview', interviewRouter);
routes.use('/ai-test', aiTestRouter);
