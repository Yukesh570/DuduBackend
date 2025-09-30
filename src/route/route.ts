import express from "express";
import { productRoute } from "./serviceList/productRoute";
import { serviceRoute } from "./service/serviceRoute";
import { authRoute } from "./auth/auth";
import { cartRoute } from "./cartRoute";
import { orderRoute } from "./orderRoute";
import { initiateKhaltiPayment } from "../controller/logic/khaltiPayment/khalti";
import { tenantRoute } from "./tenantRoute";
import { paymentRoute } from "./paymentRoute";

const router = express.Router();

router.use("/service", serviceRoute());
router.use("/product", productRoute());

router.use("/auth", authRoute());
router.use("/cart", cartRoute());
router.use("/order", orderRoute());
router.use("/tenant", tenantRoute());
router.use("/payment", paymentRoute());

router.post("/khalti/initiate/:userId/:selectedItems/:totalPrice", async (req, res) => {
  try {
    console.log("Selected Itemssdfasdfasfsdfs:");
    const userId = req.params.userId;
    const selectedItemsString = req.params.selectedItems;
    const totalPrice = req.params.totalPrice;
    console.log("Selected Items String:", selectedItemsString);
    console.log("User ID:", userId);
    let selectedItems: { id: string; quantity: number; price: number }[];
    console.log("selectedJsonselectedJson", selectedItemsString);
    console.log("totalPricetotalPricetotalPricetotalPricetotalPrice", totalPrice);

    try {
      selectedItems = JSON.parse(selectedItemsString);
          console.log("selectedItemsselectedItemsselectedItemsselectedItems", selectedItems);

    } catch (e) {
          console.log("asdfasdfsd", e);    

      return res.status(400).json({ error: "Invalid selectedItems format" });
    }
    const pidx = await initiateKhaltiPayment(userId, selectedItems,totalPrice);
    res.json({ pidx });
  } catch (error) {
    res.status(500).json({ error: "Failed to initiate Khalti payment" });
  }
});

export { router };
