import { Sequelize } from "sequelize";
import db from "../dbConfig.js";
import { User } from "./user.js";

export const Task = db.define("task", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  creatorid: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: "id",
    },
  },
  content: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  status: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  executant: {
    type: Sequelize.INTEGER,
    allowNull: true,
    references: {
      model: User,
      key: "id",
    },
  },
});
