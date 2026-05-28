import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';

import { routes } from './routes';

dotenv.config();

const port = Number(process.env.PORT ?? 3001);
const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(port, () => {
  console.log(`AI Coach API listening on http://localhost:${port}`);
});
