import { autoInjectable } from "tsyringe";
import { NextFunction, Request, Response } from "express";
import { validateBodyInput } from "controller/helper/validate";
import { TenantDao } from "dao/tenantDao";
import {
  CartCreateBody,
  CartEditBody,
} from "controller/dataClass/cartDataclass";
import { TenantCreateBody, TenantEditBody } from "controller/dataClass/tenantDataclass";
// import { validateBodyInput } from "controller/helper/validate";

@autoInjectable()
export class TenantController {
  constructor(private tenantDao: TenantDao) {}
  /**
   @desc Create cart
   @route POST /api/cart/create
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
    

    const cart = await this.tenantDao.create({
      ...validBody,
      userId: req.user.id,
    });

    res.status(200).json({
      status: "success",
      data: cart,
    });
  };
  /**
   @desc Create cart
   @route put /api/cart/edit:id
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
      TenantEditBody
    );
    if (errors) return res.status(400).json(errors);

    const cart = await this.tenantDao.update(id, { ...validBody });
    res.status(200).json({
      status: "success",
      data: cart,
    });
  };

  /**
   @desc Create cart
   @route delete /api/cart/delete:id
   @access private
   **/

  delete = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    const id = Number(req.params.id);
    const cart = await this.tenantDao.delete(id);
    if (!cart.affected) return res.status(400).json("Data not found");
    res.status(200).json({
      status: "Success",
    });
  };

  /**
   @desc Create cart
   @route get /api/cart/getByPanel
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
   @desc Create cart
   @route get /api/cart/getAll
   @access private
   **/

  getAll = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  const userId = req.user.id;
  const tenant = await this.tenantDao.getAll(userId); // raw cart items with product relation
 

  res.status(200).json({
    status: "success",
    data: tenant,
  });
};

}
