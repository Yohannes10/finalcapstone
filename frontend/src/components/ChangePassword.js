/* This React functional child component that represents a form for changing the user's password. */

// import necessary modules
import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

// functional component using arrow function syntax
const ChangePasswordForm = () => {
  // manages the state of the username
  const [username, setUsername] = useState("");
  // manages the state of the currentPassword
  const [currentPassword, setCurrentPassword] = useState("");
  // manages the state of the newPassword
  const [newPassword, setNewPassword] = useState("");

  // asynchronous function that handles the form submission
  const handleChangePassword = async (e) => {
    e.preventDefault();

    // try-catch block
    try {
      // sends PUT request to API with token
      const response = await fetch("http://localhost:8080/users/change", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        // request body is a JSON objects
        body: JSON.stringify({
          username,
          currentPassword,
          newPassword,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // alerts the user that their password was changed
        alert("Password changed successfully!");
        // reset the input fields
        setUsername("");
        setCurrentPassword("");
        setNewPassword("");
      } else if (response.status === 401) {
        // alerts the user that there was an error
        alert(`Error: ${data.message}`);
      } else {
        console.log(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    // renders a form
    <div className="container3">
      <h2>Change Password</h2>
      <Form onSubmit={handleChangePassword}>
        <div className="change-form">
          <label>Username:</label>
          <input
            type="text"
            className="form-control"
            value={username}
            // updates the username state
            onChange={(e) => setUsername(e.target.value)}
          />
          <label>Current Password:</label>
          <input
            type="password"
            className="form-control"
            value={currentPassword}
            // updates the currentPassword state
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
          <label>New Password:</label>
          <input
            type="password"
            className="form-control"
            value={newPassword}
            // updates the newPassword state
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>
        {/* handles the submit */}
        <Button
          style={{ marginTop: "15px", marginLeft: "5px" }}
          variant="primary"
          type="submit"
        >
          Change Password
        </Button>
      </Form>
    </div>
  );
};

// export the component
export default ChangePasswordForm;
