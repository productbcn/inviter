var request = require('request')
var querystring = require('querystring')

const TF_NAME_BLOCK_ID = 'PBiqBy7v7jeq'
const TF_EMAIL_BLOCK_ID = 'iMIntN1gMK5E'
const SLACK_GENERAL_CHANNEL = 'C7ZE7S6D7'

function parseAnswer(event, answerKey) {
    let answer = (event.form_response.answers.find((answer) => {
        return answer.field.id === answerKey
    }))
    return answer.text || answer.email // yay
}

exports.handler = (event, context, callback) => {
    
    let name = parseAnswer(event, TF_NAME_BLOCK_ID)
    let email = parseAnswer(event, TF_EMAIL_BLOCK_ID)
    
    let slackApiPayload = {
        email: email,
        source: "invite_modal",
        mode: "manual",
        channels: SLACK_GENERAL_CHANNEL,
        real_name: name,
        token: process.env.slack_api_token,
        set_active:true
    }

    request.post({
        url:'https://product-bcn.slack.com/api/users.admin.invite',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: querystring.stringify(slackApiPayload)
    }, callback)
    
    
    // callback(null, `Hello ${name}.  Your email is ${email}.  using parsed things`);
};