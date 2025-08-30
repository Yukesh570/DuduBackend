import { ProductController } from "controller/logic/serviceList/productLogic";
import { Router } from "express";
import { catchAsync } from "route/helper/catchAsync";

// import { protect } from "../middleware/auth";

export function productRoute(): Router {
  //@ts-expect-error

  const controller = new ProductController();

  const router = Router();

  router.post(
    "/create",
    // protect(),

    catchAsync(controller.create)
  );

  router.put(
    "/edit/:id",
    // protect(),

    catchAsync(controller.edit)
  );

    router.get(
    "/getRandom",
    catchAsync(controller.getRandom)
  )

      router.get(
    "/getOne/:id",
    catchAsync(controller.getOne)
  )


  router.get(
    "/getByCategory/:category",
    catchAsync(controller.getByCategory)
  )
  router.get(
    "/getByName",
    catchAsync(controller.getByName)
  )
  router.get(
    "/getMultiple",
    catchAsync(controller.getMultiple)
  )

  router.delete("/delete/:id", 
    // protect(),
     catchAsync(controller.delete));

  return router;
}