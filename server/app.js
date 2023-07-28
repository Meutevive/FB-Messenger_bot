require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const axios = require('axios');
const pageAccessToken = process.env.PAGE_ACCESS_TOKEN;




app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());


//Demare du serveur
app.listen(port, () => {
    console.log(`Webhook server is listening, port  ${port}`);
});