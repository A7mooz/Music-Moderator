const ytdl = require('ytdl-core')
const ytSearch = require('yt-search')

module.exports = {
    name: 'play',
    description: 'plays music in a voice channel',
    async execute(message, args) {
        const voiceChannel = message.member.voice.channel

        if (!voiceChannel) return message.channel.send(`You should be in a voice channel to play music!`)
        const permissions = voiceChannel.permissionsFor(message.client.user)
        if (!permissions.has("CONNECT")) return message.channel.send(`I don't have the "Connect" permission!`)
        if (!permissions.has("SPEAK")) return message.channel.send(`I don't have the "Speak" permission`)
        if (!args.length) return message.channel.send(`You need to send the second argument!`)

        const connection = await voiceChannel.join()

        const videoFinder = async (query) => {
            const videoResult = await ytSearch(query)

            return (videoResult.videos.length > 1) ? videoResult.videos[0] : null
        }

        const video = await videoFinder(args.join(' '))

        if (video) {
            const stream = ytdl(video.url, { filter: 'audioonly' })
            connection.play(stream, { seek: 0, volume: 1 })
                .on('finish', () => [
                    voiceChannel.leave()
                ])
            await message.reply(`Now Playing ***${video.title}***`)
        } else {
            message.channel.send('No video results found')
        }

    }
}