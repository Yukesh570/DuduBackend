import { autoInjectable } from "tsyringe";
import { NextFunction, Request, Response } from "express";
import { validateBodyInput } from "controller/helper/validate";
import { PaymentCreateBody } from "controller/dataClass/paymentDataclass";
import {
  TenantCreateBody,
  TenantEditBody,
} from "controller/dataClass/tenantDataclass";
import { PaymentDao } from "dao/paymentDao";
// import { validateBodyInput } from "controller/helper/validate";
import jwt from "jsonwebtoken";

@autoInjectable()
export class PaymentController {
  constructor(private paymentDao: PaymentDao) {}
  /**
   @desc Create payment
   @route POST /api/payment/create
   @access private
   **/
  create = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    const { validatedData: validBody, errors } = await validateBodyInput(
      req,
      PaymentCreateBody
    );

    if (errors) return res.status(400).json(errors);
    // if (req.user.userType !== "admin")
    //   return res.status(401).json({ message: "Unauthorized" });

    const payment = await this.paymentDao.create({
      ...validBody,
    });

    res.status(200).json({
      status: "success",
      data: payment,
    });
  };

  /**
   @desc Create payment
   @route delete /api/payment/delete:id
   @access private
   **/

  delete = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    const id = Number(req.params.id);
    const payment = await this.paymentDao.delete(id);
    if (!payment.affected) return res.status(400).json("Data not found");
    res.status(200).json({
      status: "Success",
    });
  };

  /**
   @desc Create payment
   @route get /api/payment/get
   @access private
   **/

  getbypanel = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    console.log("Handler started");
    console.log("Handler ending");
    const user = req.params.userId ;
    const selected = req.params.selectedItems;
     console.log("useruseruseruseruseruser", user);

    console.log(
      "selectedselectedselectedselectedselectedselected",
      selected
    );
    const token = req.query.data as string;
        console.log("token :::::", token);

    if (!token) {
      return res
        .status(400)
        .json({ status: "error", message: "Missing token" });
    }
 
     let selectedItems: any[] = [];
  


    const decoded = JSON.parse(Buffer.from(token, 'base64').toString('utf8'));
   

    console.log("Decoded JWT:", decoded);
    if (!decoded || typeof decoded !== "object") {
      return res
        .status(400)
        .json({ status: "error", message: "Invalid token payload" });
    }
    console.log("======================================================");

    const payment = await this.paymentDao.create({
      amount: decoded.total_amount,
      username: "some_user", // set from your context or decoded token if available
      paymentMethod: "esewa",
      responseData: "data",
    });
    res.status(200).json({
      status: "success",
      //   datas: query,
    });
  };

  /**
   @desc Create payment
   @route get /api/payment/getAll
   @access private
   **/

  getAll = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    const userId = req.user.id;
    const tenant = await this.paymentDao.getAll(); // raw payment items with product relation

    res.status(200).json({
      status: "success",
      data: tenant,
    });
  };
}
