import { CartController } from "../controller/logic/cartLogic";
import { Router } from "express";
import { protect } from "../middleware/auth";
import { catchAsync } from "../route/helper/catchAsync";

// import { protect } from "../middleware/auth";


CartController
export function cartRoute(): Router {
  //@ts-expect-error
  const controller = new CartController();

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
    "/getAll",
    protect(),

    catchAsync(controller.getAll)
  )

  router.delete("/delete/:id", 
    protect(),
     catchAsync(controller.delete));

  return router;
}
