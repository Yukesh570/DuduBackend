import "reflect-metadata";
import { DataSource } from "typeorm";
import * as dotenv from "dotenv";
dotenv.config({ path: "./.env" });

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.POSTGRES_HOST,
  port: parseInt(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  synchronize: false,
  logging: false,
  entities:
    process.env.ENV === "local" ? ["src/entity/**/*.ts"] : ["entity/**/*.js"],

  // entities: ["src/entity/**/*.ts"],  // Target compiled JavaScript files
  migrations:
    process.env.ENV === "local"
      ? ["src/migration/*.ts"]
      : ["migration/**/*.js"],
  // : ["dist/src/migration/*.js"],
  ssl: {
    rejectUnauthorized: false,
  },
});
