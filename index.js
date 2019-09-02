const express = require('express');
const bodyParser = require('body-parser');
const mongoose  = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const { redisConnection } = require('./src/cache');


const app = express();
const port = process.env.PORT || 3008;
const DB_URI = process.env.MONGODB_URI;

mongoose.connect(DB_URI, {
  useCreateIndex: true,
  useNewUrlParser: true,
  autoReconnect: true
});


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());
redisConnection();
require('./src/routes')(app, passport);
require('./src/middlewares')(passport);

app.listen(port, () => console.log(`App running on PORT ${port}`));
