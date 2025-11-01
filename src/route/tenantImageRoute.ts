import { CartController } from "controller/logic/cartLogic";
import { TenantController } from "../controller/logic/tenantLogic";
import { Router } from "express";
import { protect } from "../middleware/auth";
import { catchAsync } from "../route/helper/catchAsync";
import { TenantImageController } from "../controller/logic/tenantImageLogic";
import { uploadTenant } from "../controller/logic/serviceList/storage";

// import { protect } from "../middleware/auth";

TenantImageController
export function tenantImageRoute(): Router {
  //@ts-expect-error
  const controller = new TenantImageController();

  const router = Router();

  router.post(
    "/create",
    protect(),
     uploadTenant.fields([
    { name: 'image' ,maxCount:10},
    // { name: 'video', }
  ]),

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
  router.get(
    "/getByTenant/:id",
    protect(),

    catchAsync(controller.getByTenant)
  )

  router.delete("/delete/:id", 
    protect(),
     catchAsync(controller.delete));

  return router;
}
