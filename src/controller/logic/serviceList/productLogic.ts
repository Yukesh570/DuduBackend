import { autoInjectable } from "tsyringe";
import { NextFunction, Request, Response } from "express";
import {
  ProductCreateBody,
  ProductEditBody,
} from "../../dataClass/serviceList/productDataClass";
import { validateBodyInput } from "../../../controller/helper/validate";
import { ProductDao } from "../../../dao/serviceList/productDao";
import { categoryType } from "../../../entity/enum/category";
import { ServiceDao } from "../../../dao/serviceDao";
import path from "path";
import fs from "fs";
import { Product } from "entity/serviceList/ProductModel";

@autoInjectable()
export class ProductController {
  constructor(private productDao: ProductDao, private serviceDao: ServiceDao) {}
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
    const oderdata = await this.productDao.repository.findOne({
  where: {},
  order: { order: 'DESC' },
  select: ['order'],
});
    const categoryData = await this.serviceDao.repository.findOne({
      where: { name: validBody.category },
    });
    // Check if files are uploaded
    const imageFile = (req.files as any)?.image?.[0];
    if (!imageFile) {
      return res.status(400).json({ status: 'fail', message: 'Image file is required' });
    }
    const videoFile = (req.files as any)?.video?.[0];
    if (!videoFile) {
      return res.status(400).json({ status: 'fail', message: 'Video file is required' });
    }

    const data = {
      ...validBody,
      image:imageFile.path.replace(/\\/g, "/").split('/public/')[1],
      video: videoFile.path.replace(/\\/g, "/").split('/public/')[1],

order: Math.floor(oderdata ? oderdata.order + 1 : 1),
      serviceId: categoryData ? categoryData.id : 1,
    };
    console.log('Product create data:', data);

    if (errors) return res.status(400).json(errors);
    // if (req.user.userType !== "admin")
    //   return res.status(401).json({ message: "Unauthorized" });
    const product = await this.productDao.create({
      ...data,
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
   // Prepare update data object from validBody
  const updateData: Partial<Product> = { ...validBody };

  // Find existing product to get current image/video paths
  const existingProduct = await this.productDao.repository.findOneBy({ id });
  if (!existingProduct) {
    return res.status(404).json({ status: "fail", message: "Product not found" });
  }

  // Check if new image file uploaded
  const imageFile = (req.files as any)?.image?.[0];
  if (imageFile) {
    // Delete old image file if exists
    if (existingProduct.image) {
      const oldImagePath = path.join(__dirname, "../../../../public", existingProduct.image);
      fs.unlink(oldImagePath, (err: any) => {
        if (err) console.error("Error deleting old image file:", err);
      });
    }

    // Save new relative path
    updateData.image = imageFile.path.replace(/\\/g, "/").split("/public/")[1];
  }

  // Check if new video file uploaded
  const videoFile = (req.files as any)?.video?.[0];
  if (videoFile) {
    // Delete old video file if exists
    if (existingProduct.video) {
      const oldVideoPath = path.join(__dirname, "../../../../public", existingProduct.video);
      fs.unlink(oldVideoPath, (err: any) => {
        if (err) console.error("Error deleting old video file:", err);
      });
    }

    // Save new relative path
    updateData.video = videoFile.path.replace(/\\/g, "/").split("/public/")[1];
  }
  if (Object.keys(updateData).length > 0) {

    const product = await this.productDao.update(id, {...updateData });
    res.status(200).json({
      status: "success",
      data: product,
    });
  }
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
      if (!id) {
        return res
          .status(400)
          .json({ status: "fail", message: "params is required" });
      }
      const products = await this.productDao.getOne(id);
      res.status(200).json({
        status: "success",
        data: products,
      });
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
        return res
          .status(400)
          .json({ status: "fail", message: "ids query param is required" });
      }
      const ids = idsParam
        .split(",")
        .map((idStr) => Number(idStr))
        .filter((id) => !isNaN(id));
      if (ids.length === 0) {
        return res
          .status(400)
          .json({ status: "fail", message: "valid ids are required" });
      }

      const products = await this.productDao.getMultiple(ids);
      res.status(200).json({
        status: "success",
        data: products,
      });
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
   @route get /api/product/all
   @access private
   **/

  getAll = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    const name = req.query.name as string | undefined;
    const product = await this.productDao.getAll();
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
