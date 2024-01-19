import React from "react";
import classNames from "classnames";

export const TaskStatus = ({ status }) => {
  return (
    <React.Fragment>
      <p
        className={classNames("px-2 py-1 rounded-xl text-white", {
          "bg-gray-700": status === "pending",
          "bg-green-500": status === "open",
          "bg-purple-500": status === "completed",
          "bg-red-500": status === "closed",
        })}
      >
        {status}
      </p>
    </React.Fragment>
  );
};
