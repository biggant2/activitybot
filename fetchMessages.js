const Discord = require('discord.js');

exports.fetch = async (channel, num) => {
    let messages = new Discord.Collection();
    let timesToRepeat = Math.floor(num / 100);
    if(timesToRepeat === 0) {
        messages = await channel.fetchMessages({limit: num});
    } else {
        let lastId = channel.lastMessageID;
        for(let i = 0; i < timesToRepeat; i++) {
            let partialMessages = await channel.fetchMessages({limit: 100, before: lastId})
            messages = messages.concat(partialMessages)
            lastId = partialMessages.last().id;
        }
        if(num % 100 !== 0) {
            let remainingMessages = await channel.fetchMessages({limit: num % 100, before: lastId});
            messages = messages.concat(remainingMessages)
        }
    }

    return messages;
}