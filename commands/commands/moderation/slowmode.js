module.exports = {
    commands: ['slowmode', 'sm', 'slow'],
    category: 'Moderation',
    expectedArgs: '(+/-){Number} (channel: mention)',
    description: 'Sets a slowmode for a channel',
    permissions: ['ADMINISTRATOR'],
    guildOnly: true,
    modOnly: true,
    callback: ({ message, args, client, timeOut }) => {
        message.delete()



        var channel = message.mentions.channels.first() || message.guild.channels.cache.find(cl => cl.id === args[1]) || message.channel

        if (!args.length) {
            if (channel.rateLimitPerUser === 0) {
                message.channel.send(`Slowmode is currently disabled in this channel!`)
                return
            }
            message.channel.send(`Current slowmode is \`${channel.rateLimitPerUser}\` seconds!`)
            return
        }

        if (isNaN(Number(args[0]))) return message.reply('Slowmode have to be a number').then(msg => msg.delete({ timeout: timeOut }))
        if (Number(args[0]) > 21600) return message.reply("Slowmode can't be more than 21600 seconds").then(msg => msg.delete({ timeout: timeOut }))

        function send(cl) {
            if (args.length > 1) {
                message.channel.send(`Slowmode set to \`${cl.rateLimitPerUser}\` seconds in ${channel}!`).then(msg => msg.delete({ timeout: timeOut }))
                channel.send(`Slowmode set to \`${cl.rateLimitPerUser}\` seconds!`)
            } else if (args.length <= 1) {
                message.channel.send(`Slowmode set to \`${cl.rateLimitPerUser}\` seconds!`)
            }
        }

        if (args[0].includes('+')) {
            channel.setRateLimitPerUser(Number(channel.rateLimitPerUser) + Number(args[0])).then(cl => {
                send(cl)
            })
        } else if (args[0].includes('-')) {
            if (channel.rateLimitPerUser + Number(args[0]) < 0) return message.reply('Can\'t make the slowmode in negative')

            channel.setRateLimitPerUser(channel.rateLimitPerUser + Number(args[0])).then(cl => {
                send(cl)
            })
        } else {
            channel.setRateLimitPerUser(Math.round(args[0])).then(cl => {
                send(cl)
            })
        }
    }
}