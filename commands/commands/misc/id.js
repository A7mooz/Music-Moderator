const { MessageEmbed } = require("discord.js")

module.exports = {
    commands: ['id'],
    description: 'Cheks for your id',
    callback: ({ message, channel }) => {
        const embed = new MessageEmbed()
            .setTitle('🆔 Your ID')
            .setDescription(`${message.author.id}`)
            .setColor('PURPLE')
            .setFooter('If you\'re on mobile just hold on the id text to copy it')

        if (message.channel.id !== '793398275814326272') {
            message.reply(`Please use this command in <#793398275814326272>`).then(msg => msg.delete({ timeout: 5 * 1000 }))
            message.delete()
            return
        }

        channel.send(message.author, { embed: embed })

    }
}