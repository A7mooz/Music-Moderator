const { MessageEmbed } = require('discord.js')
const { modLog } = require('../../config.json')

module.exports = {
    commands: 'unban',
    category: 'Moderation',
    description: 'Unbans a user form the guild',
    permissions: ['ADMINISTRATOR'],
    guidOnly: true,
    modOnly: true,
    callback: ({ message, args, text, client, timeOut }) => {

        const channel = message.guild.channels.cache.find(cl => cl.id == modLog)

        const user = args[0]
        const reason = args.slice(1).join(' ') || undefined

        if (user) {
            const member = message.guild.fetchBans(user)


            if (!member) return message.channel.send(`**<:no:811286748712796201> Can't find that member in bans list!**`).then(msg => msg.delete({ timeout: 5000 }))

            message.guild.members.unban(user, { reason: reason })
            message.reply(`Unbanned`)


        } else {
            message.channel.send("**<:no:811286748712796201> Please mention a user**").then(msg => msg.delete({ timeout: 5000 }))
        }
    }
}