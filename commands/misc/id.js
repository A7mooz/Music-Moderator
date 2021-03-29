module.exports = {
    commands: 'id',
    category: 'Misc',
    description: 'Shows you user id',
    minArgs: 0,
    maxArgs: 0,
    callback: ({ message }) => {
        if (message.guild) {
            message.channel.send(`**🆔 Your ID is:**`)
            message.channel.send(`\`${message.author.id}\``)
        }
    },
}