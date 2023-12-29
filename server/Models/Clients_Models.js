const mongoose = require('mongoose');

const panierItemSchema = new mongoose.Schema({
  id: String, // Assuming id is a string, adjust the type as needed
  quantity: Number,
});

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  shippingAddress: String,
  Paniers: [panierItemSchema],
});

const User = mongoose.model('users', userSchema);

module.exports = User;
