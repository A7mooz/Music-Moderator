const loadCommands = require('@root/commands/load-commands')
const { owners } = require('@root/config.json')
const { MessageEmbed } = require('discord.js')

module.exports = {
    commands: ['help'],
    description: "Describes all of this bot's commands",
    guildOnly: true,
    modOnly: true,
    permissions: ['ADMINISTRATOR'],
    callback: ({ message, prefix }) => {
        let embed = new MessageEmbed()
            .setTitle('Help Menu')
            .setColor('PURPLE')
            .setFooter(`required: \`<>\` | optional: \`()\` | required in some cases or subcommands: \`[]\` | required in defrent args or subcommands: \`{}\``)

        const commands = loadCommands()

        for (const command of commands) {
            // Check for permissions
            let ownerOnly = command.ownerOnly

            if (ownerOnly) {
                let isOwner = true

                if (ownerOnly) {
                    for (i in owners) {
                        if (message.member.id === owners[i]) {
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

            if (mainCommand === 'help') continue

            embed.addField(mainCommand, `description: ${description} \nusage: ${prefix}${mainCommand}${args}`)
        }

        message.channel.send(embed)
    },
}