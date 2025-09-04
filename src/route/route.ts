
import express from "express";
import { productRoute } from "./serviceList/productRoute";
import { serviceRoute } from "./service/serviceRoute";
import { authRoute } from "./auth/auth";
import { cartRoute } from "./cartRoute";
import { orderRoute } from "./orderRoute";
import { initiateKhaltiPayment } from "controller/logic/khaltiPayment/khalti";
import { tenantRoute } from "./tenantRoute";

const router =express.Router();

router.use("/service", serviceRoute());
router.use("/product", productRoute());

router.use("/auth", authRoute());
router.use("/cart", cartRoute());
router.use("/order", orderRoute());
router.use("/tenant", tenantRoute());

router.post("/khalti/initiate", async (req, res) => {
  try {
    const pidx = await initiateKhaltiPayment();
    res.json({ pidx });
  } catch (error) {
    res.status(500).json({ error: "Failed to initiate Khalti payment" });
  }
});



export {router}