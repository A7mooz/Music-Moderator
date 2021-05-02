const loadCommands = require('@root/commands/load-commands')
const { owners } = require('@root/config.json')
const { MessageEmbed } = require('discord.js')

module.exports = {
    commands: ['help'],
    description: "Describes all of this bot's commands",
    expectedArgs: '(command)',
    hidden: true,
    guildOnly: true,
    modOnly: true,
    permissions: ['ADMINISTRATOR'],
    callback: ({ message, prefix, args, text }) => {
        let embed = new MessageEmbed()
            .setTitle('Help Menu')
            .setColor('PURPLE')
            .setFooter(`Use ${prefix}help (command) for more info`)

        const commands = loadCommands()

        for (const command of commands) {
            // Check for permissions
            let ownerOnly = command.ownerOnly

            if (ownerOnly) {
                if (!owners.includes(message.member.id)) {
                    continue
                }
            }

            // Format the text
            const mainCommand =
                typeof command.commands === 'string'
                    ? command.commands
                    : command.commands[0]
            const arguments = command.expectedArgs ? ` ${command.expectedArgs}` : ''
            const { description } = command

            if (args.length) {
                let isCommand = typeof command.commands === 'string' ? command.commands === args[0].toLowerCase() : command.commands.includes(args[0].toLowerCase())

                if (isCommand) {
                    const commandEmbed = new MessageEmbed()
                        .setColor(embed.color)
                        .setTitle('Command: ' + mainCommand)
                        .setDescription(`${description}.`)
                    if (typeof command.commands === 'object' && command.commands.length > 1) {
                        commandEmbed.addField('Aliases', `${command.commands.join(', ')}`)
                    }
                    commandEmbed.addField('Usage', prefix + mainCommand + arguments)

                    if (arguments.length) {
                        commandEmbed.setFooter(`required: <> | optional: () | required in some subcommands: [] | required in defrent args: {}`)
                    }

                    if (command.subcommands) {
                        commandEmbed.addField('Subcommands', command.subcommands)
                    }

                    if (command.examples) {
                        let examples = ''

                        command.examples.forEach(example => {
                            example = ` ${example} `
                            examples += `${prefix + mainCommand + example}\n`
                        })

                        commandEmbed.addField('Examples:', `${examples} `)
                    }

                    message.channel.send(commandEmbed)
                    return
                }
            }

            if (command.hidden) {
                continue
            }

            embed.addField(mainCommand, `${description}.`, true)
        }

        if (args[0]) {
            message.channel.send(`<:no:811286748712796201> I don't have command with name '${args[0]}'`)
            return
        }

        message.channel.send(embed)

    },
}