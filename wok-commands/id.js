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
            return message.reply(embed.setDescription(`${message.author.id}`))
        }

        return embed.setDescription(`${interaction.member.user.id}`)
    }
}