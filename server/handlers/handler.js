const { OpenAIApi } = require('openai'); //import open ai api
const openai = new OpenAIApi({ api_key: process.env.OPENAI_API_KEY });
const callSendAPI = require('../services/messenger'); // import messenger function

// Handle message events
function handleMessage(sender_id, receivedMessage, isMessenger = false) {
    return new Promise((resolve, reject) => {
        // Send request to OpenAI
        openai.complete({
            model: 'gpt-3.5-turbo',
            prompt: receivedMessage.text,
            max_tokens: 50
        }).then(response => {
            let responseText = response.choices[0].text.trim();
            console.log('OpenAI response:', responseText);
            // Check if the message came from Messenger or custom UI
            if (isMessenger) {
                // Send OpenAI response to user on Messenger
                callSendAPI(sender_id, { text: responseText });
            }

            // Resolve promise with the OpenAI response
            resolve({ fulfillmentText: responseText });
        }).catch(err => {
            console.error('Error processing OpenAI completion:', err);

            // Check if the message came from Messenger or custom UI
            if (isMessenger) {
                callSendAPI(sender_id, { text: 'There was an error processing your request.' });
            }

            // Reject promise with the error
            reject(err);
        });
    });
}

// Handle postback events
function handlePostback(sender_id, received_postback) {
    // Log the received postback
    console.log(`Received postback for user ":`, received_postback);
}

//export module
module.exports = {
    handleMessage,
    handlePostback
};
