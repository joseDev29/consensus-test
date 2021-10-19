import { Request, Response } from "express";

import { Store } from "../../models/store";

export const getStoreById = async (req: Request, res: Response) => {
  const id = req.params["id"];

  const store = await Store.findByPk(id);

  if (!store)
    return res.status(404).json({
      ok: false,
      msg: "Store not found",
    });

  return res.status(200).json({
    ok: true,
    store,
  });
};
