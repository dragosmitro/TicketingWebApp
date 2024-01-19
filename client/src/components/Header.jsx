import React from "react";

export const Header = ({ user, setLoggedIn }) => {
  const logout = () => {
    localStorage.removeItem("token");
    setLoggedIn(false);
  };

  return (
    <React.Fragment>
      <div className="bg-purple-400 flex flex-row justify-between items-center px-4 py-1 sm:px-12 sm:py-3">
        <div className="text-md sm:text-2xl">
          <span>Hello,</span>
          <span className="text-red-700 mx-2">{user.type.toUpperCase()}</span>
          <span>{user.username}</span>
        </div>
        <button
          onClick={() => logout()}
          className="inline-flex py-2 px-4 rounded-xl bg-yellow-300 hover:bg-red-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          Logout
        </button>
      </div>
    </React.Fragment>
  );
};
