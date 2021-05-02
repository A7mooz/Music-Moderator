module.exports = {
    commands: ['clear', 'cl', 'purge'],
    category: 'Moderation',
    minArgs: 1,
    expectedArgs: '<subcommand/user/amount> [amount]',
    subcommands: ['`bot`: deletes client bot\'s message and the messages that starts with the prefix', '`bots`: deletes messages that are written by a bot', '`-r/regex`: deletes a message that includes some string', '`-s/start`: deletes a message that starts with the specified string'],
    examples: ['bot', '@someone 50', '479269670998900736 100', 'bots', '-r hi 100', 'start hello 15', '10'],
    description: 'Clears amount of messages form a channel',
    permissions: ['MANAGE_MESSAGES'],
    guidOnly: true,
    modOnly: true,
    callback: ({ args, channel, message, prefix, client }) => {

        const timeOut = 1000 * 5

        message.delete().then(() => {
            const user = message.mentions.users.first() || message.guild.member(args[0])
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
            if (args[0].toLowerCase() === 'bots') {
                channel.messages.fetch({
                    limit: 100
                }).then((messages) => {
                    const botsMessages = []
                    messages.filter(m => m.author.bot).forEach(msg => botsMessages.push(msg))
                    channel.bulkDelete(botsMessages, true)
                })
            }
            if (args[0].toLowerCase() === 'bot') {
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
            if (['-r', 'regex'].includes(args[0].toLowerCase())) {
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

            if (['dup', 'duplicates'].includes(args[0].toLowerCase())) {
                channel.messages.fetch({
                    limit: 100
                }).then((messages) => {
                    let result = []

                    var valueArr = messages.map(function (item) { return item.content })

                    var duplicates = []
                    valueArr.filter((item, idx) => valueArr.indexOf(item) != idx).forEach(v => duplicates.push(v))

                    messages.filter(m => duplicates.includes(m.content)).forEach(msg => result.push(msg))

                    channel.bulkDelete(result, true)
                })
            }

            if (['-s', 'start'].includes(args[0].toLowerCase())) {
                Math.floor(args[2])
                if (args[2] > 100) args[2] = 100
                if (args[2] < 1) args[2] = 1

                if (Number.isNaN(args[2])) return message.reply('Please provide a valid number of messages to delete')

                channel.messages.fetch({
                    limit: args[2]
                }).then((messages) => {
                    const result = []

                    messages.filter(m => m.content.startsWith(args[1])).forEach(msg => result.push(msg))
                    channel.bulkDelete(result, true)
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
