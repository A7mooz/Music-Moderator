module.exports = {
    commands: ['slowmode', 'sm', 'slow'],
    category: 'Moderation',
    description: 'Sets a slowmode for the channel',
    permissions: ['ADMINISTRATOR'],
    modOnly: true,
    callback: ({ message, arguments, channel, client }) => {
        const timeOut = 5 * 1000

        if (!arguments.length) return channel.send(`Current slowmode is ${channel.rateLimitPerUser} seconds!`)

        if (isNaN(arguments[0])) return message.reply('Slowmode have to be a number').then(msg => msg.delete({ timeout: timeOut }))
        if (Number(arguments[0]) > 21600) return message.reply("Slowmode can't be more than 21600").then(msg => msg.delete({ timeout: timeOut }))


        if (arguments[0].includes('+')) {
            channel.setRateLimitPerUser(Number(channel.rateLimitPerUser) + Number(arguments[0])).then(() => {
                channel.send(`Slowmode set to ${channel.rateLimitPerUser} in this channel!`)
            })
        } else if (arguments[0].includes('-')) {
            if (channel.rateLimitPerUser + Number(arguments[0]) < 0) return message.reply('Can\'t make the slowmode in negative')

            channel.setRateLimitPerUser(channel.rateLimitPerUser + Number(arguments[0])).then(() => {
                channel.send(`Slowmode set to ${channel.rateLimitPerUser} in this channel!`)
            })
        } else {
            channel.setRateLimitPerUser(Math.round(arguments[0])).then(() => {
                channel.send(`Slowmode set to ${channel.rateLimitPerUser} in this channel!`)
            })
        }
    }
}