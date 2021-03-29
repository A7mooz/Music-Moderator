const { MessageEmbed } = require('discord.js')
const modLog = process.env.modLog

module.exports = {
    commands: 'ban',
    // expectedArgs: '<User:Mention/ID> [Reason:Text]',
    // minArgs: 1,
    description: 'Bans a user form the guild',
    category: 'Moderation',
    permissions: ['BAN_MEMBERS'],
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
                if (!member.bannable) return message.reply(`Can't ban that member, please check my role position and permissions`).then(msg => msg.delete({ timeout: timeOut * 3 }))

                message.guild.members.ban(user, { reason: reason }).then(() => {
                    message.reply(`You banned \`${member.id}\`\nReason: \`${reason}\``).then(msg => msg.delete({ timeout: timeOut }))

                    const embed = new MessageEmbed()
                        .setColor('#ff1000')
                        .setAuthor(`${message.author.tag} (ID ${message.author.id})`, message.author.avatarURL())
                        .setDescription(`**Banned** ${member.user.tag} *(ID ${member.id})*\n**Reason:** ${reason}`)
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