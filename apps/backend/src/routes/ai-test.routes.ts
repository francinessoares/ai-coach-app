import { Router } from 'express';

import { postAiTest } from '../controllers/ai-test.controller';

export const aiTestRouter = Router();

aiTestRouter.post('/', postAiTest);
