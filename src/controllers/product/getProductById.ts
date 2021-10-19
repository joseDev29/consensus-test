import { Request, Response } from "express";

import { Product } from "../../models/product";
import { StoreProduct } from "../../models/store_product";

export const getProductById = async (req: Request, res: Response) => {
  const id = req.params["id"];
  const product: any = await Product.findByPk(id);

  if (!product)
    return res.status(404).json({
      ok: false,
      msg: "Product not found",
    });

  product.dataValues.total_stock = 0;

  const storesProduct = await StoreProduct.findAll({
    where: {
      product_id: product.id,
    },
  });

  storesProduct.map(
    (stp: any) => (product.dataValues.total_stock += stp.stock)
  );

  return res.status(200).json({
    ok: true,
    product,
  });
};
