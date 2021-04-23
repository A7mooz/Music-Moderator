var crypto = require("crypto")
module.exports = {
    commands: ['moderate', 'mod'],
    permissions: ['MANAGE_NICKNAMES'],
    expectedArgs: '<user: Mention/ID>',
    description: 'Moderates a user\'s nickname to be mentionable',
    guildOnly: true,
    modOnly: true,
    callback: ({ message, args, guild }) => {
        message.delete()

        const user = message.mentions.users.first() || args[0]
        const member = guild.member(user)

        if (!user) return message.reply('Please mention a user to moderate their nickname')
        if (!member) return message.reply("Can't find that member in this guild!")

        const moderate = (length) => {
            var result = []
            var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
            for (var i = 0; i <= length; i++) {
                result.push(characters.charAt(Math.floor(Math.random() * characters.length)))
            }
            return result.join('')
        }

        member.setNickname(`Moderated Nickname ${moderate(6)}`).then(nick => {
            message.reply(`Changed to \`${nick.displayName}\``)
        })

    }
}
