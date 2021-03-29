const { MessageEmbed } = require('discord.js')
const { modLog, modRoles } = require('../../config.json')

module.exports = {
    commands: 'unban',
    category: 'Moderation',
    description: 'Unbans a user form the guild',
    // expectedArgs: '<User:Mention/ID> [Reason:Text]',
    // minArgs: 1,
    callback: ({ message, arguments, text, client }) => {

        const reqRoles = modRoles.join('&&')

        if (!message.member.hasPermission('BAN_MEMBERS') && message.member.roles.cache !== reqRoles)
            return message.channel.send(`**<:no:811286748712796201> You missing permissions!**`).then(msg => msg.delete({ timeout: 5000 }))

        const channel = message.guild.channels.cache.find(cl => cl.id == modLog)

        const user = arguments[0]
        const reason = arguments.slice(1).join(' ') || undefined

        if (user) {
            const member = message.guild.fetchBans(user)

            try {
                if (!member) return message.channel.send(`**<:no:811286748712796201> Can't find that member in bans list!**`).then(msg => msg.delete({ timeout: 5000 }))

                message.guild.members.unban(user, { reason: reason }).then(() => {
                    message.reply(`You unbanned \`${user}\`\nReason: \`${reason}\``).then(msg => msg.delete({ timeout: 5000 }))

                    const embed = new MessageEmbed()
                        .setColor('#00FF00')
                        .setAuthor(`${message.author.tag} (ID ${message.author.id})`, message.author.avatarURL())
                        .setDescription(`**Unbanned** ${member.user.tag} *(ID ${member.id})*\n**Reason:** ${reason}`)
                        .setThumbnail('https://upload.wikimedia.org/wikipedia/commons/f/f1/Heavy_red_"x".png')
                    channel.send(embed)
                })
            } catch (e) {
                message.channel.send(`⚠ An error Occurred\n\`${e}\``)
                console.log(e);
            }


        } else {
            message.channel.send("**<:no:811286748712796201> Please mention a user**").then(msg => msg.delete({ timeout: 5000 }))
        }
    }
}