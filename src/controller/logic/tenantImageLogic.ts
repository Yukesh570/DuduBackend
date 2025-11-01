import { autoInjectable } from "tsyringe";
import { NextFunction, Request, Response } from "express";
import { validateBodyInput } from "../../controller/helper/validate";

import { TenantImageDao } from "../../dao/tenantImageDao";
import {
  TenantImageCreateBody,
  TenantImageEditBody,
} from "../../controller/dataClass/tenantImageDataclass";
// import { validateBodyInput } from "controller/helper/validate";

@autoInjectable()
export class TenantImageController {
  constructor(private tenantImageDao: TenantImageDao) {}
  /**
   @desc Create tenantImage
   @route POST /api/tenantImage/create
   @access private
   **/
  create = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    console.log("imageFileimageFileima========geFile");

    const { validatedData: validBody, errors } = await validateBodyInput(
      req,
      TenantImageCreateBody
    );

    if (errors) return res.status(400).json(errors);
    // if (req.user.userType !== "admin")
    //   return res.status(401).json({ message: "Unauthorized" });
    const createdImages = [];

    const imageFiles = (req.files as any)?.image || [];
    // const videoFile = (req.files as any)?.video?.[0];
    console.log("Uploaded images:", imageFiles.length);

    if (imageFiles.length === 0) {
      return res.status(400).json({ message: "No image files uploaded" });
    }
    for (const file of imageFiles) {
      const imagePath = file.path.replace(/\\/g, "/").split("/public/")[1];
      const data = {
        ...validBody,
        image: imagePath,
      };

      console.log("TenantImage create data:", data);
      // if (videoFile) {
      //   data.video = videoFile.path.replace(/\\/g, "/").split("/public/")[1];
      // }
      const tenantImage = await this.tenantImageDao.create(data);
      createdImages.push(tenantImage);
    }

    res.status(200).json({
      status: "success",
      count: createdImages.length,
      data: createdImages,
    });
  };

  /**
   @desc Create tenantImage
   @route put /api/tenantImage/edit:id
   @access private
   **/
  edit = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    const user = req.user.userType;
    console.log("useruseruseruseruseruser", user);
    const id = Number(req.params.id);
    const { validatedData: validBody, errors } = await validateBodyInput(
      req,
      TenantImageEditBody
    );
    if (errors) return res.status(400).json(errors);
    const available = await this.tenantImageDao.findById(id);
    console.log("available", available);

    if (!available) {
      return res.status(400).json({
        status: "error",
        message: "Tenant not found",
      });
    }
    const cart = await this.tenantImageDao.update(id, { ...validBody });
    res.status(200).json({
      status: "success",
      data: cart,
    });
  };

  /**
   @desc Create tenantImage
   @route delete /api/tenantImage/delete:id
   @access private
   **/

  delete = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    const id = Number(req.params.id);
    const cart = await this.tenantImageDao.delete(id);
    if (!cart.affected) return res.status(400).json("Data not found");
    res.status(200).json({
      status: "Success",
    });
  };

  /**
   @desc Create tenantImage
   @route get /api/tenantImage/getByTenant
   @access private
   **/

  getByTenant = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    const id = Number(req.params.id);
    const data = await this.tenantImageDao.findByTenant(id);
    console.log("data", data);
    if (!data) return res.status(400).json("Data not found");
    res.status(200).json({
      status: "success",
      data: data,
    });
  };

  /**
   @desc Create tenantImage
   @route get /api/tenantImage/getAll
   @access private
   **/

  getAll = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    const userId = req.user.id;
    const tenant = await this.tenantImageDao.getAll(userId); // raw tenantImage items with product relation

    res.status(200).json({
      status: "success",
      data: tenant,
    });
  };
}
