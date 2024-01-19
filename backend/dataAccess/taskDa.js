import { Task } from "../entities/task.js";
import mysql from "mysql2";
import dotenv from "dotenv/config";

const connection = mysql.createConnection({
  host: "localhost",
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: "proiect",
});

export async function createTask(creatorId, content, status) {
  try {
    const newTask = await Task.create({
      creatorid: creatorId,
      content: content,
      status: status,
    });
    return newTask;
  } catch (error) {
    console.error("Error creating a new task:", error);
    throw error;
  }
}

export async function getTasksByCreator(creatorId) {
  try {
    const tasks = await Task.findAll({
      where: {
        creatorid: creatorId,
      },
    });
    return tasks;
  } catch (error) {
    console.error("Error retrieving all tasks", error);
    throw error;
  }
}

export async function getTasksByExecutant(userid) {
  try {
    const tasks = await Task.findAll({
      where: {
        executant: userid,
      },
    });
    return tasks;
  } catch (error) {
    console.error("Error retrieving all tasks", error);
    throw error;
  }
}

export async function assignTaskTo(taskId, userId) {
  try {
    const task = await Task.findByPk(taskId);
    if (!task) {
      throw new Error(`Task with id ${taskId} not found`);
    }
    task.status = "pending";
    task.executant = userId;
    await task.save();
  } catch (error) {
    console.error("Error assigning the task:", error);
    throw error;
  }
}

export async function markTaskAsComplete(taskId) {
  try {
    const task = await Task.findByPk(taskId);
    if (!task) {
      throw new Error(`Task with id ${taskId} not found`);
    }
    task.status = "completed";
    await task.save();
  } catch (error) {
    console.error("Error marking the task as saved:", error);
    throw error;
  }
}

export async function markTaskAsClosed(taskId) {
  try {
    const task = await Task.findByPk(taskId);
    if (!task) {
      throw new Error(`Task with id ${taskId} not found`);
    }
    task.status = "closed";
    await task.save();
  } catch (error) {
    console.error("Error marking the task as saved:", error);
    throw error;
  }
}
