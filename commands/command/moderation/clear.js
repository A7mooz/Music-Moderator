module.exports = {
    commands: ['clear', 'cl', 'purge'],
    category: 'Moderation',
    expectedArgs: '<subcommand/user/amount> [amount]',
    description: 'Clears amount of messages form a channel',
    permissions: ['MANAGE_MESSAGES'],
    guidOnly: true,
    modOnly: true,
    callback: ({ args, channel, message, prefix, client }) => {

        const timeOut = 1000 * 5

        message.delete().then(() => {
            const user = message.mentions.users.first() || message.guild.member(args[1])
            const num = Math.floor(args[1])

            if (num > 100) num = 100
            if (num < 1) num = 1

            if (user) {
                if (Number.isNaN(num)) return message.reply('Please provide a valid number of messages to delete').then(msg => msg.delete({ timeout: timeOut }))

                channel.messages.fetch({
                    limit: num
                }).then((messages) => {
                    const userMessages = []
                    messages.filter(m => m.author.id === user.id).forEach(msg => userMessages.push(msg))
                    channel.bulkDelete(userMessages, true)
                })
            }
            if (args[0] === 'bots') {
                channel.messages.fetch({
                    limit: 100
                }).then((messages) => {
                    const botsMessages = []
                    messages.filter(m => m.author.bot).forEach(msg => botsMessages.push(msg))
                    channel.bulkDelete(botsMessages, true)
                })
            }
            if (args[0] === 'bot') {
                channel.messages.fetch({
                    limit: 100
                }).then((messages) => {
                    const botUsages = []
                    const clientMessages = []

                    messages.filter(m => m.content.startsWith(prefix)).forEach(msg => botUsages.push(msg))
                    messages.filter(m => m.author.id == client.user.id).forEach(msg => clientMessages.push(msg))
                    channel.bulkDelete(clientMessages, true)
                    channel.bulkDelete(botUsages, true)
                })
            }
            if (['-r', 'regex'].includes(args[0])) {
                Math.floor(args[2])
                if (args[2] > 100) args[2] = 100
                if (args[2] < 1) args[2] = 1

                if (Number.isNaN(args[2])) return message.reply('Please provide a valid number of messages to delete')

                channel.messages.fetch({
                    limit: args[2]
                }).then((messages) => {
                    const rMessages = []

                    messages.filter(m => m.content.includes(args[1])).forEach(msg => rMessages.push(msg))
                    channel.bulkDelete(rMessages, true)
                })
            }


            if (!isNaN(args[0]) && args.length === 1) {
                args[0] = Math.floor(args[0])
                if (args[0] > 100) args[0] = 100
                if (args[0] < 1) args[0] = 1

                channel.bulkDelete(args[0])
            }
        })
    }
}
