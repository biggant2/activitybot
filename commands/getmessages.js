const Discord = require('discord.js');
const fetchMessages = require('../fetchMessages.js');

exports.run = async (client, message, args) => {
    if(!+args[0]) return;
    fetchMessages.fetch(message.channel, +args[0])
        .then(messages => message.channel.send(messages.array().length))
}

exports.help = {
    "name": "getmessages",
    "description": "get messages"
}