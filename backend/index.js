import express from "express";
import mysql from "mysql2/promise";
import dotenv from "dotenv/config";
import userRouter from "./routes/userRoutes.js";
import managerRoute from "./routes/managerRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import cors from "cors";

let app = express();
let router = express.Router();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use((req, res, next) => {
  const start = new Date().getTime();
  res.on("finish", () => {
    const duration = new Date().getTime() - start;
    console.log(
      `${req.method} ${req.originalUrl} ${res.statusCode} - ${duration}ms`
    );
  });
  next();
});
app.use("/api/user", userRouter);
app.use("/api/manager", managerRoute);
app.use("/api/task", taskRoutes);
let conn;

mysql
  .createConnection({
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
  })
  .then((connection) => {
    conn = connection;
    return connection.query("CREATE DATABASE IF NOT EXISTS proiect");
  })
  .then(() => {
    return conn.end();
  })
  .catch((err) => {
    console.warn(err);
  });

app.listen(process.env.PORT, () => {
  console.log("Server running on port " + process.env.PORT);
});

// COD SQL

// CREATE TABLE IF NOT EXISTS `user` (
//   `id` int(11) NOT NULL AUTO_INCREMENT,
//   `username` varchar(50) NOT NULL,
//   `password` varchar(255) NOT NULL,
//   `type` varchar(50) NOT NULL,
//   PRIMARY KEY (`id`),
//   UNIQUE KEY `username` (`username`)
// ) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

// CREATE TABLE IF NOT EXISTS `task` (
//   `id` int(11) NOT NULL AUTO_INCREMENT,
//   `creatorid` int(11) NOT NULL DEFAULT 0,
//   `content` longtext NOT NULL,
//   `status` varchar(50) NOT NULL DEFAULT '',
//   `executant` int(11) DEFAULT NULL,
//   PRIMARY KEY (`id`),
//   KEY `creatorid` (`creatorid`),
//   KEY `executant` (`executant`)
// ) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

// CREATE TABLE IF NOT EXISTS `manager` (
//   `id` int(11) NOT NULL AUTO_INCREMENT,
//   `userid` int(11) NOT NULL,
//   `managerid` int(11) NOT NULL,
//   PRIMARY KEY (`id`),
//   KEY `userid` (`userid`),
//   KEY `managerid` (`managerid`)
// ) ENGINE=InnoDB AUTO_INCREMENT=115 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;