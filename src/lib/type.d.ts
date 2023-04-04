interface UserDefineEnv {
  GOOGLE_CLIENT_ID: string;
  GOOGLE_CLIENT_SECRET: string;
  GITHUB_ID: string;
  GITHUB_SECRET: string;
  NEXTAUTH_SECRET: string;
}
declare namespace NodeJS {
  interface ProcessEnv extends Dict<string>, UserDefineEnv {}
}
