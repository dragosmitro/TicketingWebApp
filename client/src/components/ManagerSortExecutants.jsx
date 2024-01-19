import React, { useState } from "react";
import { GridComponent } from "./GridComponent";
import { Task } from "./Task";

export const ManagerSortExecutants = ({
  allTasks,
  avalabileUsers,
  getTasks,
}) => {
  const [selectedUser, setSelectedUser] = useState(null);

  const handleSelectChange = (event) => {
    const userId = parseInt(event.target.value, 10);
    const user = avalabileUsers.find((u) => u.id === userId);
    setSelectedUser(user);
    console.log(user);
  };
  return (
    <React.Fragment>
      <div className="mb-40">
        <div className="m-4 bg-purple-700 rounded-3xl flex flex-row justify-center gap-x-5 items-center px-12 py-3 text-white my-20">
          <p className="text-2xl">Select user to see task history</p>
          <select
            onChange={handleSelectChange}
            className="rounded-md bg-purple-500 text-white p-2"
          >
            <option value="">Select User</option>
            {avalabileUsers
              ? avalabileUsers.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.username}
                  </option>
                ))
              : null}
          </select>
        </div>
        {selectedUser && (
          <React.Fragment>
            <GridComponent>
              {allTasks
                ? allTasks.map(
                    (task) =>
                      task.executant === selectedUser.id && (
                        <Task
                          task={task}
                          key={task.id}
                          avalabileUsers={avalabileUsers}
                          getAllTasks={getTasks}
                        />
                      )
                  )
                : null}
            </GridComponent>
          </React.Fragment>
        )}
      </div>
    </React.Fragment>
  );
};
