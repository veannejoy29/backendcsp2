// Dependencies
const express = require('express');
const mongoose = require('mongoose');
// CORS (Cross Origin Resource Sharing)
const cors = require ('cors');

// Server setup
const app = express ();
const port = 4006;

// Middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

// Import Routes
const userRoutes = require("./routes/user");
const productRoutes = require("./routes/product");

// Database Connections

// Connecting to MongoDB Atlas (Cloud)
mongoose.connect("mongodb+srv://veannejoyrelucio:OGTNgemfourth.29@b320-cluster.0c0qar2.mongodb.net/courseBookingAPI?retryWrites=true&w=majority", {
	useNewUrlParser: true,
	useUnifiedTopology: true
});

let db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => console.log("We're connected to the cloud database!"));

// Backend Routes
app.use("/b6/users", userRoutes);
app.use("/b6/products", productRoutes);


// Server Start
if(require.main === module){
	app.listen(port, () => console.log(`Server running at port ${port}`));
}

module.exports = app;