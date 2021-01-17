const path = require('path')
const fs = require('fs')
const Discord = require('discord.js')
const client = new Discord.Client()


// Ready Event
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

// Bot token :)
require('dotenv').config()

client.login(process.env.token)