require('dotenv').config();

const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const flash = require('connect-flash');
const session = require('express-session');

const indexRoute = require('./routes/index');
const usersRoute = require('./routes/users');

const app = express();

const port = process.env.PORT || 6969;

// Mongoose Connect.
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true });

// EJS.
app.set('view engine', 'ejs');
app.use(expressLayouts);

// Body Parser.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Session.
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
  })
);

// Flash.
app.use(flash());

// Global variables.
app.use((req, res, next) => {
  res.locals.successMessage = req.flash('successMessage');
  res.locals.errorMessage = req.flash('errorMessage');
  next();
});

// Routes.
app.use('/', indexRoute);
app.use('/users', usersRoute);

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
