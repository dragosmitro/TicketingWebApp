import express from "express";
import db from "../dbConfig.js";
import {
  createTask,
  getTasksByCreator,
  assignTaskTo,
  getTasksByExecutant,
  markTaskAsComplete,
  markTaskAsClosed,
} from "../dataAccess/taskDa.js";
import { authenticateToken } from "../middleware.js";

let taskRoutes = express.Router();

taskRoutes.post("/create", authenticateToken, async (req, res) => {
  const { creatorid, content } = req.body;
  try {
    const task = await createTask(creatorid, content, "open");
    res.status(201).json({ message: "Succesfully created task", task });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

taskRoutes.get("/:managerid", authenticateToken, async (req, res) => {
  const { managerid } = req.params;
  try {
    const tasks = await getTasksByCreator(managerid);
    res.status(200).json({ message: "Succesfully retrieved all tasks", tasks });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

taskRoutes.post(
  "/:taskid/giveTo/:userid",
  authenticateToken,
  async (req, res) => {
    const { taskid, userid } = req.params;
    try {
      const task = await assignTaskTo(taskid, userid);
      res
        .status(200)
        .json({ message: "Succesfully assigned the task to someone!", task });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
);

taskRoutes.get("/assignedTo/:userid", authenticateToken, async (req, res) => {
  const { userid } = req.params;
  try {
    const tasks = await getTasksByExecutant(userid);
    res.status(200).json({
      message: "Succesfully retrieved all the tasks given to an executant!",
      tasks,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

taskRoutes.get("/complete/:taskid", authenticateToken, async (req, res) => {
  const { taskid } = req.params;
  try {
    const task = await markTaskAsComplete(taskid);
    res.status(200).json({
      message: "Succesfully marked the task as completed",
      task,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

taskRoutes.get("/close/:taskid", authenticateToken, async (req, res) => {
  const { taskid } = req.params;
  try {
    const task = await markTaskAsClosed(taskid);
    res.status(200).json({
      message: "Succesfully marked the task as closed",
      task,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default taskRoutes;
