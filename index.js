const path = require('path')
const fs = require('fs')
const Discord = require('discord.js')
const DisTube = require('distube')
const { prefix } = require('./config.json')
const client = new Discord.Client()

distube = new DisTube(client, { searchSongs: true, emitNewSongOnly: true });

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

// Music 
client.on("message", async (message) => {
    if (!message.guild) return;
    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    if (!message.member.voice.channel) return message.reply('You must be in a voice channel to use this command.');

    if (command == "play")
        distube.play(message, args.join(" "));

    if (["repeat", "loop"].includes(command))
        distube.setRepeatMode(message, parseInt(args[0]));

    if (command == "stop") {
        distube.stop(message);
        message.channel.send("Stopped the music!");
    }

    if (command == "skip")
        distube.skip(message);

    if (command == "queue") {
        let queue = distube.getQueue(message);
        message.channel.send('Current queue:\n' + queue.songs.map((song, id) =>
            `**${id + 1}**. ${song.name} - \`${song.formattedDuration}\``
        ).slice(0, 10).join("\n"));
    }

    if ([`3d`, `bassboost`, `echo`, `karaoke`, `nightcore`, `vaporwave`].includes(command)) {
        let filter = distube.setFilter(message, command);
        message.channel.send("Current queue filter: " + (filter || "Off"));
    }
});

// Queue status template
const status = (queue) => `Volume: \`${queue.volume}%\` | Filter: \`${queue.filter || "Off"}\` | Loop: \`${queue.repeatMode ? queue.repeatMode == 2 ? "All Queue" : "This Song" : "Off"}\` | Autoplay: \`${queue.autoplay ? "On" : "Off"}\``;

// DisTube event listeners, more in the documentation page
distube
    .on("playSong", (message, queue, song) => {
        const embed = new Discord.MessageEmbed()
            .setColor('PURPLE')
            .setDescription(`Playing \`${song.name}\` - \`${song.formattedDuration}\`\nRequested by: ${song.user}\n`)
            .setFooter(`${status(queue)}`)
        message.channel.send(embed)
    })
    .on("addSong", (message, queue, song) => {
        const embed = new Discord.MessageEmbed()
            .setColor('PURPLE')
            .setDescription(`Added ${song.name} - \`${song.formattedDuration}\` to the queue by ${song.user}`)
        message.channel.send(embed)
    })
    .on("playList", (message, queue, playlist, song) => {
        const embed = new Discord.MessageEmbed()
            .setColor('PURPLE')
            .setDescription(`Play \`${playlist.name}\` playlist (${playlist.songs.length} songs).\nRequested by: ${song.user}\nNow playing \`${song.name}\` - \`${song.formattedDuration}\`\n`)
            .setFooter(`${status(queue)}`)
    })
    .on("addList", (message, queue, playlist) => {
        const embed = new Discord.MessageEmbed()
            .setColor('PURPLE')
            .setDescription(`Added \`${playlist.name}\` playlist (${playlist.songs.length} songs) to queue\n`)
            .setFooter(`${status(queue)}`)
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
        message.channel.send("An error encountered: " + e);
    });

// Bot token :)
require('dotenv').config()

client.login(process.env.token)