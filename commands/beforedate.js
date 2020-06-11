const fetchMessages = require('../fetchMessages.js');

exports.run = async (client, message, args) => {
    if(!args[0] || !args[1] || !args[2]) return;
    let before = new Date(args[0], +args[1] - 1, args[2]);
    fetchMessages.beforeDate(message.channel, {before: before})
        .then(messages => message.channel.send(messages.map(message => message.content)))
}

exports.help = {
    "name": "beforedate",
    "description": "get messages before date"
}