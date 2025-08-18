// import { LiHaMotoController } from "controller/logic/serviceList/lihamotoLogic";
// import { ShopController } from "controller/logic/serviceList/productLogic";
// import { Router } from "express";
// import { catchAsync } from "route/helper/catchAsync";

// // import { protect } from "../middleware/auth";

// export function lihamotoRoute(): Router {
//   //@ts-expect-error

//   const controller = new LiHaMotoController();

//   const router = Router();

//   router.post(
//     "/create",
//     // protect(),

//     catchAsync(controller.create)
//   );

//   router.put(
//     "/edit/:id",
//     // protect(),

//     catchAsync(controller.edit)
//   );

//     router.get(
//     "/getRandom",
//     catchAsync(controller.getRandom)
//   )

//   router.get(
//     "/getAll",
//     catchAsync(controller.getAll)
//   )

//   router.delete("/delete/:id", 
//     // protect(),
//      catchAsync(controller.delete));

//   return router;
// }