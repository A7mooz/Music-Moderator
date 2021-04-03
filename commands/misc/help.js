const loadCommands = require('@root/loaders/load-commands')
const { owners } = require('@root/config.json')
const { MessageEmbed } = require('discord.js')

module.exports = {
    commands: ['help', 'h'],
    description: "Describes all of this bot's commands",
    modOnly: true,
    permissions: ['ADMINISTRATOR'],
    callback: ({ message, prefix }) => {
        let embed = new MessageEmbed()
            .setTitle('These are all supported commands')
            .setColor('PURPLE')
            .setFooter(message.author.tag)
            .setTimestamp(message.ceatedTimeStamp)

        const commands = loadCommands()

        for (const command of commands) {
            // Check for permissions
            let ownerOnly = command.ownerOnly

            if (ownerOnly) {
                let isOwner = true

                if (ownerOnly) {
                    for (i in owners) {
                        if (!message.member.id === owners[i]) {
                            isOwner = false
                            break
                        }
                    }

                    if (isOwner) {
                        continue
                    }
                }
            }

            // Format the text
            const mainCommand =
                typeof command.commands === 'string'
                    ? command.commands
                    : command.commands[0]
            const args = command.expectedArgs ? ` ${command.expectedArgs}` : ''
            const { description } = command

            embed.addField(mainCommand, `description: ${description}\n usage: ${prefix}${mainCommand}${args}`)
        }

        message.channel.send(embed)
    },
}