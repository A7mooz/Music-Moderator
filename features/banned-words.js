module.exports = client => {

    let bannedWords = ['fuck', 'bitch', 'asshole', 'cock', 'puss', 'nigg', 'shit', 'sh!t', '$#!t', 's#!t', 'sh*t', 'sh1t', 'porn', 'rapin', 'cummin', 'dick', 'blowjob', 'cunt', 'cnut', 'fuk', 'b!tch', 'b1tch', 'c0ck', 'whore', 'fook', 'doggy style', 'belowjob', 'fock', 'grabass', 'cummi', 'commy', 'f***', 'horn', 'pu$$', 'fug', 'f u c k', 'bitsh', 'bish', 'fick', 'feck', 'f*ck', 'cumshot', 'fok', 'boob', 'bootie', 'booty', 'kock', 'trann', 'buttholes']

    let exactWords = ['hoe', 'hoes', 'cum', 'cums', 'rape', 'rapes', 'ass', 'booti', 'pp', 'pps', 'sex', 'sexual', 'sexually', 'sexuality', 'butt', 'butts', 'shat', 'tit', 'tits']

    client.on('message', message => {
        if (message.author.bot) return
        if (message.channel.id !== '823518103589093376') return

        let isBadWord = false

        const bwFunc = () => {
            //     const emoji = message.guild.emojis.cache.find(e => e.name == 'bonking')
            message.channel.send(`<a:bonking:825352729693388801> ${message.member.user}, Please don't use that offensive language in ${message.guild.name} server`).then(msg => msg.delete({ timeout: 1000 * 5 }))
            // message.channel.send(emoji.id)
            message.delete()
        }

        for (var i in bannedWords) {
            if (message.content.toLowerCase().includes(bannedWords[i].toLowerCase())) isBadWord = true
        }

        for (var i in exactWords) {
            if (message.content.toLowerCase().split(/ +/).includes(exactWords[i])) isBadWord = true
        }

        // console.log(args);

        if (isBadWord) {
            bwFunc()
        }

    })

    client.on('messageUpdate', message => {
        if (message.author.bot) return
        if (message.channel.id !== '823518103589093376') return

        console.log(message.edits);

        let isBadWord = false

        for (var i in bannedWords) {
            if (message.content.toLowerCase().includes(bannedWords[i].toLowerCase())) isBadWord = true
        }

        for (var i in exactWords) {
            if (message.content.toLowerCase().split(/ +/).includes(exactWords[i])) isBadWord = true
        }

        // console.log(args);

        if (isBadWord) {
            message.channel.send(`<a:bonking:825352729693388801> ${message.member.user}, Please don't use that offensive language in ${message.guild.name} server`).then(msg => msg.delete({ timeout: 1000 * 5 }))
            message.delete()
        }
    })
}