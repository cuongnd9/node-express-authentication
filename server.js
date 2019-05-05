const express = require('express');

const homeRoute = require('./routes/index');
const usersRoute = require('./routes/users');

const app = express();

const port = process.env.PORT || 6969;

// Routes.
app.use('/', homeRoute);
app.use('/users', usersRoute);

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
