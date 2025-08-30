import { autoInjectable } from "tsyringe";
import { NextFunction, Request, Response } from "express";
import {
  ProductCreateBody,
  ProductEditBody,
} from "controller/dataClass/serviceList/productDataClass";
import { validateBodyInput } from "controller/helper/validate";
import { ProductDao } from "dao/serviceList/productDao";
import { categoryType } from "entity/enum/category";

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
    const categories = ["Food", "Shop", "LiHaMoto"];
    const results: any[] = [];

    for (const category of categories) {
      const products = await this.productDao.repository
        .createQueryBuilder("product")
        .where("product.category = :category", { category })

        .orderBy("RANDOM()")
        .limit(2)
        .getMany();
      results.push(...products);
    }
    res.status(200).json({
      status: "success",
      data: results,
    });
  };

  /**
   @desc Create product
   @route get /api/product/getOne
   @access private
   **/

  getOne = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      const id = Number(req.params.id);
      if ( !id) {
        return res
          .status(400)
          .json({ status: "fail", message: "params is required" });
      }
      const products = await this.productDao.getOne(id);
      res.status(200).json({
        status:"success",
        data:products
      })
    } catch (error) {
      next(error);
    }
  };


  /**
   @desc getMultiple product
   @route get /api/product/getMultiple
   @access private
   **/

  getMultiple = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      const idsParam = req.query.ids as string;
      if (!idsParam) {
      return res.status(400).json({ status: "fail", message: "ids query param is required" });
    }
    const ids = idsParam.split(',').map(idStr => Number(idStr)).filter(id => !isNaN(id));
    if (ids.length === 0) {
      return res.status(400).json({ status: "fail", message: "valid ids are required" });
    }

      const products = await this.productDao.getMultiple(ids);
      res.status(200).json({
        status:"success",
        data:products
      })
    } catch (error) {
      next(error);
    }
  };

    /**
   @desc Create product
   @route get /api/product/getByname
   @access private
   **/

  getByName = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    const name = req.query.name as string | undefined;
    const product = await this.productDao.getByName(name);
    res.status(200).json({
      status: "success",
      data: product,
    });
  };


  /**
   @desc Create product
   @route get /api/product/getByCategory
   @access private
   **/

  getByCategory = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      // Assuming category is a URL param
      const category = req.params.category as categoryType;

      if (!category) {
        return res
          .status(400)
          .json({ status: "fail", message: "Category is required" });
      }

      const products = await this.productDao.getByCategory(category);

      res.status(200).json({
        status: "success",
        data: products,
      });
    } catch (error) {
      next(error);
    }
  };
}
