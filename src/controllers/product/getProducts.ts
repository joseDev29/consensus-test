import { Request, Response } from "express";

import { Product } from "../../models/product";
import { StoreProduct } from "../../models/store_product";

export const getProducts = async (req: Request, res: Response) => {
  const products: any[] = await Product.findAll();

  for await (let product of products) {
    product.dataValues.total_stock = 0;

    const storesProduct: any[] = await StoreProduct.findAll({
      where: {
        product_id: product.id,
      },
    });

    storesProduct.map((stp) => (product.dataValues.total_stock += stp.stock));
  }

  return res.status(200).json({
    ok: true,
    products,
  });
};
