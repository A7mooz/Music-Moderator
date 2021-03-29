const { MessageEmbed } = require("discord.js")

module.exports = {
    slash: true,
    testOnly: true,
    description: 'Cheks for your id',
    category: 'Info',
    run: ({ interaction, args }) => {
        const embed = new MessageEmbed()
            .setTitle('🆔 Your ID')
            .setColor('PURPLE')
            .setDescription(`${interaction.member.user.id}`)
            .setFooter('If you on mobile hold on the id text to copy it')

        return embed
    }
}