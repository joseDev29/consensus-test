import { Sequelize } from "sequelize";

import { db_config } from "../config";

const db = new Sequelize(db_config.name, db_config.user, db_config.password, {
  host: db_config.host,
  dialect: "mysql",
});

export default db;
