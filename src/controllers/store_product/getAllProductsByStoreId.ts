import { Request, Response } from "express";
import { Product } from "../../models/product";
import { Store } from "../../models/store";
import { StoreProduct } from "../../models/store_product";

export const getAllProductsByStoreId = async (req: Request, res: Response) => {
  const store_id = req.params["store_id"];

  const store = await Store.findByPk(store_id);

  if (!store)
    return res.status(404).json({
      ok: false,
      msg: "Store not found",
    });

  const store_products = await StoreProduct.findAll({
    where: {
      store_id,
    },
  });

  const products = [];

  for await (let storeProduct of store_products) {
    const product: any = await Product.findByPk(
      storeProduct.getDataValue("product_id")
    );

    product.dataValues.stock_in_store = storeProduct.getDataValue("stock");

    products.push(product);
  }

  return res.status(200).json({
    ok: true,
    store,
    products,
  });
};
