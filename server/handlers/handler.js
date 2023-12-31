const dialogflow = require('@google-cloud/dialogflow'); //diaglof flow
const sessionClient = new dialogflow.SessionsClient();
const callSendAPI = require('../services/messenger'); // import messenger function
const { text } = require('body-parser');

// Handle message events
function handleMessage(sender_id, receivedMessage, isMessenger = false) {
    return new Promise((resolve, reject) => {
        // Create the session path using the Google project ID and sender ID
        const sessionPath = sessionClient.projectAgentSessionPath(process.env.GOOGLE_PROJECT_ID, sender_id);

        // Create the request object for Dialogflow
        const request = {
            session: sessionPath,
            queryInput: {
                text: {
                    text: receivedMessage.text,
                    languageCode: 'en-US' // update this to the language you want to use
                }
            },
        }

        // Send request to Dialogflow
        sessionClient.detectIntent(request)
            .then(response => {
                const result = response[0].queryResult;
                let responseText = result.fulfillmentText;

                // Log the complete result
                console.log('Result:', result);

                // Log the intentDetectionConfidence value
                console.log('Intent Detection Confidence:', result.intentDetectionConfidence);

                // Check if Dialogflow understood the intent
                if (result.intentDetectionConfidence < 0.5) {
                    responseText = 'I am sorry, I cannot answer that question yet.';
                }

                // Check if the message came from Messenger or custom UI
                if (isMessenger) {
                    // Send Dialogflow response to user on Messenger
                    callSendAPI(sender_id, { text: responseText });
                }

                // Resolve promise with the Dialogflow response
                resolve({fulfillmentText: responseText});
            })
            .catch(err => {
                console.error('Error processing Dialogflow intent:', err);

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
