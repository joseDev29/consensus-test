import { Request, Response } from "express";

import { Store } from "../../models/store";
import { generateID } from "../../utils/generateID";

export const createStore = async (req: Request, res: Response) => {
  const { name } = req.body;

  if (!name)
    return res.status(400).json({
      ok: false,
      msg: "Store name is required",
    });

  const id = generateID();

  const store = await Store.create({
    id,
    name,
  });

  return res.status(201).json({
    ok: true,
    msg: "Store created",
    store,
  });
};
