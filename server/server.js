const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

const sessionMiddleware = require('./modules/session-middleware');
const passport = require('./strategies/user.strategy');

// Route includes
const userRouter = require('./routes/user.router');
const contractRouter = require('./routes/contract.router');
const recipientContractRouter = require('./routes/recipient.router');
const sendgridRouter = require('./routes/sendgrid.router');
const s3Router = require('./routes/s3.router');
const fileUpload = require('express-fileupload');

// Accept photo uploads
app.use(fileUpload());

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use('/api/user', userRouter);
app.use('/api/contract', contractRouter);
app.use('/api/recipient', recipientContractRouter);
app.use('/api/sendgrid', sendgridRouter)
app.use('/api/s3', s3Router)

// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5007;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
