const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');
const User = require('../models/User');

const router = express.Router();

// Login page.
router
  .route('/login')
  .get((req, res) => res.render('login'))
  .post((req, res, next) => {
    passport.authenticate('local', {
      successRedirect: '/dashboard',
      failureRedirect: '/users/login',
      failureFlash: true
    })(req, res, next);
  });

// Logout handle.
router.get('/logout', (req, res) => {
  req.logOut();
  req.flash('successMessage', 'You are logged out');
  res.redirect('/users/login');
});

// Register page.
router
  .route('/register')
  .get((req, res) => res.render('register'))
  .post((req, res) => {
    const { name, email, password, confirmPassword } = req.body;

    let errors = [];
    // Check required fields.
    if (!name || !email || !password || !confirmPassword) {
      errors.push({ message: 'Please fill in all fields' });
    }
    // Check passwords matchMedia.
    if (password !== confirmPassword) {
      errors.push({ message: "Passwords don't match" });
    }
    // Check password length.
    if (password.length < 6) {
      errors.push({ message: 'Password should be at least 6 characters' });
    }

    if (errors.length > 0) {
      res.render('register', {
        errors,
        name,
        email,
        password,
        confirmPassword
      });
    } else {
      User.findOne({ email }).then(user => {
        if (user) {
          errors.push({ message: 'Email is already registered' });
          res.render('register', {
            errors,
            name,
            email,
            password,
            confirmPassword
          });
        } else {
          bcrypt.hash(password, 10).then(hash => {
            const newUser = new User({
              name,
              email,
              password: hash
            });
            newUser
              .save()
              .then(user => {
                req.flash(
                  'successMessage',
                  'You are now registered and can log in'
                );
                res.redirect('/users/login');
              })
              .catch(err => console.log(err));
          });
        }
      });
    }
  });

module.exports = router;
