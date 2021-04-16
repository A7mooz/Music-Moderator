const { MessageEmbed } = require('discord.js')
const { modLog } = require('@root/config.json')

module.exports = {
    commands: 'ban',
    description: 'Bans a user form the guild',
    category: 'Moderation',
    permissions: ['BAN_MEMBERS'],
    expectedArgs: '<user: Mention/Name/ID> (reason: string)',
    guildOnly: true,
    modOnly: true,
    callback: async ({ message, args, text, client, timeOut }) => {
        message.delete()

        const channel = message.guild.channels.cache.find(cl => cl.id == modLog)

        let toBan = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === args.slice(0).join(" ") || x.user.username === args[0]);

        if (!toBan) return message.reply("Can't find that user")

        const reason = args.slice(1).join(' ') || "There was no reason!";

        toBan.ban({
            reason: reason
        })
        message.channel.send(`${toBan} has been banned from the server!`)
        const embed = new MessageEmbed()
            .setColor('#ff1000')
            .setAuthor(`${message.author.tag} (ID ${message.author.id})`, message.author.avatarURL())
            .setDescription(`**Banned** ${toBan.user.tag} *(ID ${toBan.user.id})*\n**Reason:** ${reason}`)
            .setThumbnail(toBan.user.avatarURL())
        channel.send(embed)
    }
}
