// Dependencies and Modules
const express = require("express");
const userController = require("../controllers/user");

// Auth
const auth =require("../auth");

// Object destructuring
const {verify, verifyAdmin} = auth;

// Routing Component
const router = express.Router();

// Route for user Registration
router.post("/register", (req,res) => {
	userController.registerUser(req.body).then(resultFromController => res.send(resultFromController));
});

// Route for User Authentication (Login)
router.post("/login", userController.loginUser);

// Route to Non-admin User checkout (Create Order)
router.post("/order", verify, userController.order);

// Route for retreiving user details
router.get("/userDetails", verify, userController.getProfile);

// // Update user profile route
router.put('/profile', verify, userController.updateProfile);

// Export Route System
module.exports = router;