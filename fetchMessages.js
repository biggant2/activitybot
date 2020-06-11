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