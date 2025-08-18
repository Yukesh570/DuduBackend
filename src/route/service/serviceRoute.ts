import { ServiceController } from "controller/logic/serviceLogic";
import { Router } from "express";
import { catchAsync } from "route/helper/catchAsync";

// import { protect } from "../middleware/auth";



export function serviceRoute(): Router {
  //@ts-expect-error
  const controller = new ServiceController();

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
    "/getAll",
    catchAsync(controller.getAll)
  )

  router.delete("/delete/:id", 
    // protect(),
     catchAsync(controller.delete));

  return router;
}
