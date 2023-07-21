import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import TaskList from "./CRUD/TaskList";
import Login from "./Login";
import Register from "./Register";
import Add from "./CRUD/Add";
import Edit from "./CRUD/Edit";
import "./Navbar.css";
import Home from "../Home";
import { Route, BrowserRouter as Routes } from "react-router-dom";
import Sidebar from "./Sidebar";
import TaskFilter from "./Extra/TaskFilter";
import styles from "./Auth/styles/Username.module.css";

const ParentComponent = () => {
  // Manages the state of whether the user is logged in or not (initially false)
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // Manages the state of whether the user is registered or not (initially false)
  const [isRegistered, setIsRegistered] = useState(false);
  // Manages the state of the tasks
  const [tasks, setTasks] = useState([]);
  // Manages the state of the task being edited
  const [editTask, setEditTask] = useState(null);

  // State variables to manage filters for task list
  const [ratings, setRatings] = useState({});
  const [completedFilter, setCompletedFilter] = useState(false);
  const [ratingFilter, setRatingFilter] = useState("");
  const [filteredTasks, setFilteredTasks] = useState([]);

  // Function to handle the change of a task's rating
  const handleRatingChange = (taskId, rating) => {
    // Create a new object to store the updated ratings
    const updatedRatings = { ...ratings };
    // Update the rating for the specific taskId
    updatedRatings[taskId] = rating;
    // Set the updated ratings in the state
    setRatings(updatedRatings);
  };

  // Asynchronous function that handles the adding of tasks
  const addTask = async (title, description, date) => {
    try {
      // Get the authentication token from local storage
      const token = localStorage.getItem("token");

      // Send a POST request to the API with the token and task data in the request body
      const response = await fetch("http://localhost:8080/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, description, date }),
      });

      // Handle different response status codes
      if (response.status === 400) {
        alert("Task exceeds 140 character limit!");
      } else if (response.status === 415) {
        alert("Input is not JSON content!");
      } else if (response.status === 500) {
        alert("Error adding task");
      }

      // If the response was OK, add the new task to the state
      if (response.ok) {
        const newTask = await response.json();
        setTasks((prevTasks) => [...prevTasks, newTask]);
      } else {
        throw new Error("Error adding task");
      }
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  // Asynchronous function that handles the user registration submission
  const handleRegister = async (username, password) => {
    try {
      // Send a POST request to the API with the username and password in the request body
      const response = await fetch("http://localhost:8080/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      // Handle different response status codes for registration
      if (response.status === 200) {
        alert("User registered successfully.");
        // Update the state to indicate successful registration
        setIsRegistered(true);
      } else if (response.status === 400) {
        const data = await response.json();
        console.log("Registration failed:", data.error);
        alert("Registration failed!");
      } else if (response.status === 403) {
        console.log("Registration forbidden: User not allowed.");
        alert("Registration forbidden: Username has to end with '@gmail.com'.");
      } else {
        console.log("Registration failed with status:", response.status);
        alert("Username already exists!");
      }
    } catch (error) {
      console.error("Error during registration:", error.message);
    }
  };

  // Asynchronous function that handles the user login submission
  const handleLogin = async (username, password) => {
    try {
      // Send a POST request to the API with the username and password in the request body
      const response = await fetch("http://localhost:8080/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      // If the response was OK, set the logged in state to true
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("token", data.token); // Save the authentication token in local storage
        setIsLoggedIn(true);
      } else {
        // If there was an error, display an error message to the user
        const errorData = await response.json();
        console.error("Login failed:", errorData.message);
        alert("Login failed: Invalid username or password");
      }
    } catch (error) {
      // Handle errors during login and display an appropriate message to the user
      console.error("Error logging in:", error);
      alert("Login forbidden: Username has to end with '@gmail.com'.");
    }
  };

  // useEffect hook to check if the user is already registered
  useEffect(() => {
    const checkRegistrationStatus = () => {
      // Retrieve the token value from local storage
      const token = localStorage.getItem("token");
      // Convert the token value to a boolean (true if token is not empty, false if token is empty)
      setIsRegistered(!!token);
    };
    // Call the function to check registration status
    checkRegistrationStatus();
  }, []);

  // useEffect hook to fetch the tasks once the user has logged in
  useEffect(() => {
    // Fetch tasks only if the user is logged in
    if (isLoggedIn) {
      // Asynchronous function to fetch tasks
      const fetchTasks = async () => {
        try {
          // Retrieve token from local storage
          const token = localStorage.getItem("token");

          // Send a GET request to the API with the token for authorization
          const response = await fetch("http://localhost:8080/tasks", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          // Convert the data to JSON format
          const data = await response.json();
          // Set the state with the fetched tasks data
          setTasks(data);
        } catch (error) {
          console.error("Error fetching tasks:", error);
        }
      };
      // Call the function to fetch tasks
      fetchTasks();
    }
  }, [isLoggedIn]);

  // Function to handle changes in filters for task list
  const handleFilterChange = (completed, rating) => {
    setCompletedFilter(completed);
    setRatingFilter(rating);

    // Filter the tasks based on the completed and rating filters
    const filtered = tasks.filter((task) => {
      if (completed && !task.completed) return false;
      if (rating !== "" && task.rating !== rating) return false;
      return true;
    });

    setFilteredTasks(filtered);
  };

  // useEffect hook to filter tasks based on completed and rating filters
  useEffect(() => {
    // Filter the tasks based on the completed and rating filters
    const filtered = tasks.filter((task) => {
      if (completedFilter && !task.completed) return false;
      if (ratingFilter !== "" && task.rating !== ratingFilter) return false;
      return true;
    });

    setFilteredTasks(filtered);
  }, [tasks, completedFilter, ratingFilter, ratings]);

  // Asynchronous function that handles the deletion of a task
  const handleDeleteTask = async (taskId) => {
    try {
      // Send a DELETE request to the API with the task ID
      await fetch(`/tasks/${taskId}`, {
        method: "DELETE",
      });
      // Update the tasks state by filtering out the deleted task
      setTasks(tasks.filter((task) => task._id !== taskId));
    } catch (error) {
      console.log("Error deleting task:", error);
    }
  };

  // Function that handles selecting a task for editing
  const handleEditTask = (taskId) => {
    // Search for the task in the array that matches the given taskId
    const taskToEdit = tasks.find((task) => task._id === taskId);
    // Set the state to the task that matches the given taskId
    if (taskToEdit) {
      setEditTask(taskToEdit);
    }
  };

  // Function to cancel the editing of a task by resetting the Edit state to null
  const handleCancelEdit = () => {
    setEditTask(null);
  };

  // Asynchronous function that handles updating a task with the edited information
  const handleUpdateTask = async (updatedTitle) => {
    try {
      const { _id: taskId, description, date, completed } = editTask;
      console.log(
        "Updated Task Data:",
        taskId,
        updatedTitle,
        description,
        date,
        completed
      );

      // Send a PUT request to the API with the taskId and updated task data in the request body
      const response = await fetch(`/tasks/${taskId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          title: updatedTitle,
          description,
          date,
          completed,
        }),
      });

      if (response.ok) {
        // If the response is OK, update the task in the state
        const updatedTaskData = await response.json();
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task._id === taskId ? updatedTaskData : task
          )
        );
        setEditTask(null); // Reset the editTask state to null after successful update
      } else {
        throw new Error("Error updating task");
      }
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  // Asynchronous function that handles toggling the completed status of a task
  const handleToggleTask = async (taskId) => {
    try {
      // Create a new array by mapping over the tasks array and toggling the status of the task
      const updatedTasks = tasks.map(
        (task) =>
          // For each task in the array, check if the id property matches the taskId parameter
          task._id === taskId ? { ...task, completed: !task.completed } : task
        // If they match, create a new object using the spread operator, otherwise return the original task
      );

      // Update the task state by calling the setTasks function and passing the new array as the state
      setTasks(updatedTasks);

      // Send a PUT request to the API with the taskId and updated completed status in the request body
      await fetch(`http://localhost:8080/tasks/${taskId}/toggle`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        // Include the updated task data in the request body
        body: JSON.stringify(updatedTasks.find((task) => task._id === taskId)),
      });
    } catch (err) {
      // Log the error if any
      console.error(err);
    }
  };

  // Function to allow the user to logout
  const handleLogout = () => {
    setIsLoggedIn(false); // Set the logged in state to false
    localStorage.removeItem("token"); // Remove the token from local storage
  };

  // State variable and function to toggle the sidebar visibility
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);

  return (
    <div>
      {isLoggedIn && <Sidebar />}{" "}
      {/* Render the Sidebar component only when isLoggedIn is true */}
      <div className="container">
        {/* Conditional rendering based on registration status */}
        {isRegistered ? (
          // If the user is registered, show the following content
          <>
            {isLoggedIn ? (
              // If the user is logged in, show the task management interface
              <>
                <Button
                  className={styles.btn} type="submit"
                  style={{ position: "absolute", top: "15px", right: "20px" }}
                  onClick={handleLogout}
                >
                  Logout
                </Button>

                {/* Use the React Router's Routes to handle different pages */}
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/Addtask" element={<Add addTask={addTask} />} />
                  {/* Commented out the RatingSummary route for now */}
                  {/* <Route
                    path="/RatingSummary"
                    element={<RatingSummary ratings={ratings} />}
                  /> */}
                  {/* Render the TaskList component along with TaskFilter when showing tasks */}
                  <Route
                    path="/ShowTask"
                    element={
                      <>
                        <TaskFilter
                          completedFilter={completedFilter}
                          ratingFilter={ratingFilter}
                          handleFilterChange={handleFilterChange}
                        />
                        <TaskList
                          tasks={filteredTasks} // Pass filteredTasks as prop
                          handleDeleteTask={handleDeleteTask}
                          handleEditTask={handleEditTask}
                          handleToggleTask={handleToggleTask}
                          handleRatingChange={handleRatingChange}
                          handleFilterChange={handleFilterChange} // Pass handleFilterChange as prop
                        />
                      </>
                    }
                  />
                </Routes>
                {/* Render the Edit component if there is an editTask */}
                {editTask && (
                  <Edit
                    task={editTask}
                    handleUpdateTask={handleUpdateTask}
                    handleCancelEdit={handleCancelEdit}
                  />
                )}
              </>
            ) : (
              // If the user is not logged in, show the login form
              <>
                <div className="container">
                  <Login handleLogin={handleLogin} />
                </div>
                {/* Button to switch to the registration view */}
                <Button
                  style={{ position: "absolute", top: "15px", right: "20px" }}
                  onClick={() => setIsRegistered(false)}
                >
                  Register
                </Button>
              </>
            )}
          </>
        ) : (
          // If the user is not registered, show the registration form
          <>
            <div className="container">
              <Register handleRegister={handleRegister} />
            </div>
            {/* Button to switch to the login view */}
            <Button
              style={{ position: "absolute", top: "15px", right: "20px" }}
              onClick={() => setIsRegistered(true)}
            >
              Login
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default ParentComponent;
