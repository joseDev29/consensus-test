import { Request, Response } from "express";

import { Product } from "../../models/product";
import { Store } from "../../models/store";
import { StoreProduct } from "../../models/store_product";

export const createStock = async (req: Request, res: Response) => {
  const { store_id, product_id, stock } = req.body;

  if (typeof stock != "number" || stock < 0)
    return res.status(400).json({
      ok: false,
      msg: "Stock value no valid",
    });

  if (!store_id)
    return res.status(400).json({
      ok: false,
      msg: "store_id is required",
    });

  if (!product_id)
    return res.status(400).json({
      ok: false,
      msg: "product_id is required",
    });

  const store = await Store.findByPk(store_id);

  if (!store)
    return res.status(404).json({
      ok: false,
      msg: "store not found",
    });

  const product = await Product.findByPk(product_id);

  if (!product)
    return res.status(404).json({
      ok: false,
      msg: "product not found",
    });

  const storeProductExist: any = await StoreProduct.findOne({
    where: {
      store_id,
      product_id,
    },
  });

  if (storeProductExist) {
    await storeProductExist.update({
      ...storeProductExist.dataValues,
      stock: storeProductExist.dataValues.stock + stock,
    });

    return res.status(200).json({
      ok: true,
      msg: "Stock updated",
      store_product: storeProductExist,
    });
  }

  const store_product = await StoreProduct.create({
    store_id,
    product_id,
    stock,
  });

  return res.status(201).json({
    ok: true,
    msg: "Stock product in store created",
    store_product,
  });
};
