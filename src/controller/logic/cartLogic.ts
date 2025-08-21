import { autoInjectable } from "tsyringe";
import { NextFunction, Request, Response } from "express";
import { validateBodyInput } from "controller/helper/validate";
import { CartDao } from "dao/cartDao";
import {
  CartCreateBody,
  CartEditBody,
} from "controller/dataClass/cartDataclass";
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
    console.log("herererererererere", req.user);
    const { validatedData: validBody, errors } = await validateBodyInput(
      req,
      CartCreateBody
    );

    if (errors) return res.status(400).json(errors);
    // if (req.user.userType !== "admin")
    //   return res.status(401).json({ message: "Unauthorized" });
    const existingData = await this.cartDao.repository.findOne({
      where: { userId: req.user.id, productId: validBody.productId },
    });
    if (existingData) {
      const { validatedData: validBody, errors } = await validateBodyInput(
        req,
        CartEditBody
      );
      const { quantity } = validBody;
      if (errors) return res.status(400).json(errors);
      console.log("herererererererere", existingData);
      const cart = await this.cartDao.update(existingData.id, {
        ...validBody,
        quantity: quantity + existingData.quantity,
      });

      return res.status(200).json({
        status: "success",
      });
    }

    const cart = await this.cartDao.create({
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
   @route get /api/cart/getAll
   @access private
   **/

  getAll = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  const userId = req.user.id;
  const cart = await this.cartDao.getAll(userId); // raw cart items with product relation

  // Transform raw cart data into grouped structure by product category ("shop")
  const grouped = cart.reduce((acc: any, cartItem: any) => {
    const product = cartItem.__product__;
    const category = product.category || "Other";

    if (!acc[category]) {
      acc[category] = {
        shop: category,
        items: [],
      };
    }

    acc[category].items.push({
      id: String(cartItem.id),
      img: product.image,                      // or build full image URL here
      name: product.name,
      extra: product.description,
      price: product.price,
      qty: cartItem.quantity,
      // Add other fields if needed (oldPrice, ends, etc.)
    });

    return acc;
  }, {});

  // Convert grouped object to array
  const groupedArray = Object.values(grouped);

  res.status(200).json({
    status: "success",
    data: groupedArray,
  });
};

}
