import { CartController } from "controller/logic/cartLogic";
import { OrderController } from "controller/logic/orderLogic";
import { PaymentController } from "../controller/logic/paymentLogic";
import { Router } from "express";
import { protect } from "../middleware/auth";
import { catchAsync } from "../route/helper/catchAsync";

// import { protect } from "../middleware/auth";


export function paymentRoute(): Router {
  //@ts-expect-error
  const controller = new PaymentController();

  const router = Router();

  router.post(
    "/create",
    protect(),

    catchAsync(controller.create)
  );

  router.put(
    "/edit/:id",
    protect(),

    catchAsync(controller.edit)
  );
router.get(
    "/get/:userId/:selectedItems",

    catchAsync(controller.getbypanel)
  )

  router.get(
    "/failure/get/:userId/:selectedItems",

    catchAsync(controller.getbypanel)
  )
//   router.get(
//     "/getAll",
//     protect(),

//     catchAsync(controller.getAll)
//   )

//   router.delete("/delete/:id", 
//     protect(),
//      catchAsync(controller.delete));

  return router;
}
