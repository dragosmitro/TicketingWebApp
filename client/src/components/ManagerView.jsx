import React, { useState, useEffect } from "react";
import { Header } from "./Header";
import { TaskCreator } from "./TaskCreator";
import { Task } from "./Task";
import { GridComponent } from "./GridComponent";
import { ManagerSortExecutants } from "./ManagerSortExecutants";

export const ManagerView = ({ user, setLoggedIn }) => {
  const [allTasks, setAllTasks] = useState([]);
  const [managedUsers, setManagedUsers] = useState([]);
  const [managedUsersData, setManagedUsersData] = useState([]);

  const getAllTasks = async () => {
    const token = localStorage.getItem("token");
    const response = await fetch(`http://localhost:3001/api/task/${user.id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (response.status === 200) {
      const data = await response.json();
      setAllTasks(data.tasks);
    }
  };

  const getManagedUsers = async () => {
    const token = localStorage.getItem("token");
    const response = await fetch(
      `http://localhost:3001/api/manager/getManagedUsers/${user.id}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200) {
      const data = await response.json();
      setManagedUsers(data.users);
      fetchManagedUsersData(data.users);
    }
  };

  const fetchManagedUsersData = async (users) => {
    const token = localStorage.getItem("token");
    const userDataPromises = users.map(async (user) => {
      const response = await fetch(
        `http://localhost:3001/api/user/${user.userid}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        const data = await response.json();
        return data;
      }
    });

    const usersData = await Promise.all(userDataPromises);
    setManagedUsersData(usersData.filter((user) => user !== null));
  };

  useEffect(() => {
    getAllTasks();
    getManagedUsers();
  }, []);
  return (
    <React.Fragment>
      <Header user={user} setLoggedIn={setLoggedIn} />
      <TaskCreator user={user} getAllTasks={getAllTasks} />
      <GridComponent>
        {allTasks.map((task) => (
          <Task
            task={task}
            key={task.id}
            avalabileUsers={managedUsersData}
            getAllTasks={getAllTasks}
          />
        ))}
      </GridComponent>
      <ManagerSortExecutants
        allTasks={allTasks}
        avalabileUsers={managedUsersData}
        getTasks={getAllTasks}
      />
    </React.Fragment>
  );
};
