module.exports = {
    commands: ['cc'],
    guidOnly: true,
    ownerOnly: true,
    callback: ({ message: msg, channel, guild }) => {

        channel.messages.fetch({ limit: 100 }).then(messages => {
            channel.bulkDelete(messages, true)
        })

    }
}