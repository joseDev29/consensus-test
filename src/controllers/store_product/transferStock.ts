import { Request, Response } from "express";
import { Product } from "../../models/product";
import { Store } from "../../models/store";
import { StoreProduct } from "../../models/store_product";
import { TransferLogs } from "../../models/transfer_logs";

export const transferStock = async (req: Request, res: Response) => {
  const { store_origin_id, store_destination_id, product_id, amount } =
    req.body;

  if (!store_origin_id)
    return res.status(404).json({
      ok: false,
      msg: "store_origin_id is required",
    });

  if (!store_destination_id)
    return res.status(404).json({
      ok: false,
      msg: "store_destination_id is required",
    });

  if (!product_id)
    return res.status(404).json({
      ok: false,
      msg: "product_id is required",
    });

  if (!amount)
    return res.status(404).json({
      ok: false,
      msg: "pamount is required",
    });

  if (amount <= 0)
    return res.status(400).json({
      ok: false,
      msg: "amount must be greater than 0",
    });

  const store_origin = await Store.findByPk(store_origin_id);

  if (!store_origin)
    return res.status(404).json({
      ok: false,
      msg: "Store origin not found",
    });

  const store_destination = await Store.findByPk(store_destination_id);

  if (!store_destination)
    return res.status(404).json({
      ok: false,
      msg: "Store destination not found",
    });

  const product = await Product.findByPk(product_id);

  if (!product)
    return res.status(404).json({
      ok: false,
      msg: "Product not found",
    });

  const stock_product_origin: any = await StoreProduct.findOne({
    where: {
      store_id: store_origin_id,
      product_id,
    },
  });

  if (!stock_product_origin)
    return res.status(404).json({
      ok: false,
      msg: "Does not exist stock product in the origin store",
    });

  if (amount > stock_product_origin.getDataValue("stock"))
    return res.status(400).json({
      ok: false,
      msg: "Amount to be transferred is greater tham the stock available in the origin store",
    });

  const stock_product_destination: any = await StoreProduct.findOne({
    where: {
      store_id: store_destination_id,
      product_id,
    },
  });

  if (!stock_product_destination) {
    await StoreProduct.create({
      store_id: store_destination_id,
      product_id,
      stock: amount,
    });
  } else {
    await stock_product_destination.update({
      stock: stock_product_destination.getDataValue("stock") + amount,
    });
  }

  await stock_product_origin.update({
    stock: stock_product_origin.getDataValue("stock") - amount,
  });

  const transfer_log = await TransferLogs.create({
    store_origin_id,
    store_destination_id,
    product_id,
    amount,
  });

  return res.status(201).json({
    ok: true,
    msg: "successful transfer",
    transfer_log,
  });
};
