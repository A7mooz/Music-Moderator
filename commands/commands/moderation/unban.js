const { MessageEmbed } = require('discord.js')
const { modLog } = require('@root/config.json')
const log = require('../../../util/log')

module.exports = {
    commands: 'unban',
    category: 'Moderation',
    expectedArgs: '<user: ID> (reason: String)',
    description: 'Unbans a user form the guild',
    permissions: ['ADMINISTRATOR'],
    guidOnly: true,
    modOnly: true,
    callback: ({ message, args, text, client, timeOut }) => {
        message.delete()

        const channel = message.guild.channels.cache.find(cl => cl.id == modLog)

        const user = args[0]
        const reason = args.slice(1).join(' ') || undefined

        if (user) {
            let member = message.guild.fetchBans(user)


            if (!member) return message.channel.send(`**<:no:811286748712796201> Can't find that member in bans list!**`).then(msg => msg.delete({ timeout: 5000 }))

            message.guild.members.unban(user, { reason: reason }).then(member => {
                log(message, member, reason, 'GREEN', 'Unbanned')
            })


        } else {
            message.channel.send("**<:no:811286748712796201> Please mention a user**").then(msg => msg.delete({ timeout: 5000 }))
        }
    }
}