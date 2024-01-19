import React, { useState, useEffect } from "react";
import { AdminViewCreator } from "./AdminViewCreator";
import { Header } from "./Header";
import { User } from "./User";
import { GridComponent } from "./GridComponent";

export const AdminView = ({ user, setLoggedIn }) => {
  const [allUsers, setAllUsers] = useState([]);
  const [managers, setManagers] = useState([]);

  const getUsers = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/user/all", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const res = await response.json();
      if (response.status === 200) {
        setAllUsers(res);
      } else {
        alert(res.message);
      }
    } catch (error) {}
  };

  const getManagersFromUsers = async () => {
    const managerUsers = allUsers.filter(
      (manager) => manager.type === "manager"
    );
    setManagers(managerUsers);
  };

  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    const managerUsers = allUsers.filter(
      (manager) => manager.type === "manager"
    );
    setManagers(managerUsers);
  }, [allUsers]);

  return (
    <React.Fragment>
      <Header user={user} setLoggedIn={setLoggedIn} />
      <AdminViewCreator getUsers={getUsers} />
      <GridComponent>
        {allUsers.map((user) => (
          <User key={user.id} user={user} managers={managers} />
        ))}
      </GridComponent>
    </React.Fragment>
  );
};
