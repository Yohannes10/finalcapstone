//task controller
// import necessary module
const Task = require("../models/taskSchema");

// Get all tasks
exports.getAllTasks = async (req, res) => {
  try {
    // retrieves all tasks accociated with the authenticated user
    const tasks = await Task.find({ user: req.user._id });
    // queries the model and returns an array of the task objects
    res.json(tasks);
  } catch (err) {
    // sends error message
    res.status(500).json({ message: "Internal server error" });
  }
};

// Create a task
exports.createTask = async (req, res) => {
  try {
    // task title, description, and date must be in the request body
    const { title, description, date } = req.body;

    // creates a new instance of the model with the title, description, date, and authenticated user's ID
    const task = new Task({
      title,
      description,
      date,
      user: req.user._id,
    });

    // saved to the database
    await task.save();

    // send the created task
    res.status(201).json(task);
  } catch (err) {
    // log the error
    console.error("Error creating task:", err);
    // sends the error message
    res.status(500).json({ message: "Error creating task" });
  }
};

// Update a task
exports.updateTask = async (req, res) => {
  try {
    // task ID is specified in the request parameters
    const { id } = req.params;
    const { title, description, date, completed } = req.body;

    // finds the task and edits it to the new title
    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { title, description, date, completed },
      { new: true }
    );

    // if the task is not found send error message
    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    // send the updated task
    res.json(updatedTask);
  } catch (err) {
    // sends error message
    res.status(500).json({ message: "Internal server error" });
  }
};

// Delete a task
exports.deleteTask = async (req, res) => {
  try {
    // task ID (id) is specified in the request parameters
    const { id } = req.params;

    // removes by id
    const deletedTask = await Task.findByIdAndRemove(id);

    // if the task is not found send error message
    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    // send No Content status code -> indicates that the server has successfully processed the request but there is no content to send back in the response payload
    res.sendStatus(204);
  } catch (err) {
    // sends error message
    res.status(500).json({ message: "Internal server error" });
  }
};

// Toggle a task to true of false
exports.toggleTask = async (req, res) => {
  try {
    // task ID (id) is specified in the request parameters
    const { id } = req.params;
    const { completed } = req.body;

    // finds by id and toggles the false to true and vice versa
    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { completed }, // Only update the 'completed' field not the title
      { new: true }
    );

    // if the task is not found send error message
    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    // send the toggles task
    res.json(updatedTask);
  } catch (err) {
    // sends error message
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get rating summary
exports.getRatingSummary = async (req, res) => {
  try {
    // Retrieve the ratings data from the database
    const ratings = await Task.find({ user: req.user._id }, 'title rating');

    // Send the ratings data as the response
    res.json(ratings);
  } catch (err) {
    // Send an error message if an error occurs
    res.status(500).json({ message: "Internal server error" });
  }
};
