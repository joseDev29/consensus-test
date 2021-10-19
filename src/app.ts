import express, { Application, Request, Response } from "express";
import db from "./db/connection";

import StoreRouter from "./routes/store.routes";
import ProductRouter from "./routes/product.routes";
import StoreProductRouter from "./routes/store_product.routes";

export class App {
  private app: Application;
  private port: number | string;

  constructor(port?: number | string) {
    this.app = express();
    this.port = port || 3000;

    this.middlewares();
    this.routes();
    this.dbConnection();

    //Error handler
    this.app.use((err, req: Request, res: Response) => {
      console.log("Server Error: ", err);

      res.status(500).json({
        ok: false,
        msg: "Internal server error, sorry!",
      });
    });
  }

  async dbConnection() {
    try {
      await db.authenticate();
      console.log("DB Connected");
    } catch (error) {
      throw new Error(`DB Connection Error: ${error}`);
    }
  }

  middlewares() {
    this.app.use(express.json());
  }

  routes() {
    this.app.use("/store", StoreRouter);
    this.app.use("/product", ProductRouter);
    this.app.use("/store-product", StoreProductRouter);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server running in http://localhost:${this.port}`);
    });
  }
}
