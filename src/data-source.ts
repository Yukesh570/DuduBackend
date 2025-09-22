import "reflect-metadata";
import { DataSource } from "typeorm";
import * as dotenv from "dotenv";

dotenv.config({ path: "./.env" });

const isLocal = process.env.ENV === "local";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.POSTGRES_HOST,
  port: parseInt(process.env.POSTGRES_PORT || "5432"),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  synchronize: false,
  logging: false,
  entities: isLocal
    ? ["src/entity/**/*.ts"]
    : ["dist/entity/**/*.js"],
  migrations: isLocal
    ? ["src/migration/*.ts"]
    : ["dist/migration/*.js"],
  ssl: {
    rejectUnauthorized: false,
  },
});
