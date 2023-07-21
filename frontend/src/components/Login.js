/* 
  This is a React functional component that represents a login form.
  It receives a prop called 'handleLogin' which is a function provided by the parent component.
*/

// Import necessary modules
import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import styles from "./Auth/styles/Username.module.css";
import { Link, useNavigate } from "react-router-dom";

// Define the Login component using arrow function syntax, and receive props from the parent component
const Login = ({ handleLogin }) => {
  // State variables to manage the username and password input values
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Function to handle the form submission
  const handleSubmit = (e) => {
    // Prevent the default form submission behavior
    e.preventDefault();
    // Call the 'handleLogin' function provided by the parent component, passing the username and password as arguments
    handleLogin(username, password);
  };
  
  // Function to handle admin login
const handleAdminLogin = (e) => {
  // Prevent the default behavior of the event
  e.preventDefault();

  // Show an alert message indicating that only admins are allowed to log in
  alert("Only admins are allowed to log in");
};


  return (
    <div className="container mx-auto">
      <div className="flex justify-center items-center h-screen">
        <div
          className={styles.glass}
          style={{ width: "50%", height: "110%", paddingTop: "3em" }}
        >
          <div className="title flex flex-col items-center">
            {/* Login form header */}
            <h4 className="text-5xl font-bold">Log in</h4>
            <span className="py-4 text-xl w-2/3 text-center text-gray-500">
              Welcome Again
            </span>
            {/* Form element with onSubmit event handler */}
            <Form className="py-1" onSubmit={handleSubmit}>
              {/* Username input field */}
              <div className="profile flex justify-center py-4">
                
              <div className="textbox flex flex-col items-center gap-6">
                  <input
                    type="text"
                    className={styles.textbox}
                    value={username}
                    // Update the 'username' state when the input value changes
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Email*"
                  />
                </div>
                <div>
                  {/* Password input field */}

                  <input
                    type="password"
                    className={styles.textbox}
                    value={password}
                    // Update the 'password' state when the input value changes
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password*"
                  />
                </div>

                {/* Submit button */}
                <Button className={styles.btn} type="submit">
                  Login
                </Button>
              </div>
              <div className="text-center py-4">
                {/* Render the login link */}
                <span className="text-gray-500">
                  Admin{" "}
                  <Link className="text-red-500" to="/"   onSubmit={handleAdminLogin}>
                    Login Now
                  </Link>
                </span>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

// Export the Login component
export default Login;
