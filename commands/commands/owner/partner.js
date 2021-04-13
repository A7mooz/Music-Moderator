module.exports = {
    commands: ['partner', 'p'],
    description: 'Partner someone',
    expectedArgs: '<user: mention/ID/name>',
    ownerOnly: true,
    guildOnly: true,
    callback: ({ message, args, timeOut }) => {
        message.delete()

        let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === args.slice(0).join(" ") || x.user.username === args[0]);

        if (!user) return message.channel.send("<:no:811286748712796201> Can't find that member!").then(msg => msg.delete({ timeout: timeOut }))

        const role = '795951143016071198'

        if (user.roles.cache.find(r => r.id === role)) {
            user.roles.remove(role).then(() => {
                message.channel.send('<:yes:811284624759586837> Removed the partner role').then(msg => msg.delete({ timeout: timeOut }))
            })
            return
        }
        user.roles.add(role).then(() => {
            message.channel.send('<:yes:811284624759586837> Added the partner role').then(msg => msg.delete({ timeout: timeOut }))
        })
    }
}