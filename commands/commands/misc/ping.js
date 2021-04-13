const { MessageEmbed } = require("discord.js")

module.exports = {
    commands: 'ping',
    description: 'Shows bot\'s latency',
    category: 'Misc',
    callback: ({ message, args, text, client }) => {
        message.channel.send(`**<a:pinging:811279125116485692> Calculating ping...**`).then(msg => {
            const ping = msg.createdTimestamp - message.createdTimestamp
            const embed = new MessageEmbed()
                .setTitle('🏓 Pong!')
                .setColor('PURPLE')
                .addFields(
                    {
                        name: 'Bot latency:',
                        value: ping + 'ms',
                    },
                    {
                        name: 'API Latency:',
                        value: client.ws.ping + 'ms'
                    }
                )
            msg.edit('', embed)
        })
    }
}