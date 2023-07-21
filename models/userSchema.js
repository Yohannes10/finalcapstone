/* Defines a Mongoose schema for an object and exports it as a model*/

// import mongoose module
const mongoose = require("mongoose");

// schema defines the structure and properties of the user object
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    // marked as unique -> each username must be diffrent from the previous
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
 /*  isAdmin: {
    type: Boolean,
    default: false,
  }, */
});

// Creating the model
const User = mongoose.model("User", userSchema);

// export the User module
module.exports = User;

