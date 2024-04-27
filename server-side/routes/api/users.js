const express = require('express');
const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Signup Route
router.post('/signup', async (req, res) => {
  try {
    const { email, username, password } = req.body; // Removed confirmPassword from destructuring
    
    if (password.length < 6) {
      return res.status(400).json({ msg: "Password should be at least 6 characters" });
    }
    
    // confirmPassword check removed

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: "User with the same email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 8);
    const newUser = new User({ email, username, password: hashedPassword });
    const savedUser = await newUser.save();

    res.json(savedUser);
  } catch (err) {
    console.log(`Backend failed in signup: ${err}`);
    res.status(500).json({ error: err.message });
  }
});

//login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(400).send({ msg: "User with that username does not exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).send({ msg: "incorrect password"});
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    console.log('Token to be sent: ', token); 
    res.json({ token, user: { id: user._id, username: user.username } });
    
  } catch (err) {
    console.log(`Backend failed in login: ${err}`);
    res.status(500).json({ error: err.message });
  }
});


// Token Verification Route
router.post('/tokenIsValid', async (req, res) => {
  try {
    const token = req.header("x-auth-token");

    if (!token) return res.json(false);

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (!verified) return res.json(false);

    const user = await User.findById(verified.id);
    if (!user) return res.json(false);

    return res.json(true);
  } catch (err) {
    console.log(`Backend failed in trying to check if token is valid: ${err}`);
    res.status(500).json({ error: err.message });
  }
});



module.exports = router;
