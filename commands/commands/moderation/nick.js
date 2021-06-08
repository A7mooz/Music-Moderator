module.exports = {
    commands: ['nick'],
    permissions: ['MANAGE_NICKNAMES'],
    expectedArgs: '<user: Mention/ID> (nickname: string)',
    description: 'Resets or change someone\'s nickname',
    guildOnly: true,
    modOnly: true,
    callback: ({ message, args, guild, timeOut }) => {
        const user = message.mentions.users.first() || args[0]
        const member = guild.member(user)
        const nick = args.slice(1).join(' ')

        if (!user) return message.reply('Please mention someone to change their nickname!').then(msg => {
            msg.delete({ timeout: timeOut })
            message.delete()
        })

        if (!member) return message.reply("Can't find that member in this guild!").then(msg => {
            msg.delete({ timeout: timeOut })
            message.delete()
        })

        if (args.length === 1) {
            member.setNickname('').then(toUser => {
                message.reply(`Reset to \`${toUser.displayName}\`!`)
            })
            return
        }

        if (args.length > 1) {
            member.setNickname(nick).then(toUser => message.reply(`Changed to \`${toUser.displayName}\``))
        }
    }
}