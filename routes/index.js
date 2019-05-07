const express = require('express');
const { ensureAythenticated } = require('../config/auth');

const router = express.Router();

// Welcome Page.
router.get('/', (req, res) => res.render('welcome'));

// Dashboard page.
router.get('/dashboard', ensureAythenticated, (req, res) =>
  res.render('dashboard', { user: req.user })
);

module.exports = router;
