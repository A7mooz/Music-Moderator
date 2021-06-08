module.exports = client => {

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

    client.on('message', async (message) => {
        const { guild, member, content } = message

        if (message.channel.id !== '823518103589093376') return

        var code

        if (content.includes('discord.gg/') || content.includes('discord.com/invite/')) {

            if (message.channel.id === '796424380849717299' || message.channel.id === '795950229786198016') return;

            if (content.includes('discord.gg/')) code = content.split('discord.gg/')[1]
            if (content.includes('discord.com/invite/')) code = content.split('discord.com/invite/')[1]

            const isOurInvite = await isInvite(guild, code)

            if (!isOurInvite && code) {
                message.delete()
                message.reply('<a:bonking:825352729693388801> You\'re not allowed to share servers in this channel.').then(msg => msg.delete({ timeout: 1000 * 5 }))
            }
        }
    })

}