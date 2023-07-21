import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import TaskFilter from "../Extra/TaskFilter";
import TaskSearch from "../Extra/TaskSearch";

const TaskList = ({
  tasks, // Array of tasks
  completedFilter, // Flag to filter completed tasks
  ratingFilter, // Filter for task ratings
  searchText, // Text used for searching tasks
  handleDeleteTask, // Function to handle task deletion
  handleEditTask, // Function to handle task editing
  handleToggleTask, // Function to handle task completion toggle
  handleRatingChange, // Function to handle rating change
  handleFilterChange, // Function to handle filter change
  handleSearchChange, // Function to handle search input change
  users, // Add the users prop
  userRole, // Add the userRole prop
  setUsers, // Add the setUsers prop
}) => {
  const [ratings, setRatings] = useState({}); // State variable to store task ratings
  const [filteredTasks, setFilteredTasks] = useState([]); // State variable to store filtered tasks

  // Function to update task rating
  const updateRating = (taskId, rating) => {
    setRatings((prevRatings) => ({
      ...prevRatings,
      [taskId]: rating,
    }));
    handleRatingChange(taskId, rating);
  };
   
  // Function to handle user deletion (only accessible to administrators)
  const handleDeleteUser = async (userId) => {
    try {
      await fetch(`/users/${userId}`, {
        method: "DELETE",
      });
      // Update the user list after deletion
      setUsers(users.filter((user) => user._id !== userId));
    } catch (error) {
      console.log("Error deleting user:", error);
    }
  };

  useEffect(() => {
    // Filtering tasks based on filters and search text
    const filtered = tasks.filter((task) => {
      if (completedFilter && !task.completed) return false; // Filter out incomplete tasks if completed filter is enabled
      if (ratingFilter !== "" && ratings[task._id] !== parseInt(ratingFilter)) return false; // Filter tasks based on rating
      if (searchText !== "" && !task.title.toLowerCase().includes(searchText.toLowerCase())) return false; // Filter tasks based on search text
      return true;
    });

    setFilteredTasks(filtered); // Update filtered tasks
  }, [tasks, completedFilter, ratingFilter, ratings, searchText]);

  if (!tasks || tasks.length === 0) {
    return <h2>Task List</h2>; // Render heading if there are no tasks
  }
   
  if (userRole === "admin") {
    return (
      <div>
        <TaskSearch handleSearchChange={handleSearchChange} />
        {/* Render user list */}
        {users.map((user) => (
          <div key={user._id}>
            <p>{user.username}</p>
            <Button
              onClick={() => handleDeleteUser(user._id)}
              className="btn btn-danger"
            >
              Delete User
            </Button>
          </div>
        ))}
      </div>
    );
  }
  return (
    <div>
      <TaskSearch handleSearchChange={handleSearchChange} /> {/* Search input component */}
      <div className="row justify-content-center align-items-center">
        {/* Loop through tasks and render each task */}
        {tasks.map((task) => (
          <div className="col-md-4 p-2 my-2" key={task._id}>
            <div className="card rounded-0">
              <div className="card-header d-flex justify-content-between align-items-center">
                <h5>{task.title}</h5> {/* Task title */}
                <Button
                  onClick={() => handleEditTask(task._id)}
                  className="btn btn-sm"
                >
                  Edit
                </Button>
              </div>
              <div className="card-body">
                <Form.Check
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => handleToggleTask(task._id)}
                /> {/* Checkbox to mark task as completed */}
                <p>Description: {task.content}</p> {/* Task description */}
                <p>Date: {task.date}</p> {/* Task date */}
                <div>
                  {/* Slider to set task rating */}
                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={ratings[task._id] || 0}
                    onChange={(e) =>
                      updateRating(task._id, parseInt(e.target.value))
                    }
                  />
                  <span>{ratings[task._id] || 0}%</span> {/* Display task rating */}
                </div>
              </div>
              <div className="card-footer">
                {/* Button to delete task */}
                <Button
                  onClick={() => handleDeleteTask(task._id)}
                  className="btn btn-danger"
                >
                  Delete
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskList;
