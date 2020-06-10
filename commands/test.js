exports.run = (client, message, args) => {
    console.log(args);
    return message.channel.send("test");
}

exports.help = {
    "name": "test",
    "description": "test command"
}