const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/User');

// Register
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }
    user = new User({ name, email, password });
    await user.save();
    res.status(201).json({ msg: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// Login
router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      res.json({ msg: 'Logged in successfully', user });
    });
  })(req, res, next);
});

// Logout
router.get('/logout', (req, res) => {
  req.logout();
  res.json({ msg: 'Logged out successfully' });
});

module.exports = router;