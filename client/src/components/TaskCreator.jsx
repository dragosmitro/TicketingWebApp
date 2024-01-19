import React, { useState } from "react";

export const TaskCreator = ({ user, getAllTasks }) => {
  const [taskText, setTaskText] = useState("");

  const handleTextChange = (event) => {
    setTaskText(event.target.value);
  };

  const createTask = async () => {
    if (taskText.length < 20) {
      alert("Descriere prea scurta a task-ului!");
      return;
    }
    const token = localStorage.getItem("token");
    const response = await fetch(`http://localhost:3001/api/task/create`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ creatorid: user.id, content: taskText }),
    });

    if (response.status === 201) {
      const data = await response.json();
      await getAllTasks();
    }
  };

  return (
    <React.Fragment>
      <div className="flex flex-col items-center m-2">
        <div className="w-2/3">
          <div className="bg-gray-300 p-4 rounded-md">
            <div>
              <label
                htmlFor="task"
                className="block text-sm font-medium text-gray-700"
              >
                Task:
              </label>
              <textarea
                id="task"
                name="task"
                type="text"
                required
                className="p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                value={taskText}
                onChange={handleTextChange}
              />
            </div>
          </div>
        </div>
        <button
          onClick={() => createTask()}
          type="submit"
          className="inline-flex mt-2 py-2 px-4 rounded-md text-white bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
        >
          Create Task
        </button>
      </div>
    </React.Fragment>
  );
};
