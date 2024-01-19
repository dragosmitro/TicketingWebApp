import React, { useState, useEffect } from "react";
import { Header } from "./Header";
import { GridComponent } from "./GridComponent";
import { TaskExecutant } from "./TaskExecutant";

export const ExecutantView = ({ user, setLoggedIn }) => {
  const [tasks, setTasks] = useState([]);

  const getTasks = async () => {
    const response = await fetch(
      `http://localhost:3001/api/task/assignedTo/${user.id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    const res = await response.json();
    if (response.status === 200) {
      setTasks(res.tasks);
    } else {
      alert(res.message);
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <React.Fragment>
      <Header user={user} setLoggedIn={setLoggedIn} />
      <GridComponent>
        {tasks.map((task) => (
          <TaskExecutant task={task} key={task.id} getTasks={getTasks} />
        ))}
      </GridComponent>
    </React.Fragment>
  );
};
