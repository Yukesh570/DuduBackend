import "reflect-metadata";
import { DataSource } from "typeorm";
import * as dotenv from "dotenv";
import { User } from "./entity/users/user";
dotenv.config({path:"./.env"});

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.POSTGRES_HOST,
    port: parseInt(process.env.POSTGRES_PORT),
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    synchronize: false, 
    logging: false,
    entities: [__dirname + "/entity/**/*{.ts,.js}"],
    migrations: [__dirname + "/migration/**/*{.ts,.js}"],

      ssl: {
    rejectUnauthorized: false,
  },
});

