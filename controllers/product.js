// Dependencies and Modules
const Product = require("../models/Product");
const User = require("../models/User");

// Create New Product Controller
module.exports.addProduct = (req, res) => {

	let newProduct = new Product ({
		name: req.body.name,
		description: req.body.description,
		price: req.body.price
	});

	// Saves the created object to our database
	return newProduct.save().then((product, error) => {

		// returns false if there is an error saving the document
		if(error){
			return res.send(false);

			// return true if there is no error
		} else {
			console.log(error);
			return res.send(true);

		}
	}).catch(error => res.send(error));
}

// Retieve All Products
module.exports.getAllProducts = (req,res) => {

	// to retrieve all the documents in the "courses" collection, we will use the find({}) method
	return Product.find({}).then(result => {
		return res.send(result)
	})
}

// Retieve All ACTIVE Products
module.exports.getAllActive = (req, res) => {

	return Product.find({isActive: true}).then(result => {
		return res.send(result);
	});
}

// Retrieving A Single Product
module.exports.getProduct = (req, res) => {

	return Product.findById(req.params.courseId).then(result => {
		return res.send(result);
	});
}

// Update Product
module.exports.updateProduct = (req, res) => {

	// Specify the fields/properties of the document to be updated
	let updatedProduct = {
		name: req.body.name,
		description: req.body.description,
		price: req.body.price
	}

	return Product.findByIdAndUpdate(req.params.courseId, updatedProduct).then((product, error) => {

		if(error){
			return res.send(false);

		} else {
			return res.send(true);
		}
	});
}


// Archive Product
module.exports.archiveProduct = (req, res) => {
	let updatedActiveField = {
		isActive: false
	}

	return Product.findByIdAndUpdate(req.params.courseId, updatedActiveField).then((product, error) => {

		if(error){
			return res.send(false);

		} else {
			return res.send(true);
		}
	});
}

// Activate Product
module.exports.activateProduct = (req, res) => {
	let updatedActiveField = {
		isActive: true
	}

	return Product.findByIdAndUpdate(req.params.courseId, updatedActiveField).then((course, error) => {

		if(error){
			return res.send(false);

		} else {
			return res.send(true);
		}
	});
}

// // Controller action to search for products by name
module.exports.searchProductsByName = async (req, res) => {
  try {
    const { productName } = req.body;

    // Use a regular expression to perform a case-insensitive search
    const products = await Product.find({
      name: { $regex: productName, $options: 'i' }
    });

    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};