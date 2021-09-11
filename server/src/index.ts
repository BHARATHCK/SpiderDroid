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

const main = async () => {
  createConnection({
    type: "postgres",
    host: process.env.POSTGRES_HOST,
    port: parseInt(process.env.POSTGRES_PORT || ""),
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASS,
    database: process.env.POSTGRES_DB,
    //logging: !__PROD__, // False in production
    synchronize: !__PROD__, // False in production environment
    entities: [User, Post],
  });

  // Setup expres server
  const app = express();

  // Redis Client
  const redis = new Redis();

  // Redis store
  const redisStore = connectRedis(session);

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

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver, UserResolver, PostResolver],
      validate: false,
    }),
    context: ({ req, res }) => ({ req, res, redis }),
  });

  // Start apolloServer
  await apolloServer.start();

  // Apply to express middleware
  apolloServer.applyMiddleware({ app });

  app.listen(parseInt(process.env.SERVER_PORT || ""), () => {
    console.log("Server is up !!");
  });
};

main().catch((error) => {
  console.log("Main Error ==> ", error);
});
