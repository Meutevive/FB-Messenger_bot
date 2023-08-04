const express = require('express');
const router = express.Router();
const { handleMessage } = require('../handlers/handler');
const { v4: uuidv4 } = require('uuid');

// This endpoint is for receiving messages from your custom UI
router.post('/message', (req, res) => {
    const { text } = req.body;

    // Generate a unique sender_id
    const sender_id = uuidv4();

    handleMessage(sender_id, { text })
        .then(response => {
            console.log('fulfillmentText:', response.fulfillmentText);
            // Send the response from DialogFlow back to your custom UI
            res.json({fulfillmentText: response.fulfillmentText});
        })
        .catch(err => {
            console.error('Error handling message:', err);
            res.status(500).send('Error handling message');
        });
});

module.exports = router;
