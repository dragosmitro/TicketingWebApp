import express from "express";
import db from "../dbConfig.js";
import {
  createManager,
  getManagerByUserId,
  deleteManager,
  getUsersByManagerId,
} from "../dataAccess/managerDa.js";
import { authenticateToken } from "../middleware.js";

let managerRoute = express.Router();

managerRoute.post("/create", authenticateToken, async (req, res) => {
  try {
    const { userid, managerid } = req.body;
    const existingManager = await getManagerByUserId(userid);
    if (existingManager) {
      await deleteManager(existingManager.id);
    }
    const manager = await createManager({ userid, managerid });
    res.status(201).json({ message: "Manager link created", manager });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

managerRoute.get("/:userid", authenticateToken, async (req, res) => {
  try {
    const { userid } = req.params;
    const manager = await getManagerByUserId(userid);
    res.status(200).json({ message: "Succesfully retrieved manager", manager });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

managerRoute.get(
  "/getManagedUsers/:managerid",
  authenticateToken,
  async (req, res) => {
    try {
      const { managerid } = req.params;
      const users = await getUsersByManagerId(managerid);
      res
        .status(200)
        .json({
          message: "Succesfully retrieved users assigned to the manager",
          users,
        });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
);

export default managerRoute;
