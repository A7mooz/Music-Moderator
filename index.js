const Discord = require('discord.js');

const client = new Discord.Client();

const ytdl = require('ytdl-core')

const prefix = ";"

require('dotenv').config()

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

client.on("ready", () => console.log(`I'm logged in as ${client.user.username}`))

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

// ! Music
client.on('message', message => {
    if (!message.guild) return
    if (message.author.bot) return

    if (message.content.startsWith(`${prefix}join`)) {
        if (!message.member.voice.channel) return message.reply(`You need to be in a voice channel to me able to join.`)
        message.member.voice.channel.join()
    } else if (message.content.startsWith(`${prefix}leave`)) {
        if (!message.member.voice.channel) return message.reply(`You need to be in the voice channel to use this.`)
        message.member.voice.channel.leave()
    }
})


client.login(process.env.token)