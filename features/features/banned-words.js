module.exports = client => {

    let bannedWords = ['fuck', 'bitch', 'asshole', 'cock', 'puss', 'nigg', 'shit', 'sh!t', '$#!t', 's#!t', 'sh*t', 'sh1t', 'porn', 'rapin', 'cum', 'dick', 'blowjob', 'cunt', 'cnut', 'fuk', 'b!tch', 'b1tch', 'c0ck', 'whore', 'fook', 'doggy style', 'belowjob', 'fock', 'grabass', 'cummi', 'commy', 'f***', 'horn', 'pu$$', 'fug', 'f u c k', 'fvck', 'fvk', 'fuvk', 'bitsh', 'bish', 'fick', 'feck', 'f*ck', 'cumshot', 'fok', 'fuc', 'boob', 'booti', 'booty', 'kock', 'trann', 'buttholes', 'fag', 'puta', 'thot', 'asshat']

    let exactWords = ['hoe', 'hoes', 'rape', 'rapes', 'ass', 'asses', 'pp', 'pps', 'sex', 'sexual', 'sexually', 'sexuality', 'butt', 'butts', 'shat', 'tit', 'tits']

    client.on('message', message => {
        if (message.author.bot) return
        if (message.channel.id !== '823518103589093376') return

        let args = message.content.toLowerCase().split(/[ ]+/g)

        args = args.join(' ').split('|')
        args = args.join('').split('*')
        args = args.join('').split('`')
        args = args.join('').split(/[ ]+/g)


        let isBadWord = false

        const bwFunc = () => {
            //     const emoji = message.guild.emojis.cache.find(e => e.name == 'bonking')
            message.channel.send(`<a:bonking:825352729693388801> ${message.member.user}, Please don't use that offensive language in ${message.guild.name} server`).then(msg => msg.delete({ timeout: 1000 * 5 }))
            console.log(`-------------------\nOffender: ${message.member.user.tag}\nText: ${args.join(' ')}`);
            // message.channel.send(emoji.id)
            message.delete()
        }

        for (var i in bannedWords) {
            if (message.content.toLowerCase().includes(bannedWords[i].toLowerCase())) isBadWord = true
        }

        for (var i in exactWords) {
            if (args.includes(exactWords[i])) {
                isBadWord = true
            }
        }

        // console.log(args);

        if (isBadWord) {
            bwFunc()
        }

    })
}
