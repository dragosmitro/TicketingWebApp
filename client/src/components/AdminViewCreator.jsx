import React, { useState } from "react";

export const AdminViewCreator = ({ getUsers }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("administrator");

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  const handleCreateUser = async () => {
    if (username.length < 3) {
      alert("Username prea scurt!");
      return;
    }
    if (password.length < 3) {
      alert("Parola prea mica!");
      return;
    }
    try {
      const response = await fetch("http://localhost:3001/api/user/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          username: username,
          password: password,
          type: role,
        }),
      });
      const res = await response.json();
      if (response.status === 201) {
        getUsers();
      } else {
        alert(res.message);
      }
    } catch (error) {}
  };
  return (
    <React.Fragment>
      <div className="flex flex-col items-center m-2">
        <div className="flex justify-center items-center">
          <div className="inline-flex flex-row justify-center items-center gap-x-3 bg-gray-300 p-4 rounded-md">
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700"
              >
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                value={username}
                onChange={handleUsernameChange}
                required
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="text"
                value={password}
                onChange={handlePasswordChange}
                required
                className="p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label
                htmlFor="role"
                className="block text-sm font-medium text-gray-700"
              >
                Role
              </label>
              <select
                id="role"
                name="role"
                value={role}
                onChange={handleRoleChange}
                required
                className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              >
                <option value="administrator">Administrator</option>
                <option value="manager">Manager</option>
                <option value="executant">Executant</option>
              </select>
            </div>
          </div>
        </div>
        <button
          onClick={() => handleCreateUser()}
          type="submit"
          className="inline-flex mt-2 py-2 px-4 rounded-md text-white bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
        >
          Create User
        </button>
      </div>
    </React.Fragment>
  );
};
