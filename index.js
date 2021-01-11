const Discord = require('discord.js')

const client = new Discord.Client()

const ytdl = require('ytdl-core')

const prefix = ";"

const fs = require('fs')

// Command Hadlers
client.commands = new Discord.Collection()

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'))
for (file of commandFiles) {
    const command = require(`./commands/${file}`)

    client.commands.set(command.name, command)
}

client.modCommands = new Discord.Collection()

const modCommandFiles = fs.readdirSync('./commands/moderation-commands/').filter(file => file.endsWith('.js'))
for (file of modCommandFiles) {
    const command = require(`./commands/moderation-commands/${file}`)

    client.modCommands.set(command.name, command)
}

client.musicCommands = new Discord.Collection()

const musicCommandFiles = fs.readdirSync('./commands/music/').filter(file => file.endsWith('.js'))
for (file of musicCommandFiles) {
    const command = require(`./commands/music/${file}`)

    client.musicCommands.set(command.name, command)
}


// Ready Event
client.on("ready", () => console.log(`I'm logged in as ${client.user.username}`))

// Anti-Advert
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



client.on('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return

    const args = message.content.slice(prefix.length).split(/ +/)
    const command = args.shift().toLowerCase()

    if (command === 'ping') {
        client.commands.get('ping').execute(message, args)
    }

    if (command === 'play') {
        client.musicCommands.get('play').execute(message, args)
    } else if (command === 'leave') {
        client.musicCommands.get('leave').execute(message, args)
    }
})

// Bot token :)
require('dotenv').config()

client.login(process.env.token)