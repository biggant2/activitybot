const fetchMessages = require('../fetchMessages.js');

exports.run = async (client, message, args) => {
    if(!+args[0]) return;
    fetchMessages.fetch(message.channel, {num: +args[0], before: args[1], after: args[2]})
        .then(messages => message.channel.send(messages.array().map(message => message.content)))
}

exports.help = {
    "name": "getmessages",
    "description": "get messages"
}