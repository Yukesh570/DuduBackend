// import { autoInjectable } from "tsyringe";
// import { NextFunction, Request, Response } from "express";
// import { validateBodyInput } from "controller/helper/validate";
// import { FoodDao } from "dao/serviceList/foodDao";
// import { FoodCreateBody, FoodEditBody } from "controller/dataClass/serviceList/foodDataClass";
// // import { validateBodyInput } from "controller/helper/validate";

// @autoInjectable()
// export class FoodController {
//   constructor(private foodDao: FoodDao) {}
//   /**
//    @desc Create food
//    @route POST /api/food/create
//    @access private
//    **/
//   create = async (
//     req: Request,
//     res: Response,
//     next: NextFunction
//   ): Promise<any> => {
//     const { validatedData: validBody, errors } = await validateBodyInput(
//       req,
//       FoodCreateBody
//     );
//     if (errors) return res.status(400).json(errors);
//     // if (req.user.userType !== "admin")
//     //   return res.status(401).json({ message: "Unauthorized" });
//     const food = await this.foodDao.create({
//       ...validBody,
//     });

//     res.status(200).json({
//       status: "success",
//       data: food,
//     });
//   };
//   /**
//    @desc Create food
//    @route put /api/food/edit:id
//    @access private
//    **/
//   edit = async (
//     req: Request,
//     res: Response,
//     next: NextFunction
//   ): Promise<any> => {
//     const id = Number(req.params.id);
//     const { validatedData: validBody, errors } = await validateBodyInput(
//       req,
//       FoodEditBody
//     );
//     if (errors) return res.status(400).json(errors);

//     const food = await this.foodDao.update(id, { ...validBody });
//     res.status(200).json({
//       status: "success",
//       data: food,
//     });
//   };

//   /**
//    @desc Create food
//    @route delete /api/food/delete:id
//    @access private
//    **/

//   delete = async (
//     req: Request,
//     res: Response,
//     next: NextFunction
//   ): Promise<any> => {
//     const id = Number(req.params.id);
//     const food = await this.foodDao.delete(id);
//     if (!food.affected) return res.status(400).json("Data not found");
//     res.status(200).json({
//       status: "Success",
//     });
//   };

//   /**
//    @desc Create food
//    @route get /api/food/getRandom
//    @access private
//    **/

//   getRandom = async (
//     req: Request,
//     res: Response,
//     next: NextFunction
//   ): Promise<any> => {
//     const food=await this.foodDao.repository
//     .createQueryBuilder("food")
//     .orderBy("RANDOM()")
//     .limit(2)
//     .getMany();
//  res.status(200).json({
//       status: "success",
//       data: food,
//     });

//   };

//     /**
//    @desc Create food
//    @route get /api/food/getByPanel
//    @access private
//    **/

//   getAll = async (
//     req: Request,
//     res: Response,
//     next: NextFunction
//   ): Promise<any> => {
//     const food=await this.foodDao.getAll();
//  res.status(200).json({
//       status: "success",
//       data: food,
//     });
//   };
// }