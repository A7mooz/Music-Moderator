const { prefix, modRoles, owners } = require('../config.json')

const validatePermissions = (permissions) => {
    const validPermissions = [
        'CREATE_INSTANT_INVITE',
        'KICK_MEMBERS',
        'BAN_MEMBERS',
        'ADMINISTRATOR',
        'MANAGE_CHANNELS',
        'MANAGE_GUILD',
        'ADD_REACTIONS',
        'VIEW_AUDIT_LOG',
        'PRIORITY_SPEAKER',
        'STREAM',
        'VIEW_CHANNEL',
        'SEND_MESSAGES',
        'SEND_TTS_MESSAGES',
        'MANAGE_MESSAGES',
        'EMBED_LINKS',
        'ATTACH_FILES',
        'READ_MESSAGE_HISTORY',
        'MENTION_EVERYONE',
        'USE_EXTERNAL_EMOJIS',
        'VIEW_GUILD_INSIGHTS',
        'CONNECT',
        'SPEAK',
        'MUTE_MEMBERS',
        'DEAFEN_MEMBERS',
        'MOVE_MEMBERS',
        'USE_VAD',
        'CHANGE_NICKNAME',
        'MANAGE_NICKNAMES',
        'MANAGE_ROLES',
        'MANAGE_WEBHOOKS',
        'MANAGE_EMOJIS',
    ]

    for (const permission of permissions) {
        if (!validPermissions.includes(permission)) {
            throw new Error(`Unknown permission node "${permission}"`)
        }
    }
}

let recentlyRan = [] // guildId-userId-command

module.exports = (client, commandOptions) => {
    let {
        commands,
        expectedArgs = '',
        modOnly,
        minArgs = 0,
        maxArgs = null,
        cooldown = -1,
        requiredChannel = '',
        permissions = [],
        requiredRoles = [],
        guildOnly,
        ownerOnly,
        callback,
    } = commandOptions

    // Ensure the command and aliases are in an array
    if (typeof commands === 'string') {
        commands = [commands]
    }

    // console.log(`Registering command "${commands[0]}"`)

    // Ensure the permissions are in an array and are all valid
    if (permissions.length) {
        if (typeof permissions === 'string') {
            permissions = [permissions]
        }

        validatePermissions(permissions)
    }

    // Listen for messages
    client.on('message', async (message) => {
        const { member, content, guild, channel } = message

        for (const alias of commands) {
            const command = `${prefix}${alias.toLowerCase()}`

            if (
                content.toLowerCase().startsWith(`${command} `) ||
                content.toLowerCase() === command
            ) {
                // A command has been ran
                message.delete()

                // Ensure that the command will be ran only in a guild
                if (guildOnly) {
                    if (!guild) return
                }

                // Ensure that the message meber is form the owners
                for (i in owners) {
                    if (member.user.id !== owners[i]) {
                        return
                    }
                }

                // Ensure we are in the right channel
                if (requiredChannel && requiredChannel !== channel.name) {
                    //<#ID>
                    const foundChannel = guild.channels.cache.find((channel) => {
                        return channel.name === requiredChannel
                    })

                    message.reply(
                        `You can only run this command inside of <#${foundChannel.id}>.`
                    )
                    return
                }

                // Ensure the user has the required permissions
                for (const permission of permissions) {
                    if (modOnly) {
                        if (modOnly === true) {
                            if (!member.roles.cache.find(r => modRoles.includes(r.id)) && !member.hasPermission(permission)) {
                                return
                            }
                        }

                        for (i in modOnly) {
                            if (!member.roles.cache.find(r => r.id === modOnly[i]) && !member.hasPermission(permission)) {
                                return
                            }
                        }
                    } else if (!member.hasPermission(permission)) {
                        return
                    }
                }

                if (!permissions.length) {
                    if (modOnly === true) {
                        if (!member.roles.cache.find(r => modRoles.includes(r.id))) {
                            return
                        }
                    }

                    for (i in modOnly) {
                        if (!member.roles.cache.find(r => r.id === modOnly[i])) {
                            return
                        }
                    }
                }

                // Ensure the user has the required roles
                for (const requiredRole of requiredRoles) {
                    const role = guild.roles.cache.find(
                        (role) => role.name === requiredRole
                    )

                    if (!role || !member.roles.cache.has(role.id)) {
                        message.reply(
                            `You must have the "${requiredRole}" role to use this command.`
                        )
                        return
                    }
                }

                // Ensure the user has not ran this command too frequently
                //guildId-userId-command
                let cooldownString = `${guild.id}-${member.id}-${commands[0]}`

                if (cooldown > 0 && recentlyRan.includes(cooldownString)) {
                    message.reply('You cannot use that command so soon, please wait.')
                    return
                }

                // Split on any number of spaces
                const args = content.split(/[ ]+/)

                // Remove the command which is the first index
                args.shift()

                // Ensure we have the correct number of arguments
                if (
                    args.length < minArgs ||
                    (maxArgs !== null && args.length > maxArgs)
                ) {
                    message.reply(
                        `Incorrect syntax! Use ${prefix}${alias} ${expectedArgs}`
                    )
                    return
                }

                if (cooldown > 0) {
                    recentlyRan.push(cooldownString)

                    setTimeout(() => {
                        recentlyRan = recentlyRan.filter((string) => {
                            return string !== cooldownString
                        })
                    }, 1000 * cooldown)
                }

                const text = args.join(' ')
                // Handle the custom command code
                callback({ message, args, text, client, prefix, channel, guild })
            }
        }
    })
}