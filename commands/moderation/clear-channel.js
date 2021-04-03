module.exports = {
    commands: ['cc'],
    guidOnly: true,
    ownerOnly: true,
    discription: 'clear 100 message form less than 4 weeks',
    callback: ({ message: msg, channel, guild }) => {

        channel.messages.fetch({ limit: 100 }).then(messages => {
            channel.bulkDelete(messages, true)
        })

    }
}