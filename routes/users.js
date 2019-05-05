const express = require('express');
const router = express.Router();

// Login page.
router.get('/login', (req, res) => res.render('login'));

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
      res.send('pass');
    }
  });

module.exports = router;
