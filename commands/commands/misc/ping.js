module.exports = {
    commands: 'ping',
    description: 'Shows bot\'s latency',
    category: 'Misc',
    callback: ({ message, args, text, client }) => {
        message.channel.send(`**<a:pinging:811279125116485692> Calculating ping...**`).then(msg => {
            const ping = msg.createdTimestamp - message.createdTimestamp

            msg.edit(`Bot latency: \`${ping}ms\`, API Latency: \`${client.ws.ping}ms\``)
        })
    }
}