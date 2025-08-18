import { autoInjectable } from "tsyringe";
import { NextFunction, Request, Response } from "express";
import { validateBodyInput } from "controller/helper/validate";
import { CartDao } from "dao/cartDao";
import { CartCreateBody, CartEditBody } from "controller/dataClass/cartDataclass";
// import { validateBodyInput } from "controller/helper/validate";

@autoInjectable()
export class CartController {
  constructor(private cartDao: CartDao) {}
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
    console.log("herererererererere",req.user);
    const { validatedData: validBody, errors } = await validateBodyInput(
      req,
      CartCreateBody
    );
    console.log("=======herererererererere",validBody);

    if (errors) return res.status(400).json(errors);
    // if (req.user.userType !== "admin")
    //   return res.status(401).json({ message: "Unauthorized" });
    const cart = await this.cartDao.create({
      ...validBody, 
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
      CartEditBody
    );
    if (errors) return res.status(400).json(errors);

    const cart = await this.cartDao.update(id, { ...validBody });
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
    const cart = await this.cartDao.delete(id);
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
   @route get /api/cart/getByPanel
   @access private
   **/

  getAll = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    const cart=await this.cartDao.getAll();
 res.status(200).json({
      status: "success",
      data: cart,
    });
  };
}