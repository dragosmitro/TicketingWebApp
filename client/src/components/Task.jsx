import React, { useState, useEffect } from "react";
import { TaskStatus } from "./TaskStatus";

export const Task = ({ task, avalabileUsers, getAllTasks }) => {
  const [assignedUser, setAssignedUser] = useState(null);
  const [isAssigned, setIsAssigned] = useState(false);

  const assignTask = async (userId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:3001/api/task/${task.id}/giveTo/${userId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        const updatedTask = await response.json();
        const user = avalabileUsers.find((u) => u.id === userId);
        if (user && updatedTask) {
          setAssignedUser(user);
          setIsAssigned(true);
          task.status = "pending";
        } else {
          console.error("Failed to assign task or fetch updated task data.");
        }
      } else {
        console.error("Failed to assign task.");
      }
    } catch (error) {
      console.error("Error assigning task:", error);
    }
  };

  const markTaskAsClosed = async () => {
    const token = localStorage.getItem("token");
    const response = await fetch(
      `http://localhost:3001/api/task/close/${task.id}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200) {
      task.status = "closed";
      getAllTasks();
    }
  };

  const handleSelectChange = (event) => {
    const userId = parseInt(event.target.value, 10);
    assignTask(userId);
  };

  useEffect(() => {
    if (task.executant) {
      const user = avalabileUsers.find((u) => u.id === task.executant);
      if (user) {
        setAssignedUser(user);
        setIsAssigned(true);
      }
    }
  }, [task.executant, avalabileUsers]);

  return (
    <React.Fragment>
      <div className="flex flex-col justify-between gap-y-2 bg-purple-400 rounded-xl py-4 px-8 mx-4">
        <div className="flex items-center justify-center gap-x-4">
          <p className="bg-purple-300 px-2 py-1 rounded-xl break-normal break-words">
            {task.content}
          </p>
          <TaskStatus status={task.status} />
        </div>
        {!isAssigned ? (
          <select onChange={handleSelectChange} className="rounded-md">
            <option value="">Assign User</option>
            {avalabileUsers.map((user) => (
              <option key={user.id} value={user.id}>
                {user.username}
              </option>
            ))}
          </select>
        ) : (
          <React.Fragment>
            <p className="bg-purple-300 px-2 py-1 rounded-xl">
              Assigned to: {assignedUser.username}
            </p>
            {task.status === "completed" && (
              <button
                onClick={() => markTaskAsClosed()}
                className="inline-flex py-2 px-4 rounded-xl bg-red-300 hover:bg-red-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Close
              </button>
            )}
          </React.Fragment>
        )}
      </div>
    </React.Fragment>
  );
};
