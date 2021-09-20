declare namespace NodeJS {
  interface ProcessEnv {
    POSTGRES_HOST: string;
    POSTGRES_USER: string;
    POSTGRES_PASS: string;
    POSTGRES_DB: string;
    POSTGRES_PORT: string;
    SERVER_PORT: string;
    REDIS_SESSION_SECRET: string;
    RAZORPAY_KEY: string;
    RAZORPAY_SECRET: string;
    RAZORPAY_WEBHOOK_SECRET: string;
    WEB_APP_URL: string;
    MAIL_ID: string;
    MAIL_PASS: string;
  }
}
