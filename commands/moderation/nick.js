module.exports = {
    commands: ['nick'],
    permissions: ['MANAGE_NICKNAMES'],
    modOnly: true,
    callback: ({ message, args, guild }) => {
        const user = message.mentions.users.first() || args[0]
        const member = guild.member(user)
        const nick = args.slice(1).join(' ')

        if (!user) return message.reply('Please mention someone to change their nickname!')
        if (!member) return message.reply("Can't find that member in this guild!")

        if (args.length === 1) {
            member.setNickname('')
            message.reply('Resetted!')
            return
        }

        if (args.length > 1) {
            member.setNickname(nick)
            message.reply(`Changed to \`${nick}\``)
        }
    }
}