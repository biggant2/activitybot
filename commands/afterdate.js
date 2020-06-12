const fetchMessages = require('../fetchMessages.js');

exports.run = async (client, message, args) => {
    if(!args[0] || !args[1] || !args[2]) return;
    let after = new Date(args[0], +args[1] - 1, args[2]);
    fetchMessages.afterDate(message.channel, {after: after})
        .then(messages => console.log(messages.map(message => message.content).length))
}

exports.help = {
    "name": "afterdate",
    "description": "get messages after date"
}