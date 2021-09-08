import "reflect-metadata";
import { createConnection } from "typeorm"
import { __PROD__ } from "./constants";
import "dotenv-safe/config"
import { User } from "./entities/User";
import express from "express"


const main = async () => {

    createConnection({
        type: "postgres",
        host: process.env.POSTGRES_HOST,
        port: parseInt(process.env.POSTGRES_PORT || ""),
        username: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASS,
        database: process.env.POSTGRES_DB,
        logging: !__PROD__, // False in production
        synchronize: !__PROD__ ,// False in production environment
        entities: [User]
    })

    // Setup expres server
    const app =  express();

    app.get("/", (_,res) => {
        res.send("Hello World !!");
    })

    app.listen(parseInt(process.env.SERVER_PORT || ""),() => {
        console.log("Server is up !!");
    })

}

main().catch((error) => {
    console.log("Main Error ==> ",error)
})
