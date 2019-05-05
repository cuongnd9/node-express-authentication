const express = require('express');
const expressLayouts = require('express-ejs-layouts');

const indexRoute = require('./routes/index');
const usersRoute = require('./routes/users');

const app = express();

const port = process.env.PORT || 6969;

// EJS.
app.set('view engine', 'ejs');
app.use(expressLayouts)

// Routes.
app.use('/', indexRoute);
app.use('/users', usersRoute);

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
