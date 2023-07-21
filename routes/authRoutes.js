/* This code sets up an Express router, defines routes with corresponding HTTP methods and paths,
applies middleware to certain routes, and assigns controller functions to handle the logic for each route. */

// import necessary modules
const express = require("express");
const router = express.Router();

// import middleware functions -> used to perform tasks before/after handling requests
const {
  gmailUserMiddleware,
  authenticateUserMiddleware,
} = require("../middleware/middleware");


//routes specifically for the administrator
/* const { authenticateAdminMiddleware } = require("../middleware/middleware");
 */

// import controllers -> handler functions for user-related routes
const userController = require("../controllers/userController");

// POST request to register a new user
router.post("/register", gmailUserMiddleware, userController.register);

// POST request to login a user
router.post("/login", gmailUserMiddleware, userController.login);

//put request 
router.put("/change", authenticateUserMiddleware, userController.changePassword);


// PUT request to change the password
router.put(
  "/change",
  authenticateUserMiddleware,
  userController.changePassword
);

// export the router
module.exports = router;