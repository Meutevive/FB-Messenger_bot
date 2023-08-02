require('dotenv').config(); // read .env file
const express = require('express'); // import express
const bodyParser = require('body-parser'); // parse application/x-www-form-urlencoded
const webhookRouter = require('./routes/webhook'); // import webhook routes
const app = express(); // create express app
const port = 3000; // start server on port 3000



app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Add webhook routes
app.use('/', webhookRouter);




// Start server
app.listen(port, () => {
    console.log(`Webhook server is listening, port  ${port}`);
});
