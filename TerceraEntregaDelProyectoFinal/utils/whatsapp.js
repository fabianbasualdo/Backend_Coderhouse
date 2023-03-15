const twilio = require('twilio')
const adminConfig = require('./dbConfig')
const {infoLogger, errorLogger} = require('./logger/index')

const ACCOUNT_ID = adminConfig.TWILIO_ID;
const AUTH_TOKEN = adminConfig.TWILIO_TOKEN;
const ADMIN_PHONE = adminConfig.ADMIN_PHONE;

const twilioClient = twilio(ACCOUNT_ID, AUTH_TOKEN);

async function adminWppMessage(msg){
    try {
        const messagePayload = {
            from:'whatsapp:+aqui va El Numero que te Paso TWILIO',
            to: `whatsapp:${ADMIN_PHONE}`,
            body: msg,
        }
        const messageResponse = await twilioClient.messages.create(messagePayload)
        infoLogger.info(messageResponse)
        
    } catch (error) {
        errorLogger.error(error)
    }
};

async function smsClient(phone, msg){
    try {
        const messagePayload = {
            from:'+ coloca el numero que te paso la aplicacion web',
            to: phone,
            body: msg,
        }
        const messageResponse = await twilioClient.messages.create(messagePayload)
        infoLogger.info(messageResponse)
        
    } catch (error) {
        errorLogger.error(error)
    }
}

module.exports={adminWppMessage, smsClient}