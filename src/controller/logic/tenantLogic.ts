import { autoInjectable } from "tsyringe";
import { NextFunction, Request, Response } from "express";
import { validateBodyInput } from "../../controller/helper/validate";
import { TenantDao } from "../../dao/tenantDao";

import {
  TenantCreateBody,
  TenantEditBody,
} from "../../controller/dataClass/tenantDataclass";
import { TenantImageDao } from "../../dao/tenantImageDao";
// import { validateBodyInput } from "controller/helper/validate";

@autoInjectable()
export class TenantController {
  constructor(
    private tenantDao: TenantDao,
    private tenantImageDao: TenantImageDao
  ) {}
  /**
   @desc Create tenant
   @route POST /api/tenant/create
   @access private
   **/
  create = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    const { validatedData: validBody, errors } = await validateBodyInput(
      req,
      TenantCreateBody
    );

    if (errors) return res.status(400).json(errors);
    // if (req.user.userType !== "admin")
    //   return res.status(401).json({ message: "Unauthorized" });

    const tenant = await this.tenantDao.create({
      ...validBody,
      userId: req.user.id,
    });

    res.status(200).json({
      status: "success",
      data: tenant,
    });
  };
  /**
   @desc Create tenant
   @route put /api/tenant/edit:id
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
      TenantEditBody
    );
    if (errors) return res.status(400).json(errors);
    const available = await this.tenantDao.findById(id);
    console.log("available", available);

    if (!available) {
      return res.status(400).json({
        status: "error",
        message: "Tenant not found",
      });
    }
    const tenant = await this.tenantDao.update(id, { ...validBody });
    res.status(200).json({
      status: "success",
      data: tenant,
    });
  };

  /**
   @desc Create tenant
   @route delete /api/tenant/delete:id
   @access private
   **/

  delete = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    const id = Number(req.params.id);
    const tenImage = await this.tenantImageDao.findByTenant(id);
    console.log("tenImage", tenImage);
    if (tenImage) {
      tenImage.forEach(async (element) => {
        await this.tenantImageDao.delete(element.id);
      });
    }
    const tenant = await this.tenantDao.delete(id);
    if (!tenant.affected) return res.status(400).json("Data not found");
    res.status(200).json({
      status: "Success",
    });
  };

  /**
   @desc Create tenant
   @route get /api/tenant/getAll
   @access private
   **/

  getAll = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    const userId = req.user.id;
    const tenant = await this.tenantDao.getAll(userId); // raw tenant items with product relation

    res.status(200).json({
      status: "success",
      data: tenant,
    });
  };
}
