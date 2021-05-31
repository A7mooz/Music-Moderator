module.exports = {
    commands: 'clean',
    category: 'Moderation',
    description: 'Deletes client bot\'s message and messages that starts with the prefix',
    permissions: 'MANAGE_MESSAGES',
    guildOnly: true,
    modOnly: true,
    callback: ({ message, channel, prefix, client }) => {

        channel.messages.fetch({
            limit: 100
        }).then((messages) => {
            let botUsages = []
            let clientMessages = []

            messages.filter(m => m.content.startsWith(prefix)).forEach(msg => botUsages.push(msg))
            messages.filter(m => m.author.id == client.user.id).forEach(msg => clientMessages.push(msg))
            channel.bulkDelete(clientMessages.concat(botUsages), true)
        })

    }
}