module.exports = {
    commands: 'ping',
    callback: (message, arguments, text, client) => {
        message.reply(`Calculating ping...`).then(msg => {
            const ping = msg.createdTimestamp - message.createdTimestamp

            msg.edit(`Bot latency: \`${ping}ms\`, API Latency: \`${client.ws.ping}ms\``)
        })
    }
}