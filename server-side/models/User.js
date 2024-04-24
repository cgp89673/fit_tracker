const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, trim: true },
  password: { type: String, required: true,  },
  email: { type: String, required: true, unique: true, trim: true }
});



const User = mongoose.model('User', userSchema);
module.exports = User;
