import "reflect-metadata";
import { DataSource } from "typeorm";
import * as path from "path";
import * as dotenv from "dotenv";
import { User } from "./entity/users/user";
import { Product } from "./entity/serviceList/ProductModel";

dotenv.config({ path: "./.env" });

const isProd = process.env.NODE_ENV === "production";

let entitiesList;

if (isProd) {
  // Import compiled JS entities dynamically
  entitiesList = [
    require("../dist/entity/users/user").User,
    require("../dist/entity/serviceList/ProductModel").Product,
  ];
} else {
  // Import TS entities for development
  entitiesList = [
    require("./entity/users/user").User,
    require("./entity/serviceList/ProductModel").Product,
  ];
}
console.log("NODE_ENV: ", process.env.NODE_ENV);
console.log("Entities path: ", process.env.NODE_ENV === "production" ? "dist/entity/**/*.js" : "src/entity/**/*.ts");
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
    User, Product, /* All other entity classes */
  ],
  migrations: entitiesList,

  ssl: {
    rejectUnauthorized: false,
  },
});
