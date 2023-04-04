import { z } from 'zod';

type EnvBaseSchema = Record<keyof UserDefineEnv, unknown>;

const envSchema = z.object({
  GITHUB_ID: z.string(),
  GITHUB_SECRET: z.string(),
  GOOGLE_CLIENT_ID: z.string(),
  GOOGLE_CLIENT_SECRET: z.string(),
  NEXTAUTH_SECRET: z.string(),
} satisfies EnvBaseSchema);

envSchema.parse(envSchema);
