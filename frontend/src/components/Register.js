/* 
  This is a React functional component that represents a registration form.
  It receives a prop called 'handleRegister' which is a function provided by the parent component.
*/

// Import necessary modules and assets
import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import styles from "./Auth/styles/Username.module.css"; // Import CSS styles for styling
import avatar from "./Auth/assets/profile.png"; // Import default avatar image
import convertToBase64 from "./Auth/helper/convert"; // Import helper function for converting files to base64 format
import { Link, useNavigate } from "react-router-dom"; // Import routing functionalities

// Define the Register component using arrow function syntax, and receive props from the parent component
const Register = ({ handleRegister }) => {
  // State variables to manage the username and password input values
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Function to handle the form submission
  const handleSubmit = (e) => {
    // Prevent the default form submission behavior
    e.preventDefault();
    // Call the 'handleRegister' function provided by the parent component, passing the username and password as arguments
    handleRegister(username, password);
    // Clear the username and password input values after submission
    setUsername("");
    setPassword("");
  };

  // Initialize routing functionality
  const navigate = useNavigate();

  // State variable and event handler for file upload
  const [file, setFile] = useState("");
  const onUpload = async (e) => {
    // Convert the selected file to base64 format using the helper function 'convertToBase64'
    const base64 = await convertToBase64(e.target.files[0]);
    // Update the 'file' state with the base64 representation of the selected file
    setFile(base64);
  };

  return (
    // Render the registration form
    <div className="container mx-auto">
      <div className="flex justify-center items-center h-screen">
      <div className={styles.glass} style={{ width: '40%', height:'100%' }}>
          <div className="title flex flex-col items-center">
            <h4 className="text-5xl font-bold">Register</h4>
            <span className="py-4 text-xl w-2/3 text-center text-gray-500">
              Welcome!
            </span>
          </div>
          <Form className="py-8" onSubmit={handleSubmit}>
          <div className="profile flex justify-center py-1">
              <label htmlFor="profile">
                <img
                  src={file || avatar}
                  className={`${styles.profile_img}`}
                  alt="avatar"
                />
              </label>
              <input onChange={onUpload} type="file" id="profile" name="profile" />
            </div>
            <div className="textbox flex flex-col items-center gap-2">
              {/* Input field for username */}
              <input
                className={styles.textbox}
                type="text"
                value={username}
                // Update the 'username' state when the input value changes
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
              />

              {/* Input field for password */}
              <input
                className={styles.textbox}
                type="password"
                value={password}
                // Update the 'password' state when the input value changes
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
              />
               <input
                type="company"
                className={styles.textbox}
                placeholder="company"
              />
               <input
                type="empID"
                className={styles.textbox}
                placeholder="empID"
              />
                <input
                type="role"
                className={styles.textbox}
                placeholder="role"
              />

              {/* Submit button */}
              <Button className={styles.btn} type="submit">
                Register
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

// Export the Register component
export default Register;
