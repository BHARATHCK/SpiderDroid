import { Request, Response } from "express";
import { Redis } from "ioredis";

export type MyContext = {
  req: Request;
  redis: Redis;
  res: Response;
  razorpay: any;
};

declare module "express-session" {
  interface Session {
    user: string;
    userId: number;
  }
}
