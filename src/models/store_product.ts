import { DataTypes } from "sequelize";
import db from "../db/connection";

export const StoreProduct = db.define("stores_products", {
  store_id: {
    type: DataTypes.STRING,
    references: {
      model: "stores",
      key: "id",
    },
    primaryKey: true,
  },
  product_id: {
    type: DataTypes.STRING,
    references: {
      model: "products",
      key: "id",
    },
    primaryKey: true,
  },
  stock: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
});
