const { MessageEmbed } = require("discord.js")

module.exports = {
    slash: 'both',
    testOnly: true,
    description: 'Cheks for your id',
    category: 'Info',
    run: ({ message, interaction, args }) => {
        const embed = new MessageEmbed()
            .setTitle('🆔 Your ID')
            .setColor('PURPLE')
            .setFooter('If you\'re on mobile just hold on the id text to copy it')
        if (message) {
            if (message.channel.id !== '793398275814326272') {
                message.delete()
                message.reply(`Please use this command in <#793398275814326272>`).then(msg => msg.delete({ timeout: 5 * 1000 }))
                return
            }

            return message.reply(embed.setDescription(`${message.author.id}`))
        }

        return embed.setDescription(`${interaction.member.user.id}`)
    }
}