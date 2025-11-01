import { autoInjectable } from "tsyringe";
import { NextFunction, Request, Response } from "express";
import { validateBodyInput } from "../../controller/helper/validate";
import { PaymentCreateBody } from "../../controller/dataClass/paymentDataclass";

import { PaymentDao } from "../../dao/paymentDao";

import { paymentstatusType } from "../../entity/enum/paymentStatus";
import { OrderDao } from "../../dao/orderDao";
import { OrderEditBody } from "../../controller/dataClass/orderDataClass";
import { statusType } from "../../entity/enum/status";

@autoInjectable()
export class PaymentController {
  constructor(private paymentDao: PaymentDao, private orderDao: OrderDao) {}
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
     @route put /api/payment/edit:id
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
      OrderEditBody
    );
    if (errors) return res.status(400).json(errors);

    const cart = await this.orderDao.update(id, { ...validBody });
    res.status(200).json({
      status: "success",
      data: cart,
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
    const userId = req.params.userId;
    const selectedItems = req.params.selectedItems;
    console.log("useruseruseruseruseruser", userId);

    console.log(
      "selectedselectedselectedselectedselectedselected",
      selectedItems
    );
    const token = req.query.data as string;
    console.log("token :::::", token);
    const selectedJson = selectedItems.split("=")[1];

    const productIds = JSON.parse(selectedJson).map((item: any) => item.id);

    if (!token) {
      const payment = await this.paymentDao.create({
        amount: 0,
        paymentstatus: paymentstatusType.FAILED,
        userId: userId.split("=")[1], // set from your context or decoded token if available
        productIds: productIds,
        paymentMethod: "esewa",
        transactionId: "none",
      });

      return res.status(200).json({
        status: "success",
        //   datas: query,
      });
    }

    try {
      const decoded = JSON.parse(Buffer.from(token, "base64").toString("utf8"));
      const order = await this.orderDao.repository.findOne({
        where: { userId: Number(userId.split("=")[1]) },
        order: { createdAt: "DESC" },
      });
      console.log("Decoded JWT:", decoded);
      if (!decoded || typeof decoded !== "object") {
        return res
          .status(400)
          .json({ status: "error", message: "Invalid token payload" });
      }
      console.log("======================================================");

      const payment = await this.paymentDao.create({
        amount: decoded.total_amount,
        paymentstatus: paymentstatusType.SUCCESS,
        userId: userId.split("=")[1], // set from your context or decoded token if available
        productIds: productIds,
        paymentMethod: "esewa",
        transactionId: decoded.transaction_uuid,
      });
      await this.orderDao.update(order.id, {
        status: statusType.ORDERPLACED,
      });
      res.status(200).json({
        status: "success",
        //   datas: query,
      });
    } catch (error) {
      console.log("Error parsing JWT:", error);
      return res
        .status(400)
        .json({ status: "error", message: "Invalid token" });
    }
  };

   /**
   @desc Create payment
   @route get /api/payment/getbykhalti
   @access private
   **/

  khaltiCallBack = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    console.log("Handler started");
    console.log("Handler ending");
    const userId = req.params.userId;
    const productId = req.params.productId;
    const status = req.query.status;
    const totalPrice = req.params.totalPrice;
    const transactionId = req.query.transaction_id;
    console.log("useruseruseruseruseruser", userId);
    console.log("status", status);
    console.log("totalPrice", totalPrice);

    console.log(
      "selectedselectedselectedselectedselectedselected",
      productId
    );
    // const selectedJson = selectedItems.split("=")[1];

    // const productIds = JSON.parse(selectedJson).map((item: any) => item.id);

    if (status != "Completed" ) {
            console.log("=====================0000000000=================================");

      const payment = await this.paymentDao.create({
        amount: 0,
        paymentstatus: paymentstatusType.FAILED,
        userId: userId, 
        productIds: [Number(productId)],
        paymentMethod: "khalti",
        transactionId: "none",
      });
      console.log("=====================1111111111=================================",payment);
      return res.status(200).json({
        status: "success",
        //   datas: query,
      });
    }

    try {
      // const decoded = JSON.parse(Buffer.from(token, "base64").toString("utf8"));
      const order = await this.orderDao.repository.findOne({
        where: { userId: Number(userId) },
        order: { createdAt: "DESC" },
      });
     
      
      console.log("======================================================");

      const payment = await this.paymentDao.create({
        amount: Number(totalPrice),
        paymentstatus: paymentstatusType.SUCCESS,
        userId: userId, // set from your context or decoded token if available
        productIds: [Number(productId)],
        paymentMethod: "khalti",
        transactionId: String(transactionId),
      });
      await this.orderDao.update(order.id, {
        status: statusType.ORDERPLACED,
      });
      res.status(200).json({
        status: "success",
        //   datas: query,
      });
    } catch (error) {
      console.log("Error parsing JWT:", error);
      return res
        .status(400)
        .json({ status: "error", message: "Invalid token" });
    }
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
    // const userId = req.user.id;
    const tenant = await this.paymentDao.getAll(); // raw payment items with product relation

    res.status(200).json({
      status: "success",
      data: tenant,
    });
  };
}
