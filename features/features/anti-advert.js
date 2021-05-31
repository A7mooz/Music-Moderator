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

        const code = content.split('discord.gg/')[1]

        if (content.includes('discord.gg/')) {

            if (message.channel.id === '796424380849717299' || message.channel.id === '795950229786198016') return;

            const isOurInvite = await isInvite(guild, code)

            if (!isOurInvite && code) {
                message.delete()
            }
        }
    })

}