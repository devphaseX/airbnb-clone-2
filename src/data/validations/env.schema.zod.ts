import { z } from 'zod';

const EnvSchema = z.object({
  GOOGLE_CLIENT_ID: z.string(),
  GOOGLE_CLIENT_SECRET: z.string(),
  GITHUB_ID: z.string(),
  GITHUB_SECRET: z.string(),
  NEXTAUTH_SECRET: z.string(),
});

declare global {
  interface ProcessEnv extends z.infer<typeof EnvSchema> {}
}

const userDefinedEnv = EnvSchema.parse(process.env);

export { userDefinedEnv };
