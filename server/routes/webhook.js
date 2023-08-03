const express = require('express');
const router = express.Router();
const {handleMessage, handlePostback} = require('../handlers/handler');


// Webhook setup
router.get('/webhook', (req, res) => {
    // Get the VERIFY_TOKEN from environment variables
    let VERIFY_TOKEN = process.env.VERIFY_TOKEN;

    // Get the mode, token, and challenge from the query string
    let mode = req.query['hub.mode'];
    let token = req.query['hub.verify_token'];
    let challenge = req.query['hub.challenge'];

    // Log the mode, token, and VERIFY_TOKEN
    console.log("mode: ", mode);
    console.log("token: ", token);
    console.log("VERIFY_TOKEN: ", VERIFY_TOKEN);

    // Check if a token and mode is in the query string of the request
    if (mode && token) {
        // Check if the mode and token sent is correct
        if (mode === 'subscribe' && token === VERIFY_TOKEN) {
            console.log('WEBHOOK_VERIFIED');
            // Send the challenge back to verify the webhook
            res.status(200).send(challenge);
        } else {
            // Return a forbidden status if the mode or token is incorrect
            res.sendStatus(403);
        }
    }
});



// Handle messaging events
router.post('/webhook', (req, res) => {
    // Get the request body
    let body = req.body;

    // Check if this is an event from a page subscription
    if (body.object === 'page') {
        // Iterate over each entry in the body
        body.entry.forEach(function (entry) {
            // Get the messaging event
            let webhook_event = entry.messaging[0];
            console.log(webhook_event);

            // Get the sender ID
            let sender_id = webhook_event.sender.id;

            // Check if the event is a message or postback and
            // pass the event to the appropriate handler function
            if (webhook_event.message) {
                handleMessage(sender_id, webhook_event.message);
            } else if (webhook_event.postback) {
                handlePostback(sender_id, webhook_event.postback);
            }
        });

        // Send a success response
        res.status(200).send('EVENT_RECEIVED');
    } else {
        // Return a not found status if the request is not from a page subscription
        res.sendStatus(404);
    }
});

module.exports = router;