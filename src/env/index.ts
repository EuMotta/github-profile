import { z } from 'zod';

const envSchema = z.object({
  FULL_URL: z.string().url().default('http://localhost:3000'),
  API_URL: z.string().url().default('https://api.github.com'),
  GITHUB_TOKEN: z.string().min(1),
});

export const env = envSchema.parse({
  FULL_URL: process.env.FULL_URL,
  API_URL: process.env.API_URL,
  GITHUB_TOKEN: process.env.GITHUB_TOKEN,
});
