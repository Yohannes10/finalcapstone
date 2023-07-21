/* 
  This React functional child component represents a form for adding or editing a task.
  It receives props from the parent component.
*/

// Import necessary modules
import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";

// Functional component using arrow function syntax that receives props from the parent component
const TaskForm = ({ addTask, initialTitle = "", onCancel }) => {
  // State variables
  const [title, setTitle] = useState(initialTitle); // Manages the state of the task title
  const [isEditMode, setIsEditMode] = useState(initialTitle !== ""); // Manages the state of edit mode based on initialTitle prop

  // Updates the title and isEditMode accordingly when initialTitle changes
  useEffect(() => {
    setTitle(initialTitle); // Sets the title state to match the initial state
    setIsEditMode(initialTitle !== ""); // Sets the edit mode to true if initialTitle is not an empty string
  }, [initialTitle]);

  // Handles the submission of the form
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevents the default form submission behavior
    if (title.trim() !== "") { // Checks if the title is not empty after trimming any whitespace
      addTask(title); // Calls the addTask function with the title as an argument
      setTitle(""); // Sets the input value to empty
      setIsEditMode(false); // Sets the edit mode to false
    }
  };

  // If the task is being edited, render the Edit Task form with two buttons: Edit and Cancel
  if (isEditMode) {
    return (
      <div className="container1">
        <div>
          <h2>Edit Task</h2>
          <Form className="form" onSubmit={handleSubmit}>
            <input
              type="text"
              className="form-control"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)} // Updates the title state
            />
            <Button type="submit" className="btn btn-primary">
              Update Task
            </Button>
            <Button className="btn btn-secondary" onClick={onCancel}>
              Cancel
            </Button>
          </Form>
        </div>
      </div>
    );
  }

  // If a task is not being edited, render the Add Task form
  return (
    <div>
      <h2>Add Task</h2>
      <Form className="form" onSubmit={handleSubmit}>
        <input
          type="text"
          className="form-control"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)} // Updates the title state
        />
        <Button type="submit" className="btn btn-primary">
          Add Task
        </Button>
      </Form>
    </div>
  );
};

// Export the component
export default TaskForm;
