// import { autoInjectable } from "tsyringe";
// import { NextFunction, Request, Response } from "express";
// import { validateBodyInput } from "controller/helper/validate";
// import { LiHaMotoDao } from "dao/serviceList/lihamotoDao";
// import {
//   LihamotoCreateBody,
//   LihamotoEditBody,
// } from "controller/dataClass/serviceList/lihamotoDataClass";
// // import { validateBodyInput } from "controller/helper/validate";

// @autoInjectable()
// export class LiHaMotoController {
//   constructor(private lihamotoDao: LiHaMotoDao) {}
//   /**
//    @desc Create lihamoto
//    @route POST /api/lihamoto/create
//    @access private
//    **/
//   create = async (
//     req: Request,
//     res: Response,
//     next: NextFunction
//   ): Promise<any> => {
//     const { validatedData: validBody, errors } = await validateBodyInput(
//       req,
//       LihamotoCreateBody
//     );
//     if (errors) return res.status(400).json(errors);
//     // if (req.user.userType !== "admin")
//     //   return res.status(401).json({ message: "Unauthorized" });
//     const lihamoto = await this.lihamotoDao.create({
//       ...validBody,
//     });

//     res.status(200).json({
//       status: "success",
//       data: lihamoto,
//     });
//   };
//   /**
//    @desc Create lihamoto
//    @route put /api/lihamoto/edit:id
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
//       LihamotoEditBody
//     );
//     if (errors) return res.status(400).json(errors);

//     const lihamoto = await this.lihamotoDao.update(id, { ...validBody });
//     res.status(200).json({
//       status: "success",
//       data: lihamoto,
//     });
//   };

//   /**
//    @desc Create lihamoto
//    @route delete /api/lihamoto/delete:id
//    @access private
//    **/

//   delete = async (
//     req: Request,
//     res: Response,
//     next: NextFunction
//   ): Promise<any> => {
//     const id = Number(req.params.id);
//     const lihamoto = await this.lihamotoDao.delete(id);
//     if (!lihamoto.affected) return res.status(400).json("Data not found");
//     res.status(200).json({
//       status: "Success",
//     });
//   };

//   /**
//    @desc Create lihamoto
//    @route get /api/lihamoto/getByPanel
//    @access private
//    **/

//   getbypanel = async (
//     req: Request,
//     res: Response,
//     next: NextFunction
//   ): Promise<any> => {
//     const query = req.query;
//   };
//   /**
//    @desc Create lihamoto
//    @route get /api/lihamoto/getRandom
//    @access private
//    **/

//   getRandom = async (
//     req: Request,
//     res: Response,
//     next: NextFunction
//   ): Promise<any> => {
//     const lihamoto = await this.lihamotoDao.repository
//       .createQueryBuilder("food")
//       .orderBy("RANDOM()")
//       .limit(2)
//       .getMany();
//     res.status(200).json({
//       status: "success",
//       data: lihamoto,
//     });
//   };

//   /**
//    @desc Create lihamoto
//    @route get /api/lihamoto/getAll
//    @access private
//    **/

//   getAll = async (
//     req: Request,
//     res: Response,
//     next: NextFunction
//   ): Promise<any> => {
//     const lihamoto = await this.lihamotoDao.getAll();
//     res.status(200).json({
//       status: "success",
//       data: lihamoto,
//     });
//   };
// }
