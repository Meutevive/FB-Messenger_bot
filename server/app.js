require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const axios = require('axios');
const pageAccessToken = process.env.PAGE_ACCESS_TOKEN;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Webhook setup
app.get('/webhook', (req, res) => {
    let VERIFY_TOKEN = process.env.VERIFY_TOKEN;

    let mode = req.query['hub.mode'];
    let token = req.query['hub.verify_token'];
    let challenge = req.query['hub.challenge'];

    console.log("mode: ", mode); 
    console.log("token: ", token);  
    console.log("VERIFY_TOKEN: ", VERIFY_TOKEN);  

    // Checks if a token and mode is in the query string of the request
    if (mode && token) {
        // Checks the mode and token sent is correct
        if (mode === 'subscribe' && token === VERIFY_TOKEN) {
            console.log('WEBHOOK_VERIFIED');
            res.status(200).send(challenge);
        } else {
            res.sendStatus(403);
        }
    }
});


// Handle messaging events
app.post('/webhook', (req, res) => {
    let body = req.body;

    // Checks this is an event from a page subscription
    if (body.object === 'page') {
        body.entry.forEach(function (entry) {
            let webhook_event = entry.messaging[0];
            console.log(webhook_event);

            let sender_id = webhook_event.sender.id;

            // Check if the event is a message or postback and
            // pass the event to the appropriate handler function
            if (webhook_event.message) {
                handleMessage(sender_id, webhook_event.message);
            } else if (webhook_event.postback) {
                handlePostback(sender_id, webhook_event.postback);
            }
        });

        res.status(200).send('EVENT_RECEIVED');
    } else {
        res.sendStatus(404);
    }
});

// Handle message events
function handleMessage(sender_id, receivedMessage) {
    let response;

    if (receivedMessage.text) {
        response = { "text": `You said: "${receivedMessage.text}". ` };
    }

    callSendAPI(sender_id, response);
}

// Handle postback events
function handlePostback(sender_id, received_postback) {
    console.log(`Received postback for user "${sender_id}:`, received_postback);
}

// Send a response message
function callSendAPI(sender_id, response) {
    let requestBody = {
        "recipient": { "id": sender_id },
        "message": response
    };

    axios.post(`https://graph.facebook.com/v12.0/me/messages?access_token=${pageAccessToken}`, requestBody)
        .then(res => console.log(`Message sent to user ${sender_id}`))
        .catch(err => console.log('Error sending message:', err));
}

// Start server
app.listen(port, () => {
    console.log(`Webhook server is listening, port  ${port}`);
});
