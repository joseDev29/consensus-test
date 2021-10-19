import { Request, Response } from "express";

import { Product } from "../../models/product";
import { generateID } from "../../utils/generateID";

export const createProduct = async (req: Request, res: Response) => {
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

  const id = generateID();

  const product = await Product.create({ id, name, description });

  return res.status(201).json({
    ok: true,
    msg: "Product created",
    product,
  });
};
