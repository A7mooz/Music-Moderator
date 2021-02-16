const path = require('path')
const fs = require('fs')
const Discord = require('discord.js')
const DisTube = require('distube')
const { prefix } = require('./config.json')
const client = new Discord.Client()

const distube = new DisTube(client, { searchSongs: true, leaveOnStop: false, leaveOnEmpty: false });

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
})

// ! Anti-Advert
const isInvite = async (guild, code) => {

    return await new Promise((resolve) => {
        guild.fetchInvites().then((invites) => {
            for (const invite of invites) {
                if (code === invite[0]) {
                    resolve(true)
                    return
                }
            }
            resolve(false)
        })
    })
}
// client.on('message', async (message) => {
//     const { guild, member, content } = message

//     const code = content.split('discord.gg/')[1]

//     if (content.includes('discord.gg/')) {

//         if (message.channel.id === '796424380849717299' || message.channel.id === '795950229786198016') return;

//         const isOurInvite = await isInvite(guild, code)

//         if (!isOurInvite) {
//             message.delete()
//         }
//     }
// })

// ! Custom commmands
client.on("message", async message => {
    if (message.author.bot || !message.content.startsWith(prefix) || !message.guild) return

    const args = message.content.slice(prefix.length).split(/ +/)
    const command = args.shift().toLowerCase()
    const channel = message.guild.channels.cache.find(cl => cl.id === '793417550993031198')

    const loading = message.guild.emojis.cache.find(e => e.id == '811275151811412018')

    if (command == 'promote') {
        if (message.author.id !== message.member.guild.ownerID) return message.delete();
        if (!args[0]) return message.reply('**<:no:811286748712796201> Please mention user to promote!**')

        const member = message.guild.member(message.mentions.users.first())

        message.channel.send("***To choose a role, type a number from the list bellow:***\n >>> **[1] Internship moderation\n[2] Moderator\n[0] Cancel**").then(m => {
            message.channel.awaitMessages(msg => msg.author.id === message.author.id, {
                max: 1,
                time: 1000 * 60 * 2,
                errors: ["time"]
            }).then(async (c) => {
                var roles = null
                if (c.first().content === "1") {
                    roles = ['793825819427471361', '793393550942404619']
                    c.first().delete().catch(e => null)
                    m.delete().catch(e => null)

                    if (roles == null) return message.channel.send('**<:no:811286748712796201> Invald number**')
                    if (roles.length == 0) return message.channel.send("**<:no:811286748712796201> Couldn't find this number**")
                    else {
                        message.channel.send(`**${loading} Promoting member...**`).then(msg => {
                            member.roles.add(roles)
                            msg.edit(`**<:yes:811284624759586837> Member has been successfuly promoted**`)
                            msg.delete({ timeout: 13000 })
                        })

                        const embed = new Discord.MessageEmbed()
                            .setColor(0x3BAEE5)
                            .setAuthor(`${message.author.tag} (ID ${message.author.id})`, message.author.avatarURL())
                            .setDescription(`**🔺 Promoted** ${member.user} *(ID ${member.user.id})*\n **to** <@&793393550942404619>`)
                            .setThumbnail(member.user.avatarURL())
                        channel.send(embed)
                    }
                }

                if (c.first().content === "2") {
                    roles = ['793825819427471361', '793393474690482196']
                    c.first().delete().catch(e => null)
                    m.delete().catch(e => null)
                    if (roles == null) return message.channel.send('**<:no:811286748712796201> Invald number**')
                    if (roles.length == 0) return message.channel.send("**<:no:811286748712796201> Couldn't find this number**")
                    else {
                        message.channel.send(`**${loading} Promoting member...**`).then(msg => {
                            member.roles.add(roles)
                            msg.edit(`**<:yes:811284624759586837> Member has been successfuly promoted**`)
                            msg.delete({ timeout: 13000 })
                        })

                        const embed = new Discord.MessageEmbed()
                            .setColor(0x3BAEE5)
                            .setAuthor(`${message.author.tag} (ID ${message.author.id})`, message.author.avatarURL())
                            .setDescription(`**🔺 Promoted** ${member.user} *(ID ${member.user.id})*\n **to** <@&793393474690482196>`)
                            .setThumbnail(member.user.avatarURL())
                        channel.send(embed)
                    }

                }

                if (c.first().content === "0") {
                    c.first().delete().catch(e => null)
                    m.delete().catch(e => null)
                    message.channel.send(`**Operation has been canceled successfully**`).then(msg => msg.delete({ timeout: 13000 }))
                }
            })
            message.delete()
        })

    }

    if (command == 'demote') {
        if (message.author.id !== message.member.guild.ownerID) return message.delete();
        if (!args[0]) return message.channel.send('**<:no:811286748712796201> Please mention user to demote**')

        const channel = message.guild.channels.cache.find(cl => cl.id == '793417550993031198')

        const member = message.guild.member(message.mentions.users.first())
        const reason = args.slice(1).join(' ') || undefined

        const roles = [
            '793825819427471361',
            '793393550942404619',
            '793393474690482196'
        ]

        const trial_mod = message.guild.roles.cache.find(r => r.id === '793393550942404619')
        const mod = message.guild.roles.cache.find(r => r.id === '793393474690482196')
        const staff = message.guild.roles.cache.find(r => r.id === '793825819427471361')

        if (!member.roles.cache.find(r => r.id == trial_mod.id || r.id == mod.id)) return message.channel.send(`**<:no:811286748712796201> This member doen't have any moderational roles**`)

        message.channel.send(`**${loading} Demoting member...**`).then(msg => {

            member.roles.remove(roles, reason)
            const embed = new Discord.MessageEmbed()
                .setColor(0xFF8433)
                .setAuthor(`${message.author.tag} (ID ${message.author.id})`, message.author.avatarURL())
                .setDescription(`**🔻 Demoted** ${member.user} *(ID ${member.user.id})*\n **Reason:** ${reason}`)
                .setThumbnail(member.user.avatarURL())
            channel.send(embed)

            msg.edit(`**<:yes:811284624759586837> Member has been demoted**`)
            msg.delete({ timeout: 13000 })
        })


        message.delete()
    }
})

