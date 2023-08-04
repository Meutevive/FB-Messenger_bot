const axios = require('axios'); // axios for  http query
const pageAccessToken = process.env.PAGE_ACCESS_TOKEN;


// Send a response message
function callSendAPI(sender_id, response) {
    // Create the request body object
    let requestBody = {
        "recipient": { "id": sender_id },
        "message": response
    };

    // Send the request to the Facebook Graph API using the axios library
    axios.post(`https://graph.facebook.com/v12.0/me/messages?access_token=${pageAccessToken}`, requestBody)
        .then(res => console.log(`Message sent to user ${sender_id}. Response: `, res.data))
        .catch(err => console.log('Error sending message:', err));
}   


module.exports = callSendAPI; //export fonction callSendAPI