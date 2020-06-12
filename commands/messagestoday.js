const Discord = require('discord.js');
const fetchMessages = require('../fetchMessages.js');

exports.run = async (client, message, args) => {
    let today = new Date(new Date().toDateString());
    let yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    let messages = new Discord.Collection();

    let promise = message.guild.channels.array().map(async channel => {
        if(!channel.lastMessage) return;
        if(channel.lastMessage.createdAt.getDate() !== today.getDate()) return;
        let response = await fetchMessages.afterDate(channel, {after: yesterday});
        messages = messages.concat(response)
    })
    await Promise.all(promise);

    console.log(messages.map(message => message.content))
}

exports.help = {
    "name": "messagestoday",
    "description": "log all of today's messages"
}