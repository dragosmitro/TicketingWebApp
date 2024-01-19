import React from "react";
import { TaskStatus } from "./TaskStatus";

export const TaskExecutant = ({ task, getTasks }) => {
  const markTaskAsComplete = async () => {
    const token = localStorage.getItem("token");
    const response = await fetch(
      `http://localhost:3001/api/task/complete/${task.id}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200) {
      task.status = "completed";
      getTasks();
    }
  };

  return (
    <div className="flex flex-col justify-between gap-y-2 bg-purple-400 rounded-xl py-4 px-8 mx-4 my-4">
      <div className="flex items-center justify-center gap-x-4">
        <p className="bg-purple-300 px-2 py-1 rounded-xl">{task.content}</p>
        <TaskStatus status={task.status} />
      </div>
      {task.status !== "completed" && task.status !== "closed" && (
        <button
          onClick={() => markTaskAsComplete()}
          className="inline-flex py-2 px-4 rounded-xl bg-green-300 hover:bg-green-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          Complete
        </button>
      )}
    </div>
  );
};
