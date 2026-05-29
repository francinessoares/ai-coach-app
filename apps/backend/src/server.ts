import './config/env';

import cors from 'cors';
import express from 'express';
import os from 'node:os';

import { routes } from './routes';

const app = express();
app.use(cors());
app.use(express.json({ limit: '1mb' }));

app.use(routes);

const port = Number(process.env.PORT ?? 3001);
const host = process.env.HOST ?? '0.0.0.0';

function getLanAddresses(): string[] {
  const interfaces = os.networkInterfaces();
  const addresses: string[] = [];

  for (const entries of Object.values(interfaces)) {
    if (!entries) continue;
    for (const entry of entries) {
      if (entry.family === 'IPv4' && !entry.internal) {
        addresses.push(entry.address);
      }
    }
  }

  return addresses;
}

app.listen(port, host, () => {
  console.log(`AI Coach API listening on http://localhost:${port}`);
  const lan = getLanAddresses();
  if (lan.length > 0) {
    console.log('Expo Go (celular na mesma Wi‑Fi):');
    for (const ip of lan) {
      console.log(`  → http://${ip}:${port}`);
    }
  }
});
