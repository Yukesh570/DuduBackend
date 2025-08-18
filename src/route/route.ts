
import express from "express";
import { productRoute } from "./serviceList/productRoute";
import { serviceRoute } from "./service/serviceRoute";
import { authRoute } from "./auth/auth";
import { cartRoute } from "./cartRoute";

const router =express.Router();

router.use("/service", serviceRoute());
router.use("/product", productRoute());

router.use("/auth", authRoute());
router.use("/cart", cartRoute());


export {router}