// ! Music
client.on("message", async (message) => {
    if (!message.guild) return;
    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    const voiceChannel = message.member.voice.channel

    const no = message.guild.emojis.cache.find(e => e.name == 'no')

    const status = (queue) => `Volume: \`${queue.volume}%\` | Filter: \`${queue.filter || "Off"}\` | Loop: \`${queue.repeatMode ? queue.repeatMode == 2 ? "All Queue" : "This Song" : "Off"}\` | Autoplay: \`${queue.autoplay ? "On" : "Off"}\``;

    if (command == "play") {
        if (!voiceChannel) return message.channel.send(`**${no} You must be in a voice channel to use this**`)
        distube.play(message, args.join(" "));
    }

    if (distube.isPlaying(message.guild.id)) {
        if (["repeat", "loop"].includes(command)) {
            if (!voiceChannel) return message.channel.send(`**${no} You must be in a voice channel to use this**`)
            let queue = distube.getQueue(message);
            distube.setRepeatMode(message, parseInt(args[0]));
            message.channel.send(`Loop mode set to \`${queue.repeatMode ? queue.repeatMode == 2 ? "All Queue" : "This Song" : "Off"}\``)
        }

        if (command == "stop") {
            if (!voiceChannel) return message.channel.send(`**${no} You must be in a voice channel to use this**`)
            distube.stop(message);
            message.channel.send("**⏹ Stopped the music!**");
        }

        if (command == "skip") {
            if (!voiceChannel) return message.channel.send(`**${no} You must be in a voice channel to use this**`)
            distube.skip(message);
        }

        if (command == "queue") {
            if (!voiceChannel) return message.channel.send(`**${no} You must be in a voice channel to use this**`)

            let queue = distube.getQueue(message);
            const embed = new Discord.MessageEmbed()
                .setTitle('🔁 Current queue:')
                .setDescription(queue.songs.map((song, id) =>
                    `**${id + 1}**. ${song.name} - \`${song.formattedDuration}\``
                ).slice(0, 10).join("\n"))
                .setColor('PURPLE')
            message.channel.send(embed)
        }

        if (command == "settings") {
            if (!voiceChannel) return message.channel.send(`**${no} You must be in a voice channel to use this**`)
            let queue = distube.getQueue(message);
            const embed = new Discord.MessageEmbed()
                .setTitle("⚙ Current music settings")
                .setColor('PURPLE')
                .setDescription(`${status(queue)}`)
            message.channel.send(embed)
        }

        if ([`3d`, `bassboost`, `echo`, `karaoke`, `nightcore`, `vaporwave`].includes(command)) {
            if (!voiceChannel) return message.channel.send(`**${no} You must be in a voice channel to use this**`)
            let filter = distube.setFilter(message, command);
            message.channel.send("Current queue filter: " + (filter || "Off"));
        }
    }
});

