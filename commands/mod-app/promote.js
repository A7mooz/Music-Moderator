module.exports = {
    commands: ['promote'],
    guidOnly: true,
    ownerOnly: true,
    callback: ({ message, args }) => {
        const timeOut = 1000 * 5

        if (!args.length) return message.channel.send('**<:no:811286748712796201> Please mention user to promote!**')

        const user = message.mentions.users.first() || args[0]
        const member = message.guild.member(user)

        if (!member) return message.reply("Can't find that member!").then(msg => msg.delete({ timeout: timeOut }))

        message.channel.send("***To choose a role, type a number from the list bellow:***\n > **[1] Internship moderation\n > [2] Moderator\n >[0] Cancel**").then(m => {
            message.channel.awaitMessages(msg => msg.author.id === message.author.id, {
                max: 1,
                time: 1000 * 60 * 2,
                errors: ["time"]
            }).then(async (c) => {
                var roles = null
                if (c.first().content === "1") {
                    roles = ['812934296394268692', '793393550942404619']

                    c.first().delete().catch(e => null)
                    m.delete().catch(e => null)

                    if (roles === null) return message.channel.send('**<:no:811286748712796201> Invald number**')
                    // if (roles.length == 0) return message.channel.send("**<:no:811286748712796201> Couldn't find this number**")
                    else {
                        message.channel.send(`**<a:loading:811275151811412018> Promoting member...**`).then(msg => {
                            member.roles.add(roles)
                            msg.edit(`**<:yes:811284624759586837> Member has been successfuly promoted**`)
                            msg.delete({ timeout: timeOut })
                        })

                        const embed = {
                            color: 0x3BAEE5,
                            author: {
                                name: `${message.author.tag} (ID ${message.author.id})`,
                                icon_url: message.author.avatarURL(),
                            },
                            description: `**🔺 Promoted** ${member.user} *(ID ${member.user.id})*\n **to** <@&793393550942404619>`,
                            thumbnail: {
                                url: member.user.avatarURL({ dynamic: true })
                            }
                        }

                        channel.send({ embed: embed })
                    }
                }

                if (c.first().content === "2") {
                    roles = ['812934296394268692', '793393474690482196']
                    c.first().delete().catch(e => null)
                    m.delete().catch(e => null)
                    if (roles == null) return message.channel.send('**<:no:811286748712796201> Invald number**')
                    if (roles.length == 0) return message.channel.send("**<:no:811286748712796201> Couldn't find this number**")
                    else {
                        message.channel.send(`**<a:loading:811275151811412018> Promoting member...**`).then(msg => {
                            member.roles.add(roles)
                            msg.edit(`**<:yes:811284624759586837> Member has been successfuly promoted**`)
                            msg.delete({ timeout: timeOut })
                        })

                        const embed = {
                            color: 0x3BAEE5,
                            author: {
                                name: `${message.author.tag} (ID ${message.author.id})`,
                                icon_url: message.author.avatarURL(),
                            },
                            description: `**🔺 Promoted** ${member.user} *(ID ${member.user.id})*\n **to** <@&793393474690482196>`,
                            thumbnail: {
                                url: member.user.avatarURL({ dynamic: true })
                            }
                        }

                        channel.send({ embed: embed })
                    }

                }

                if (c.first().content === "0") {
                    c.first().delete().catch(e => null)
                    m.delete().catch(e => null)
                    message.channel.send(`**Operation has been canceled successfully**`).then(msg => msg.delete({ timeout: timeOut }))
                }
            })
            message.delete()
        })
    }
}