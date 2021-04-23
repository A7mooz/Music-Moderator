const { MessageEmbed } = require("discord.js")
const { modLog } = require('@root/config.json')

module.exports = async (message, member, reason, color, action) => {
    const channel = message.guild.channels.cache.find(c => c.id === modLog)
    const embed = new MessageEmbed()
        .setAuthor(`${message.author.tag} (ID ${message.author.id})`, message.author.avatarURL())
        .setDescription(`**${action}** ${member.user || member.user.tag || member.tag} *(ID ${member.id})* ${reason ? `\n**Reason:** ${reason}` : ''}`)
        .setThumbnail(member.user.avatarURL({ dynamic: true }) || member.avatarURL({ dynamic: true }))
        .setColor(color)
    channel.send(embed)
}