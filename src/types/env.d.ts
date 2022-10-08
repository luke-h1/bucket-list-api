declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DATABASE_URL: string;
      JWT_SECRET: string;
      SALT_WORK_FACTOR: string;
    }
  }
}

export {};
