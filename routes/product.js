// Dependencies and Modules
const express = require("express");
const productController = require("../controllers/product");
const auth = require("../auth");

// Auth Middleware
const {verify,verifyAdmin} = auth;

// Routing Component
const router = express.Router();


// ROUTES
// Create a Product Route (POST)
router.post("/", verify, verifyAdmin, productController.addProduct);

// Route for Retrieving All Products (GET)
router.get("/all", productController.getAllProducts);

// Route for Retrieving all Active Products (GET)
router.get("/", productController.getAllActive);

// Route for Retrieving Single Product (GET)
router.get("/:productId", productController.getProduct);

// Route for Updating a Product (PUT) Admin only
router.put("/:productId", verify, verifyAdmin, productController.updateProduct);

// Route for Archiving a Product (PUT) Admin Only
router.put("/:productId/archive", verify, verifyAdmin, productController.archiveProduct);

// Route for Activating a Product (PUT) Admin Only
router.put("/:productId/activate", verify, verifyAdmin, productController.activateProduct);

//  Route to search for products 
router.post('/search', productController.searchProductsByName);


module.exports = router;