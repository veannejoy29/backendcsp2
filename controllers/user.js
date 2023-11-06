// Dependencies and Modules
const User = require("../models/User");
const Product = require("../models/Product");
const bcrypt = require("bcrypt");

// Auth
const auth = require("../auth");

// User registration controller 
module.exports.registerUser = (reqBody) => {

	let newUser = new User ({
		firstName: reqBody.firstName,
		lastName: reqBody.lastName,
		email: reqBody.email,
		mobileNo: reqBody.mobileNo,
		password: bcrypt.hashSync(reqBody.password, 10)
	});

	// Saves the created object to our database
	return newUser.save().then((user, error) => {

		// User registration fails
		if(error){
			return false;

		// User registration succeed
		} else {
			return true;
		}
	});
}

// User Authentication Controller
module.exports.loginUser = (req, res) => {

	return User.findOne({email: req.body.email}).then(result => {

		if(result == null){
			return false;

		} else {
			const isPasswordCorrect = bcrypt.compareSync(req.body.password, result.password);

			if(isPasswordCorrect) {

				res.send({
					access: auth.createAccessToken(result)
				});
			} else {
				return res.send(false);
			}
		}
	});
}


// Non-admin User checkout (Create Order)

module.exports.order = async (req, res) => {

	if(req.user.isAdmin){
		return res.send("Action forbidden")
	}

	let isUserUpdated = await User.findById(req.user.id).then(user => {

		let newOrderedProduct = {
			productId: req.body.productId,
			
		}

		user.orderedProducts.push(newOrderedProduct);

		return user.save().then(user => true).catch(error => error.message);
	});

	if(isUserUpdated !== true){
		return res.send({
			message: isUserUpdated
		});
	}


	let isProductUpdated = await Product.findById(req.body.productId).then(product => {

		let buyer = {
			userId: req.user.id
		}

		product.userOrders.push(buyer);

		return product.save().then(product => true).catch(error => error.message);
	});

	if(isProductUpdated !== true){
		return res.send({
			message: isProductUpdated
		});
	}

	if(isUserUpdated && isProductUpdated){
		return res.send({
			message: "Ordered Successfully."
		});
	}
}

// Retrieve User Details
module.exports.getProfile = (req, res) => {

	return User.findById(req.user.id).then(result => {

		result.password = "";

		return res.send(result);

	}).catch(error => res.send(error));
}

// // Controller function to update the user profile
module.exports.updateProfile = async (req, res) => {
  try {
    // Get the user ID from the authenticated token
    const userId = req.user.id;

    // Retrieve the updated profile information from the request body
    const { firstName, lastName, mobileNo } = req.body;

    // Update the user's profile in the database
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { firstName, lastName, mobileNo },
      { new: true }
    );

    res.json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to update profile' });
  }
}