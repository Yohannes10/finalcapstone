// Import necessary modules
import React, { useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import ParentComponent from "./components/ParentComponent";
import Sidebar from "./components/Sidebar";
import { Button } from "react-bootstrap";
import Add from "./components/CRUD/Add";
import TaskList from "./components/CRUD/TaskList";
import Home from "./Home";
import RatingSummary from "./components/Extra/RatingSummary";
import {
  createPopper,
  popperGenerator,
} from "@popperjs/core/dist/esm/createPopper";
import { detectOverflow as detectOverflowPopper } from "@popperjs/core/dist/esm/utils/detectOverflow.js";

const App = () => {
  // State variables
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Manages the state of the user's login status
  const [isRegistered, setIsRegistered] = useState(false); // Manages the state of the user's registration status
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Manages the state of the sidebar visibility

  // Handles the user logout
  const handleLogout = () => {
    setIsLoggedIn(false); // Updates the login status to false
    localStorage.removeItem("token"); // Removes the authentication token from local storage
  };

  // Asynchronous function that handles the registration submission
  const handleRegister = async (username, password) => {
    try {
      // Send a POST request to the registration API with the provided username and password
      const response = await fetch("http://localhost:8080/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      // Handle different response status codes
      if (response.status === 200) {
        alert("User registered successfully.");
        setIsRegistered(true); // Updates the registration status to true
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

  // Asynchronous function that handles the login submission
  const handleLogin = async (username, password) => {
    try {
      // Send a POST request to the login API with the provided username and password
      const response = await fetch("http://localhost:8080/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      // If the response is successful (status 200), log the user in and save the authentication token
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("token", data.token); // Saves the authentication token in local storage
        setIsLoggedIn(true); // Updates the login status to true
        console.log(isLoggedIn);
      } else {
        // If there's an error with the login (status other than 200), display an error message
        const errorData = await response.json();
        console.error("Login failed:", errorData.message);
        alert("Login failed: Invalid username or password");
      }
    } catch (error) {
      // Handle any unexpected errors during the login process
      console.error("Error logging in:", error);
      alert("Login forbidden: Username has to end with '@gmail.com'.");
    }
  };

  // Toggles the sidebar visibility
  const toggleSidebar = () => {
    setIsSidebarOpen((prevState) => !prevState);
  };

  return (
    
    <div>
      {/* If the user is logged in, render the Sidebar */}
      {isLoggedIn && (
        <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      )}
      <div>
        {/* If the user is logged in, render the header and logout button */}
        {isLoggedIn && (
          <>
            <h1>To-Do List App</h1>
            <Button
              style={{ position: "absolute", top: "15px", right: "20px" }}
              onClick={handleLogout}
            >
              Logout
            </Button>
          </>
        )}
        {/* If the user is logged in, show the task management pages */}
        {isLoggedIn ? (
          
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/AddTask" element={<Add />} />
            <Route path="/ShowTask" element={<TaskList />} />
            <Route path="/RatingSummary" element={<RatingSummary />} />
          </Routes>
        ) : (
          // If the user is not logged in, show the ParentComponent which handles registration and login
          <ParentComponent
            handleLogin={handleLogin}
            handleRegister={handleRegister}
            isLoggedIn={isLoggedIn}
            isRegistered={isRegistered}
            handleLogout={handleLogout}
          />

        )}
      </div>
    </div>
  );
};

export default App;
