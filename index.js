//Main Packages
const Commando = require('discord.js-commando')
const client = new Commando.Client()

//Command handle
const path = require('path')
const fs = require('fs')
const WOKcommands = require('wokcommands')

//Custom constants
const { prefix } = require('./config.json')
const { getHeapSpaceStatistics } = require('v8')

// ! Ready Event
client.on('ready', async () => {
    console.log(`${client.user.tag} client is ready!`)

    const baseFile = 'command-base.js'
    const commandBase = require(`./commands/${baseFile}`)

    const readCommands = (dir) => {
        const files = fs.readdirSync(path.join(__dirname, dir))
        for (const file of files) {
            const stat = fs.lstatSync(path.join(__dirname, dir, file))
            if (stat.isDirectory()) {
                readCommands(path.join(dir, file))
            } else if (file !== baseFile) {
                const option = require(path.join(__dirname, dir, file))
                commandBase(client, option)
            }
        }
    }

    readCommands('commands')

    const disabledDefaultCommands = [
        'help',
        'command',
        'language',
        'prefix',
        'requiredrole'
    ]

    new WOKcommands(client, {
        commandsDir: 'wok-commands',
        featureDir: 'features',
        del: 5,
        showWarns: false,
        disabledDefaultCommands,
        testServers: ['793390167720329216'],
        botOwner: ['479269670998900736']
    })
        .setDefaultPrefix('$')
        .setMongoPath(process.env.MONGO_URI)
})

// ! Custom commmands
client.on("message", async message => {
    if (message.author.bot || !message.content.startsWith(prefix) || !message.guild) return

    const args = message.content.slice(prefix.length).split(/ +/)
    const command = args.shift().toLowerCase()
    const channel = message.guild.channels.cache.find(cl => cl.id === '793417550993031198')

    const timeOut = 1000 * 5

    if (command == 'promote') {
        if (message.author.id !== message.member.guild.ownerID) return message.delete();
        if (!args[0]) return message.channel.send('**<:no:811286748712796201> Please mention user to promote!**')

        const user = message.mentions.users.first() || args[0]
        const member = message.guild.member(user)

        if (!member) return message.reply("Can't find that member!").then(msg => msg.delete({ timeout: timeOut }))

        // if (!member) return message.reply("Can't find that member").then(msg => msg.delete({ timeout: timeOut }))

        message.channel.send("***To choose a role, type a number from the list bellow:***\n >>> **[1] Internship moderation\n[2] Moderator\n[0] Cancel**").then(m => {
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
                        // .setColor(0x3BAEE5)
                        // .setAuthor(`${message.author.tag} (ID ${message.author.id})`, message.author.avatarURL())
                        // .setDescription(`**🔺 Promoted** ${member.user} *(ID ${member.user.id})*\n **to** <@&793393550942404619>`)
                        // .setThumbnail(member.user.avatarURL())
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
                        // .setColor(0x3BAEE5)
                        // .setAuthor(`${message.author.tag} (ID ${message.author.id})`, message.author.avatarURL())
                        // .setDescription(`**🔺 Promoted** ${member.user} *(ID ${member.user.id})*\n **to** <@&793393474690482196>`)
                        // .setThumbnail(member.user.avatarURL())
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

    if (command == 'demote') {
        if (message.author.id !== message.member.guild.ownerID) return message.delete();
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
        // message.content.toLowerCase().includes()
        message.delete()
    }
})

// ! Bot token :)
require('dotenv').config()

client.login(process.env.token)