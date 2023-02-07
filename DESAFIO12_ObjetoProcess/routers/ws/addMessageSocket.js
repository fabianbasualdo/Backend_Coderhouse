const moment = require('moment') 
const {getnormalizedMessages} = require('../../models/normalizacion')
const MessagesDao = require('../../models/daos/messagesDao')
const UsersDao = require('../../models/daos/usersDao')

const messagesDao = new MessagesDao();
const usersDao = new UsersDao();

function formatMessage(author, text){
    return {
      author,
      time:`[${moment().format('L')} ${moment().format('LTS')}]`,
      text
    }
}

async function addMessages(socket, sockets){
    sockets.emit('allMessages', getnormalizedMessages(await messagesDao.getAll()));
    const chatBot = {
        email: 'chatbot@chat.com', 
        nombre: 'Chatbot', 
        apellido: '', 
        edad: '', 
        alias: 'Chatbot',
        avatar:'https://1.jpg',
    }
    const botWelcome = formatMessage(chatBot,'Bienvenido al Chat') 
    socket.emit('newMessage', botWelcome)

    socket.on('updateNewMessage', async (message)=>{
        const user = await usersDao.getByEmail(message.email)
        const newMessage = {
            author:user._id,
            text: message.text,
            time:`[${moment().format('L')} ${moment().format('LTS')}]`
        }
        await messagesDao.createMessage(newMessage)
        sockets.emit('allMessages', getnormalizedMessages(await messagesDao.getAll()));
    })
}

module.exports = addMessages