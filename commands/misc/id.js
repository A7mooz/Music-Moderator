module.exports = {
    commands: 'id',
    minArgs: 0,
    maxArgs: 0,
    callback: (message, arguments, text) => {
        message.channel.send(`Your ID is:`)
        message.channel.send(`\`${message.member.id}\``)
    },
}