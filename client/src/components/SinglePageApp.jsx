import React, { useState, useEffect } from "react";
import { LoginPage } from "./LoginPage";
import { AdminView } from "./AdminView";
import { ManagerView } from "./ManagerView";
import { ExecutantView } from "./ExecutantView";

export const SinglePageApp = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      getUserInformation(token);
    }
  }, []);

  async function getUserInformation(token) {
    const response = await fetch("http://localhost:3001/api/user/authToken", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const data = await response.json();
      setUser(data);
      setLoggedIn(true);
    }
  }

  const renderUserTypeComponent = (user) => {
    switch (user.type) {
      case "administrator":
        return <AdminView user={user} setLoggedIn={setLoggedIn} />;
      case "manager":
        return <ManagerView user={user} setLoggedIn={setLoggedIn} />;
      case "executant":
        return <ExecutantView user={user} setLoggedIn={setLoggedIn} />;
    }
  };

  return (
    <React.Fragment>
      {loggedIn ? (
        renderUserTypeComponent(user)
      ) : (
        <LoginPage setLoggedIn={setLoggedIn} getUserInfo={getUserInformation} />
      )}
    </React.Fragment>
  );
};
