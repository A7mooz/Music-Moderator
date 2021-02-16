module.exports = {
    commands: 'ping',
    callback: (message, arguments, text, client) => {
        const pinging = message.guild.emojis.cache.find(e => e.id == '811279125116485692')

        message.channel.send(`**${pinging} Calculating ping...**`).then(msg => {
            const ping = msg.createdTimestamp - message.createdTimestamp

            msg.edit(`Bot latency: \`${ping}ms\`, API Latency: \`${client.ws.ping}ms\``)
        })
    }
}