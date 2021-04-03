module.exports = {
    commands: ['slowmode', 'sm', 'slow'],
    category: 'Moderation',
    description: 'Sets a slowmode for the channel',
    permissions: ['ADMINISTRATOR'],
    guidOnly: true,
    modOnly: true,
    callback: ({ message, args, channel, client }) => {
        const timeOut = 5 * 1000

        if (!args.length) return channel.send(`Current slowmode is ${channel.rateLimitPerUser} seconds!`)

        if (isNaN(args[0])) return message.reply('Slowmode have to be a number').then(msg => msg.delete({ timeout: timeOut }))
        if (Number(args[0]) > 21600) return message.reply("Slowmode can't be more than 21600").then(msg => msg.delete({ timeout: timeOut }))


        if (args[0].includes('+')) {
            channel.setRateLimitPerUser(Number(channel.rateLimitPerUser) + Number(args[0])).then(() => {
                channel.send(`Slowmode set to ${channel.rateLimitPerUser} in this channel!`)
            })
        } else if (args[0].includes('-')) {
            if (channel.rateLimitPerUser + Number(args[0]) < 0) return message.reply('Can\'t make the slowmode in negative')

            channel.setRateLimitPerUser(channel.rateLimitPerUser + Number(args[0])).then(() => {
                channel.send(`Slowmode set to ${channel.rateLimitPerUser} in this channel!`)
            })
        } else {
            channel.setRateLimitPerUser(Math.round(args[0])).then(() => {
                channel.send(`Slowmode set to ${channel.rateLimitPerUser} in this channel!`)
            })
        }
    }
}