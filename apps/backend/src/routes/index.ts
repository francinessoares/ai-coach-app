import { Router } from 'express';

import { chatRouter } from './chat.routes';
import { healthRouter } from './health.routes';

export const routes = Router();

routes.use('/health', healthRouter);
routes.use('/api/chat', chatRouter);
