import { Request, Response } from "express";

import { Product } from "../../models/product";

export const updateProduct = async (req: Request, res: Response) => {
  const id = req.params["id"];
  const { name, description } = req.body;

  if (!name)
    return res.status(400).json({
      ok: false,
      msg: "Product name is required",
    });

  if (!description)
    return res.status(400).json({
      ok: false,
      msg: "Product description is required",
    });

  const product = await Product.findByPk(id);

  if (!product)
    return res.status(404).json({
      ok: false,
      msg: "Product not found",
    });

  await product.update({
    name,
    description,
  });

  return res.status(200).json({
    ok: true,
    msg: "Product updated",
    product,
  });
};
