import "reflect-metadata";
import { DataSource } from "typeorm";
import * as path from "path";
import * as dotenv from "dotenv";
import { User } from "./entity/users/user";
import { Product } from "./entity/serviceList/ProductModel";

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
    User,Product
  ],
  migrations: [
    isProd
      ? path.join(__dirname, "migration/**/*.{js}") 
      : path.join(__dirname, "../src/migration/**/*.{ts,js}")
  ],
  ssl: {
    rejectUnauthorized: false,
  },
});
