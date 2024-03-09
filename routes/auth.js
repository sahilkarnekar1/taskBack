const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/User');
const Task = require('../models/Task');

// Route to register a new user
router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
  
    try {
      // Check if the user already exists
      let user = await User.findOne({ email });
      if (user) {
        return res.status(200).json({ msg: 'User already exists' });
      }
  
      // Create a new user
      user = new User({
        username,
        email,
        password
      });
  
      // Hash the password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
  
      // Save the user to the database
      await user.save();
  
      res.json({ msg: 'User registered successfully' });
    } catch (err) {
      console.error(err.message);
      res.status(200).send('Server Error');
    }
  });
// Route to login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if the user exists
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(200).json({ msg: 'Invalid credentials' });
        }

        // Validate password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(200).json({ msg: 'Invalid credentials' });
        }

        // Destructure user document excluding the password field
        const { password: userPassword, ...userData } = user._doc;

        // Send user data without password
        res.status(200).json(userData);
    } catch (err) {
        console.error(err.message);
        res.status(200).send('Server Error');
    }
});

  
  module.exports = router;