import { DataTypes } from "sequelize";
import db from "../db/connection";

export const TransferLogs = db.define("transfer_logs", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  store_origin_id: {
    type: DataTypes.STRING,
    references: {
      model: "stores",
      key: "id",
    },
  },
  store_destination_id: {
    type: DataTypes.STRING,
    references: {
      model: "stores",
      key: "id",
    },
  },
  product_id: {
    type: DataTypes.STRING,
    references: {
      model: "products",
      key: "id",
    },
  },
  amount: {
    type: DataTypes.INTEGER,
  },
});
