const { modLog } = require('@root/config.json')
const log = require('../../../util/log')

module.exports = {
    commands: ['demote'],
    guidOnly: true,
    ownerOnly: true,
    description: 'Demote a member',
    expectedArgs: '<user: Mention/ID> (reason: string)',
    callback: ({ message, args }) => {
        const timeOut = 1000 * 5
        message.delete()

        if (!args[0]) return message.channel.send('**<:no:811286748712796201> Please mention user to demote!**')

        const channel = message.guild.channels.cache.find(cl => cl.id == modLog)

        const user = message.mentions.users.first() || args[0]
        let member = message.guild.member(user)
        const reason = args.slice(1).join(' ') || undefined

        const roles = ['812934296394268692', '793393550942404619', '793393474690482196',]

        const intern_mod = message.guild.roles.cache.find(r => r.id === '793393550942404619')
        const mod = message.guild.roles.cache.find(r => r.id === '793393474690482196')
        const staff = message.guild.roles.cache.find(r => r.id === '812934296394268692')

        if (!member) return message.reply("Can't find that member!").then(msg => msg.delete({ timeout: timeOut }))

        if (!member.roles.cache.find(r => intern_mod == r.id || mod == r.id || staff == r.id)) return message.channel.send(`**<:no:811286748712796201> This member doesn't have any moderational roles**`)
            .then(msg => msg.delete({ timeout: timeOut }))

        message.channel.send(`**<a:loading:811275151811412018> Demoting member...**`).then(msg => {

            member.roles.remove(roles, `${reason}\nDemotion requested by ${message.author.tag}`).then(member => {
                log(message, member, reason, 'RED', 'Demoted')
            })

            msg.edit(`**<:yes:811284624759586837> Member has been demoted**`)
            msg.delete({ timeout: timeOut })
        })
    }
}