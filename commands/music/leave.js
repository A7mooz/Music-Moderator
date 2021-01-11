module.exports = {
    name: 'leave',
    description: 'leaves the voice channel',
    async execute(message, args) {
        const voiceChannel = message.member.voice.channel

        if (!voiceChannel) return message.channel.send(`Yoy should be in the voice channel to stop the music`)

        await voiceChannel.leave()
        await message.channel.send(`Leaving the channel`)
    }
}