const { MessageEmbed } = require('discord.js')
const { modLog } = require('@root/config.json')

module.exports = {
    commands: 'kick',
    category: 'Moderation',
    description: 'Kicks a member form the guild',
    expectedArgs: '<user: Mention/ID> (reason)',
    permissions: ['KICK_MEMBERS'],
    guildOnly: true,
    modOnly: true,
    callback: async ({ message, args, text, client }) => {

        const timeOut = 1000 * 5

        message.delete()

        const channel = message.guild.channels.cache.find(cl => cl.id == modLog)

        const user = message.mentions.users.first() || args[0]
        const reason = args.slice(1).join(' ') || undefined

        if (user) {
            const member = await message.guild.members.fetch(user)

            try {
                if (!member) return message.channel.send(`**<:no:811286748712796201> Can't find that member!**`).then(msg => msg.delete({ timeout: timeOut }))
                if (!message.guild.me.hasPermission('Kick_MEMBERS')) return message.reply(`I don't have the \`Kick Members\` permission`).then(msg => msg.delete({ timeout: timeOut * 3 }))
                if (!member.kickable) return message.reply(`Can't kick that member, please check my role position`).then(msg => msg.delete({ timeout: timeOut * 3 }))

                member.kick(reason).then(() => {
                    message.channel.send(`Kicked ${member.user} successfully!`)

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