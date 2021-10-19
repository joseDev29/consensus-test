import { Request, Response } from "express";
import { Product } from "../../models/product";
import { Store } from "../../models/store";
import { StoreProduct } from "../../models/store_product";

export const getStockProductByStoreId = async (req: Request, res: Response) => {
  const store_id = req.params["store_id"];
  const product_id = req.params["product_id"];

  const store = await Store.findByPk(store_id);

  if (!store)
    return res.status(404).json({
      ok: false,
      msg: "Store not found",
    });

  const product = await Product.findByPk(product_id);

  if (!product)
    return res.status(404).json({
      ok: false,
      msg: "Product not found",
    });

  const store_product = await StoreProduct.findOne({
    where: {
      store_id,
      product_id,
    },
  });

  if (!store_product)
    return res.status(404).json({
      ok: false,
      msg: "Stock product not found",
    });

  return res.status(200).json({
    ok: true,
    product,
    store,
    stock_in_store: store_product.getDataValue("stock"),
  });
};
