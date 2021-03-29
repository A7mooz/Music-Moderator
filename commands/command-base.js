/**
 * NOTE:
 *  Some parts of this code have been improved since the original command base video.
 *  This file should still work as expected, however if you are learning the inner workings of
 *  this file then expect the file to be slightly different than in the video.
 */

const { prefix } = require('../config.json')

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

module.exports = (client, commandOptions) => {
    let {
        commands,
        expectedArgs = '',
        minArgs = 0,
        maxArgs = null,
        permissions = [],
        requiredRoles = [],
        modOnly,
        callback,
    } = commandOptions

    // Ensure the command and aliases are in an array
    if (typeof commands === 'string') {
        commands = [commands]
    }

    // Ensure the permissions are in an array and are all valid
    if (permissions.length) {
        if (typeof permissions === 'string') {
            permissions = [permissions]
        }

        validatePermissions(permissions)
    }

    // Listen for messages
    client.on('message', (message) => {

        const { member, content, guild, channel } = message

        for (const alias of commands) {
            const command = `${prefix}${alias.toLowerCase()}`

            if (
                content.toLowerCase().startsWith(`${command} `) ||
                content.toLowerCase() === command
            ) {
                message.delete()
                // A command has been ran

                // Ensure the user has the required permissions
                for (const permission of permissions) {
                    if (modOnly) {
                        if (!member.roles.cache.find(r => r.id === '793393550942404619' || r.id === '793393474690482196') && !member.hasPermission(permission)) {
                            return message.delete()
                        }
                    }

                    if (!member.hasPermission(permission)) {
                        return message.delete()
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
                        return message.delete()
                    }
                }

                // Split on any number of spaces
                const arguments = content.split(/[ ]+/)

                // Remove the command which is the first index
                arguments.shift()

                // Ensure we have the correct number of arguments
                if (
                    arguments.length < minArgs ||
                    (maxArgs !== null && arguments.length > maxArgs)
                ) {
                    message.reply(
                        `Incorrect syntax! Use \`${prefix}${alias} ${expectedArgs}\``
                    )
                    return message.delete()
                }

                const text = arguments.join(' ')

                // Handle the custom command code
                callback({ message, arguments, text, channel, guild, client, prefix })
            }
        }
    })
}