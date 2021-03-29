const { MessageEmbed } = require('discord.js')
const modLog = process.env.modLog

module.exports = {
    commands: 'kick',
    category: 'Moderation',
    description: 'Kicks a member form the guild',
    // expectedArgs: '<User:Mention/ID> [Reason:Text]',
    // minArgs: 1,
    permissions: ['KICK_MEMBERS'],
    modOnly: true,
    callback: async ({ message, arguments, text, client }) => {

        const timeOut = 1000 * 5

        const channel = message.guild.channels.cache.find(cl => cl.id == modLog)

        const user = message.mentions.users.first() || arguments[0]
        const reason = arguments.slice(1).join(' ') || undefined

        if (user) {
            const member = await message.guild.members.fetch(user)

            try {
                if (!member) return message.channel.send(`**<:no:811286748712796201> Can't find that member!**`).then(msg => msg.delete({ timeout: timeOut }))
                if (!message.guild.me.hasPermission('Kick_MEMBERS')) return message.reply(`I don't have the \`Kick Members\` permission`).then(msg => msg.delete({ timeout: timeOut * 3 }))
                if (!member.kickable) return message.reply(`Can't kick that member, please check my role position`).then(msg => msg.delete({ timeout: timeOut * 3 }))

                member.kick(reason).then(() => {
                    message.reply(`You kicked \`${member.id}\`\nReason: \`${reason}\``).then(msg => msg.delete({ timeout: timeOut }))

                    const embed = new MessageEmbed()
                        .setColor('#FF5733')
                        .setAuthor(`${message.author.tag} (ID ${message.author.id})`, message.author.avatarURL())
                        .setDescription(`**Kicked** ${member.user.tag} *(ID ${member.id})*\n**Reason:** ${reason}`)
                        .setThumbnail(member.user.avatarURL())
                    channel.send(embed)
                })
            } catch (e) {
                message.channel.send(`⚠ An error Occurred\n\`${e}\``)
                console.log(e);
            }


        } else {
            message.channel.send("**<:no:811286748712796201> Please mention a user**").then(msg => msg.delete({ timeout: timeOut }))
        }
    }
}