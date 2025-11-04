import { LoginLogic } from "../../controller/logic/auth/loginLogic";
import { Router } from "express";
import { catchAsync } from "../../route/helper/catchAsync";
import { UserController } from "../../controller/logic/auth/userLogic";
import { protect } from "../../middleware/auth";

export function userRoute(): Router {
  //@ts-ignore
  const controller = new UserController();
  const router = Router();


//   router.get("/getOne/:id/", catchAsync(controller.getOne));
  router.put("/edit/:id/",protect(), catchAsync(controller.edit));
  router.put("/changePassword/:id/",protect(), catchAsync(controller.changePassword));
  router.get("/getOne/:id/",protect(), catchAsync(controller.getOne));
  router.get("/getAll/",protect(), catchAsync(controller.getAll));


  return router;
}
