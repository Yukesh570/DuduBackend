import { LoginLogic } from "controller/logic/auth/loginLogic";
import { Router } from "express";
import { catchAsync } from "route/helper/catchAsync";

export function authRoute(): Router {
  //@ts-ignore
  const controller = new LoginLogic();
  const router = Router();

  router.post("/login", catchAsync(controller.login));

  router.post("/customer/register", catchAsync(controller.createCustomer));
  router.post("/admin/register", catchAsync(controller.createAdmin));

  return router;
}