module.exports = {
    commands: ['demote'],
    guidOnly: true,
    ownerOnly: true,
    discription: 'demote a member',
    expectedArgs: '<user: Mention/ID> (reason: string)',
    callback: ({ message, args }) => {
        const timeOut = 1000 * 5

        if (!args[0]) return message.channel.send('**<:no:811286748712796201> Please mention user to demote!**')

        const channel = message.guild.channels.cache.find(cl => cl.id == '793417550993031198')

        const user = message.mentions.users.first() || args[0]
        const member = message.guild.member(user)
        const reason = args.slice(1).join(' ') || undefined

        const roles = ['812934296394268692', '793393550942404619', '793393474690482196',]

        const trial_mod = message.guild.roles.cache.find(r => r.id === '793393550942404619')
        const mod = message.guild.roles.cache.find(r => r.id === '793393474690482196')
        const staff = message.guild.roles.cache.find(r => r.id === '812934296394268692')

        if (!member) return message.reply("Can't find that member!").then(msg => msg.delete({ timeout: timeOut }))

        if (!member.roles.cache.find(r => r.id == trial_mod && r.id == mod || r.id == staff)) return message.channel.send(`**<:no:811286748712796201> This member doen't have any moderational roles**`)
            .then(msg => msg.delete({ timeout: timeOut }))

        message.channel.send(`**<a:loading:811275151811412018> Demoting member...**`).then(msg => {

            member.roles.remove(roles, reason)
            const embed = {
                color: 'RED',
                author: {
                    name: `${message.author.tag} (ID ${message.author.id})`,
                    icon_url: message.author.avatarURL(),
                },
                description: `**🔻 Demoted** ${member.user} *(ID ${member.user.id})*\n **Reason:** ${reason}`,
                thumbnail: {
                    url: member.user.avatarURL({ dynamic: true })
                }
            }
            // .setColor('RED')
            // .setAuthor(`${message.author.tag} (ID ${message.author.id})`, message.author.avatarURL())
            // .setDescription(`**🔻 Demoted** ${member.user} *(ID ${member.user.id})*\n **Reason:** ${reason}`)
            // .setThumbnail(member.user.avatarURL())
            channel.send({ embed: embed })

            msg.edit(`**<:yes:811284624759586837> Member has been demoted**`)
            msg.delete({ timeout: timeOut })
        })
    }
}