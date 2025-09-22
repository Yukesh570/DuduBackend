import "reflect-metadata";
import { DataSource } from "typeorm";
import * as path from "path";
import * as dotenv from "dotenv";

dotenv.config({ path: "./.env" });

const isProd = process.env.NODE_ENV === "production";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.POSTGRES_HOST,
  port: parseInt(process.env.POSTGRES_PORT || "5432", 10),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  synchronize: false,
  logging: false,
  entities: [
    process.env.NODE_ENV === "production"
      ? "dist/entity/**/*.js"
      : "src/entity/**/*.ts",
  ],
  migrations: [
    process.env.NODE_ENV === "production"
      ? "dist/migration/**/*.js"
      : "src/migration/**/*.ts",
  ],

  ssl: {
    rejectUnauthorized: false,
  },
});
