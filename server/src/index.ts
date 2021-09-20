import "reflect-metadata";
import { createConnection } from "typeorm";
import { __PROD__ } from "./constants";
import "dotenv-safe/config";
import { User } from "./entities/User";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { HelloResolver } from "./resolvers/hello";
import { UserResolver } from "./resolvers/user";
import { Post } from "./entities/Post";
import { PostResolver } from "./resolvers/post";
import Redis from "ioredis";
import session from "express-session";
import connectRedis from "connect-redis";
import { Destination } from "./entities/Destination";
import Razorpay from "razorpay";
import { Payment } from "./entities/Payment";
import bodyParser from "body-parser";
import cors from "cors";
import { Bookings } from "./entities/Bookings";
import { CarDetails } from "./entities/CarDetails";

const main = async () => {
  createConnection({
    type: "postgres",
    host: process.env.POSTGRES_HOST,
    port: parseInt(process.env.POSTGRES_PORT || ""),
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASS,
    database: process.env.POSTGRES_DB,
    logging: true, // False in production
    synchronize: true, // False in production environment
    entities: [User, Post, Destination, Payment, Bookings, CarDetails],
  });

  // Setup expres server
  const app = express();

  // create application/json parser
  const jsonParser = bodyParser.json();

  // Redis Client
  const redis = new Redis({
    host: process.env.REDIS_DB_HOST,
    password: process.env.REDIS_DB_PASSWORD,
    port: parseInt(process.env.REDIS_DB_PORT ? process.env.REDIS_DB_PORT : ""),
  });

  // Redis store
  const redisStore = connectRedis(session);

  // cors
  const corsOptions = {
    origin: [process.env.WEB_APP_URL || "", "https://studio.apollographql.com"],
    credentials: true, // <-- REQUIRED backend setting
  };

  app.set("trust proxy", 1);

  // set cors
  app.use(cors(corsOptions));

  // Redis session
  app.use(
    session({
      name: process.env.COOKIE_NAME,
      // eslint-disable-next-line new-cap
      store: new redisStore({
        client: redis,
        disableTouch: true, // Need it alive forever, need not reset based on user behaviour
      }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10,
        httpOnly: false,
        secure: __PROD__, //cookie only in https
        sameSite: "none",
        domain: __PROD__ ? ".vercel.app" : undefined, // inproduction
      },
      saveUninitialized: false,
      secret: process.env.REDIS_SESSION_SECRET || "",
      resave: false,
    }),
  );

  // initialize Razorpay
  const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY,
    key_secret: process.env.RAZORPAY_SECRET,
  });

  const apolloServer = new ApolloServer({
    introspection: true,
    schema: await buildSchema({
      resolvers: [HelloResolver, UserResolver, PostResolver],
      validate: false,
    }),
    context: ({ req, res }) => ({ req, res, redis, razorpay }),
  });

  // Start apolloServer
  await apolloServer.start();

  // Apply to express middleware
  apolloServer.applyMiddleware({ app, cors: false });

  // Rarzorpy WebHook API - Rest
  app.post("/payment-verification", jsonParser, (req, res) => {
    // do a validation
    const secret = process.env.RAZORPAY_WEBHOOK_SECRET;

    const crypto = require("crypto");

    const shasum = crypto.createHmac("sha256", secret);
    shasum.update(JSON.stringify(req.body));
    const digest = shasum.digest("hex");

    if (digest === req.headers["x-razorpay-signature"]) {
      // process - update it in DB.
      Payment.createQueryBuilder()
        .update("payment")
        .set({ verificationStatus: true })
        // eslint-disable-next-line quotes
        .where('"orderId" = :id', { id: req.body.payload.payment.entity.order_id })
        .execute();

      // Update booking table
      Bookings.createQueryBuilder()
        .update("bookings")
        .set({ bookingStatus: "Success" })
        // eslint-disable-next-line quotes
        .where('"orderId" = :id', { id: req.body.payload.payment.entity.order_id })
        .execute();
    } else {
      // order specific signature verification failed update payment and booking table
      Payment.createQueryBuilder()
        .update("payment")
        .set({ verificationStatus: false })
        // eslint-disable-next-line quotes
        .where('"orderId" = :id', { id: req.body.payload.payment.entity.order_id })
        .execute();

      // Update booking table
      Bookings.createQueryBuilder()
        .update("bookings")
        .set({ bookingStatus: "Failed" })
        // eslint-disable-next-line quotes
        .where('"orderId" = :id', { id: req.body.payload.payment.entity.order_id })
        .execute();
    }
    res.json({ status: "ok" });
  });

  app.listen(parseInt(process.env.SERVER_PORT || ""), () => {
    console.log("Server is up !!");
  });
};

main().catch((error) => {
  console.log("Main Error ==> ", error);
});
