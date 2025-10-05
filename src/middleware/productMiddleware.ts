// middleware/loadProduct.ts
import { ProductDao } from "../dao/serviceList/productDao";
import { Request, Response, NextFunction } from "express";
const productDaoInstance = new ProductDao();

export async function loadProduct(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Number(req.params.id);
    const product = await productDaoInstance.repository.findOne({
      where: { id },
      select: ["category"],
    });

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    (req as any).product = product; // attach to request
    next();
  } catch (err) {
    next(err);
  }
}
