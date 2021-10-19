import { Request, Response } from "express";

import { Store } from "../../models/store";

export const updateStore = async (req: Request, res: Response) => {
  const id = req.params["id"];

  const { name } = req.body;

  if (!name)
    return res.status(400).json({
      ok: false,
      msg: "Store name is required",
    });

  const store = await Store.findByPk(id);

  if (!store)
    return res.status(404).json({
      ok: false,
      msg: "Store not found",
    });

  await store.update({
    name,
  });

  return res.status(200).json({
    ok: true,
    msg: "Store updated",
    store,
  });
};
