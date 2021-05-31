module.exports = {
    commands: ['clearchannel', 'cc'],
    guildOnly: true,
    ownerOnly: true,
    description: 'clear last 100 message form less than 2 weeks',
    callback: ({ message, channel, guild }) => {
        message.delete().then(() => {
            channel.messages.fetch({ limit: 100 }).then(messages => {
                channel.bulkDelete(messages, true)
            })
        })

    }
}