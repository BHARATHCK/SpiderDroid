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

const main = async () => {
  createConnection({
    type: "postgres",
    host: process.env.POSTGRES_HOST,
    port: parseInt(process.env.POSTGRES_PORT || ""),
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASS,
    database: process.env.POSTGRES_DB,
    logging: !__PROD__, // False in production
    synchronize: !__PROD__, // False in production environment
    entities: [User, Post, Destination, Payment],
  });

  // Setup expres server
  const app = express();

  // create application/json parser
  const jsonParser = bodyParser.json();

  // Redis Client
  const redis = new Redis({});

  // Redis store
  const redisStore = connectRedis(session);

  // cors
  // set cors
  app.use(
    cors({
      origin: [typeof process.env.WEB_APP_URL === "string" ? process.env.WEB_APP_URL : ""],
      credentials: true,
    }),
  );

  // Redis session
  app.use(
    session({
      name: "qid",
      // eslint-disable-next-line new-cap
      store: new redisStore({
        client: redis,
        disableTouch: true, // Need it alive forever, need not reset based on user behaviour
      }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10,
        httpOnly: true,
        secure: !!__PROD__, // Only in prod while https is available
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
    schema: await buildSchema({
      resolvers: [HelloResolver, UserResolver, PostResolver],
      validate: false,
    }),
    context: ({ req, res }) => ({ req, res, redis, razorpay }),
  });

  // Start apolloServer
  await apolloServer.start();

  // Apply to express middleware
  apolloServer.applyMiddleware({ app });

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
    } else {
      // pass it
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
