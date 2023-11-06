// Dependencies
const mongoose = require("mongoose");

// Schema/Blueprint
const userSchema = new mongoose.Schema({

	email: {
		type: String,
		required: [true, "Email is required"]
	},

	password: {
		type: String,
		required: [true, "Password is required"]
	},

	isAdmin: {
		type: Boolean,
		default: false
	},

	orderedProducts: [
		{
			products: [
					{
						productId: {
							type: String,
							required: [true, "ProductId is required"]
						},
					}
				],
			// totalPrice: {
			// 	type: Number,
			// 	required: [true, "Total Price is required"]
			// },

			purchasedOn: {
				type: Date,
				default: new Date()
			}
		}
	]
});

// Model 
module.exports = mongoose.model("User", userSchema);
