import React, { useState, useEffect } from "react";

export const User = ({ user, managers }) => {
  const [manager, setManager] = useState("");
  const [selectedManagerId, setSelectedManagerId] = useState("");

  const getCurrentManager = async () => {
    const token = localStorage.getItem("token");
    const response = await fetch(
      `http://localhost:3001/api/manager/${user.id}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.ok) {
      const data = await response.json();
      if (data.manager && data.manager.managerid) {
        const response2 = await fetch(
          `http://localhost:3001/api/user/${data.manager.managerid}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (response2.ok) {
          const data2 = await response2.json();
          setManager(data2.username);
        }
      } else {
        setManager("");
      }
    }
  };

  const changeManager = async () => {
    const token = localStorage.getItem("token");
    console.log("Selected Manager ID:", selectedManagerId);
    const response = await fetch(`http://localhost:3001/api/manager/create`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userid: user.id, managerid: selectedManagerId }),
    });

    if (response.status === 201) {
      const data = await response.json();
      await getCurrentManager();
    } else {
      const errorData = await response.json();
      console.error("Failed to change manager:", errorData.message);
    }
  };

  const handleManagerChange = async (event) => {
    const newManagerId = event.target.value;
    setSelectedManagerId(newManagerId);
    if (newManagerId) {
      await changeManager();
    }
  };

  useEffect(() => {
    if (user.type === "executant") {
      getCurrentManager();
    }
  }, [manager]);

  useEffect(() => {
    if (selectedManagerId && selectedManagerId !== "") {
      changeManager();
    }
  }, [selectedManagerId]);

  return (
    <React.Fragment>
      <div className="bg-purple-400 rounded-xl py-4 px-8 mx-4">
        <div className="flex justify-center gap-x-4">
          <p className="bg-purple-300 px-2 py-1 rounded-xl">{user.username}</p>
          <p className="bg-purple-500 px-2 py-1 rounded-xl text-white">
            {user.type}
          </p>
        </div>
        {user.type === "executant" && manager && (
          <div className="flex flex-col items-center text-white justify-center gap-x-2">
            <p>Manager curent:</p>
            <p>{manager}</p>
          </div>
        )}
        {user.type === "executant" && !manager && (
          <div className="mt-2 flex flex-col items-center">
            <p className="text-white">Atribuie manager:</p>
            <select
              value={selectedManagerId}
              onChange={handleManagerChange}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value="" disabled={manager}>
                Cauta un manager
              </option>
              {managers.map((manager) => (
                <option key={manager.id} value={manager.id}>
                  {manager.username}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>
    </React.Fragment>
  );
};
