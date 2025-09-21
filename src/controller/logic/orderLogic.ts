import { autoInjectable } from "tsyringe";
import { NextFunction, Request, Response } from "express";
import { validateBodyInput } from "../../controller/helper/validate";

import { OrderDao } from "../../dao/orderDao";
import { OrderCreateBody } from "../../controller/dataClass/orderDataClass";
import { AppDataSource } from "../../data-source";
import { OrderItemDao } from "../../dao/orderItemDao";
import { parse } from "path";
import { statusType } from "../../entity/enum/status";
// import { validateBodyInput } from "controller/helper/validate";

@autoInjectable()
export class OrderController {
  constructor(private orderDao: OrderDao, private orderItemDao: OrderItemDao) {}
  /**
   @desc Create order
   @route POST /api/order/create
   @access private
   **/
  create = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    const { validatedData, errors } = await validateBodyInput(
      req,
      OrderCreateBody
    );

    if (errors) return res.status(400).json(errors);
    const { orderItems, ...validBody } = validatedData;

    try {
      let results = await AppDataSource.transaction(async (manager) => {
        const orderdata = await this.orderDao.withTransaction(manager).create({
          ...validBody,
          userId: req.user.id,
        });
        const orderItemEntities = orderItems.map(
          ({ productId, price, quantity }) =>
            this.orderItemDao.withTransaction(manager).repository.create({
              productId,
              price,
              quantity,
              orderId: orderdata.id,
            })
        );

        await this.orderItemDao
          .withTransaction(manager)
          .repository.save(orderItemEntities);

        return { order: orderdata, items: orderItemEntities };
      });
      res.status(201).json({
        status: "success",
        data: results,
      });
    } catch (err) {
      next(err);
    }
  };
  //   /**
  //    @desc Create order
  //    @route put /api/order/edit:id
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
  //       CartEditBody
  //     );
  //     if (errors) return res.status(400).json(errors);

  //     const order = await this.orderDao.update(id, { ...validBody });
  //     res.status(200).json({
  //       status: "success",
  //       data: order,
  //     });
  //   };

  /**
   @desc Create order
   @route delete /api/order/delete:id
   @access private
   **/

  delete = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    const id = Number(req.params.id);
    const order = await this.orderDao.delete(id);
    if (!order.affected) return res.status(400).json("Data not found");
    res.status(200).json({
      status: "Success",
    });
  };

  /**
   @desc Create order
   @route get /api/order/getByPanel
   @access private
   **/

  getbypanel = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    const id = parseInt(req.params.id, 10); // Convert string param to number

    if (!id) return res.status(400).json("Data not found");
    const order = await this.orderDao.findById(id);
    res.status(200).json({
      status: "success",
      data: order,
    });
  };

  /**
   @desc Create order
   @route get /api/order/getAll
   @access private
   **/

  getAll = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    const statusParam = req.query.status as string | undefined;
    let status: statusType | undefined;
    // If statusParam is undefined or 'All', treat as no status filter
    if (!statusParam || statusParam === "All") {
      status = undefined; // no filtering on status
    } else {
      // Validate if statusParam is a valid enum value
      if (!Object.values(statusType).includes(statusParam as statusType)) {
        return res.status(400).json({ error: "Invalid status parameter" });
      }
      status = statusParam as statusType;
    }

    console.log("asdf", status);
    const userId = req.user.id;
    const order = await this.orderDao.getAll(userId, status); // raw order items with product relation
    if (!order) return res.status(200).json("Data not found");
    res.status(200).json({
      status: "success",
      data: order,
    });
  };
}
