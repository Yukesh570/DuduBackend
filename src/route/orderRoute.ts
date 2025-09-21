import { CartController } from "controller/logic/cartLogic";
import { OrderController } from "../controller/logic/orderLogic";
import { Router } from "express";
import { protect } from "../middleware/auth";
import { catchAsync } from "../route/helper/catchAsync";

// import { protect } from "../middleware/auth";


export function orderRoute(): Router {
  //@ts-expect-error
  const controller = new OrderController();

  const router = Router();

  router.post(
    "/create",
    protect(),

    catchAsync(controller.create)
  );

//   router.put(
//     "/edit/:id",
//     protect(),

//     catchAsync(controller.edit)
//   );
router.get(
    "/getOne/:id",
    protect(),

    catchAsync(controller.getbypanel)
  )
  router.get(
    "/getAll",
    protect(),

    catchAsync(controller.getAll)
  )

  router.delete("/delete/:id", 
    protect(),
     catchAsync(controller.delete));

  return router;
}