// Queue status template
const status = (queue) => `Volume: ${queue.volume}% | Filter: ${queue.filter || "Off"} | Loop: ${queue.repeatMode ? queue.repeatMode == 2 ? "All Queue" : "This Song" : "Off"} | Autoplay: ${queue.autoplay ? "On" : "Off"}`;

// DisTube event listeners, more in the documentation page
distube
    .on("playSong", (message, queue, song) => {
        const embed = new Discord.MessageEmbed()
            .setColor('PURPLE')
            .setDescription(`🎵 Playing \`${song.name}\` - \`${song.formattedDuration}\`\nRequested by: ${song.user}\n`)
            .setFooter(`${status(queue)}`)
        message.channel.send(embed)
    })
    .on("addSong", (message, queue, song) => {
        const embed = new Discord.MessageEmbed()
            .setColor('PURPLE')
            .setDescription(`<:plus:811287970061484062> Added ${song.name} - \`${song.formattedDuration}\` to the queue by ${song.user}`)
        message.channel.send(embed)
    })
    .on("playList", (message, queue, playlist, song) => {
        const embed = new Discord.MessageEmbed()
            .setColor('PURPLE')
            .setDescription(`🎵 Play \`${playlist.name}\` playlist (${playlist.songs.length} songs).\nRequested by: ${song.user}\nNow playing \`${song.name}\` - \`${song.formattedDuration}\`\n`)
            .setFooter(`${status(queue)}`)
        message.channel.send(embed)
    })
    .on("addList", (message, queue, playlist) => {
        const embed = new Discord.MessageEmbed()
            .setColor('PURPLE')
            .setDescription(`<:plus:811287970061484062> Added \`${playlist.name}\` playlist (${playlist.songs.length} songs) to queue\n`)
            .setFooter(`${status(queue)}`)
        message.channel.send(embed)
    })
    // DisTubeOptions.searchSongs = true
    .on("searchResult", (message, result) => {
        let i = 0;
        const embed = new Discord.MessageEmbed()
            .setTitle('Choose an option from below')
            .setColor('PURPLE')
            .setDescription(`${result.map(song => `**${++i}**. ${song.name} - \`${song.formattedDuration}\``).join("\n")}\n`)
            .setFooter('Enter anything else or wait 60 seconds to cancel')
        message.channel.send(embed);
    })
    // DisTubeOptions.searchSongs = true
    .on("searchCancel", (message) => message.channel.send(`Searching canceled`))
    .on("error", (message, e) => {
        console.error(e)
        message.channel.send("⚠ An error encountered: " + e);
    });

// ! Bot token :)
require('dotenv').config()

client.login(process.env.token)