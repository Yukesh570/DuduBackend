import { autoInjectable } from "tsyringe";
import { NextFunction, Request, Response } from "express";
import {
  ProductCreateBody,
  ProductEditBody,
} from "controller/dataClass/serviceList/productDataClass";
import { validateBodyInput } from "controller/helper/validate";
import { ProductDao } from "dao/serviceList/productDao";

@autoInjectable()
export class ProductController {
  constructor(private productDao: ProductDao) {}
  /**
   @desc Create product
   @route POST /api/product/create
   @access private
   **/
  create = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    const { validatedData: validBody, errors } = await validateBodyInput(
      req,
      ProductCreateBody
    );
    if (errors) return res.status(400).json(errors);
    // if (req.user.userType !== "admin")
    //   return res.status(401).json({ message: "Unauthorized" });
    const product = await this.productDao.create({
      ...validBody,
    });

    res.status(200).json({
      status: "success",
      data: product,
    });
  };
  /**
   @desc Create product
   @route put /api/product/edit:id
   @access private
   **/
  edit = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    const id = Number(req.params.id);
    const { validatedData: validBody, errors } = await validateBodyInput(
      req,
      ProductEditBody
    );
    if (errors) return res.status(400).json(errors);

    const product = await this.productDao.update(id, { ...validBody });
    res.status(200).json({
      status: "success",
      data: product,
    });
  };

  /**
   @desc Create product
   @route delete /api/product/delete:id
   @access private
   **/

  delete = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    const id = Number(req.params.id);
    const product = await this.productDao.delete(id);
    if (!product.affected) return res.status(400).json("Data not found");
    res.status(200).json({
      status: "Success",
    });
  };

  /**
   @desc Create product
   @route get /api/product/getRandom
   @access private
   **/

  getRandom = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    const product = await this.productDao.repository
      .createQueryBuilder("product")
      .orderBy("RANDOM()")
      .limit(2)
      .getMany();
    res.status(200).json({
      status: "success",
      data: product,
    });
  };

  /**
   @desc Create product
   @route get /api/product/getByPanel
   @access private
   **/

  getbypanel = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    const query = req.query;
  };

  /**
   @desc Create product
   @route get /api/product/getByPanel
   @access private
   **/

  getAll = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    const product = await this.productDao.getAll();
    res.status(200).json({
      status: "success",
      data: product,
    });
  };
}
