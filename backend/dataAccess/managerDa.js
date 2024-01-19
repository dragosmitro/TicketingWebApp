import { Manager } from "../entities/manager.js";
import mysql from "mysql2";
import dotenv from "dotenv/config";

const connection = mysql.createConnection({
  host: "localhost",
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: "proiect",
});

export async function createManager({ userid, managerid }) {
  try {
    const manager = await Manager.create({
      userid,
      managerid,
    });
    return manager;
  } catch (error) {
    throw new Error("Error creating manager", error);
  }
}

export async function deleteManager(id) {
  try {
    const result = await Manager.destroy({
      where: {
        id: id,
      },
    });
    if (result === 0) {
      throw new Error("Manager not found or already deleted");
    }
    return "Manager deleted successfully";
  } catch (error) {
    throw new Error("Error deleting manager", error);
  }
}

export async function getManagerByUserId(userid) {
  try {
    const result = await Manager.findOne({
      where: {
        userid: userid,
      },
    });
    return result;
  } catch (error) {
    throw new Error("Error getting manager by user id", error);
  }
}

export async function getUsersByManagerId(managerid) {
  try {
    const result = await Manager.findAll({
      where: {
        managerid: managerid,
      },
    });
    return result;
  } catch (error) {
    throw new Error("Error getting users assigned to a manager", error);
  }
}
