// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    shippingAddress: String,
});

const User = mongoose.model('users', userSchema);

module.exports = User;