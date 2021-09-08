import "reflect-metadata";
import { createConnection } from "typeorm"
import { __PROD__ } from "./constants";
import "dotenv-safe/config"


const main = async () => {

    createConnection({
        type: "postgres",
        host: process.env.POSTGRES_HOST,
        port: parseInt(process.env.POSTGRES_PORT),
        username: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASS,
        database: process.env.POSTGRES_DB,
        synchronize: !__PROD__ ,// False in production environment
        entities: []
    })

}

main().catch((error) => {
    console.log("Main Error ==> ",error)
})
