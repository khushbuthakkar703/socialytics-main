declare global {
  namespace NodeJS {
    interface ProcessEnv {
      GITHUB_AUTH_TOKEN: string;
      NODE_ENV: "development" | "production";
      PORT?: string;
      PWD: string;
      NEXT_PUBLIC_STYTCH_PUBLIC_TOKEN: string;
      STYTCH_SECRET: string;
      STYTCH_PROJECT_ID: string;
      NEXT_PUBLIC_STYTCH_PROJECT_ENV: string;
      BACKEND_API_URL: string;
      MACHINE_TOKEN: string;
      REDIS_TOKEN: string;
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};
