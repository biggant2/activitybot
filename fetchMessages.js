const Discord = require('discord.js');

exports.fetch = async (channel, {num = 100, before, after}) => {
    let messages = new Discord.Collection();
    let timesToRepeat = Math.floor(num / 100);
    let lastId = before || channel.lastMessageID;

    for(let i = 0; i < timesToRepeat; i++) {
        let partialMessages = await channel.fetchMessages({limit: 100, before: lastId, after: after})
        messages = messages.concat(partialMessages)
        lastId = partialMessages.last().id;
    }
    if(num % 100 !== 0) {
        let remainingMessages = await channel.fetchMessages({limit: num % 100, before: lastId, after: after});
        messages = messages.concat(remainingMessages)
    }

    return messages;
}

exports.beforeDate = async (channel, {before}) => {
    let messages = new Discord.Collection();
    let lastId = channel.lastMessageID;
    let partialSize = 100;

    while(partialSize === 100) {
        let partialMessages = await channel.fetchMessages({limit: 100, before: lastId})
        messages = messages.concat(partialMessages)
        lastId = partialMessages.last().id;
        partialSize = partialMessages.array().length
    }

    let partialMessages = await channel.fetchMessages({limit: 100, before: lastId});
    messages = messages.concat(partialMessages);

    return messages.filter(message => message.createdAt < before);
}

exports.afterDate = async (channel, {after}) => {
    let messages = new Discord.Collection();
    let earliestTimestamp = new Date();
    let lastId = channel.lastMessageID;
    console.log(after)

    while(earliestTimestamp > after) {
        let partialMessages = await channel.fetchMessages({limit: 100, before: lastId})
        messages = messages.concat(partialMessages)
        lastId = partialMessages.last().id;
        earliestTimestamp = partialMessages.last().createdAt;
        earliestTimestamp = new Date(earliestTimestamp.toDateString());
    }

    return messages.filter(message => new Date(message.createdAt.toDateString()) > after);
}