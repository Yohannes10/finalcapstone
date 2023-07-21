/* Defines a Mongoose schema for an object and exports it as a model*/

// import mongoose module
const mongoose = require("mongoose");

// schema defines the structure and properties of the task object
const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  rating: {
    type: Number,
    default: 0,
  },
  // represents the user associated with the task
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

// Creating the model
const Task = mongoose.model("Task", taskSchema);

// export the Task module
module.exports = Task;
