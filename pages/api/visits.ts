import type { NextApiRequest, NextApiResponse } from 'next';
import { Redis } from '@upstash/redis';

const VISITS_KEY = 'octodashboard:visits';

const redis = new Redis({
  url: process.env.KV_REST_API_URL as string,
  token: process.env.KV_REST_API_TOKEN as string,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const count = req.method === 'POST' ? await redis.incr(VISITS_KEY) : ((await redis.get<number>(VISITS_KEY)) ?? 0);
    res.status(200).json({ count });
  } catch (err) {
    console.error('Error:', err);
    res.status(200).json({ count: null });
  }
}
