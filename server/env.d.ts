declare namespace NodeJS {
  interface ProcessEnv {
    POSTGRES_HOST: string;
    POSTGRES_USER: string;
    POSTGRES_PASS: string;
    POSTGRES_DB: string;
    POSTGRES_PORT: string;
  }
}