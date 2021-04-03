require('module-alias/register')
// Main Packages
const Discord = require('discord.js')
const client = new Discord.Client()

// Loaders
const loadCommands = require('@root/loaders/load-commands')
const loadFeatures = require('./loaders/load-features')

// ! Ready Event
client.on('ready', async () => {
    console.log(`${client.user.tag} client is ready!`)

    loadCommands(client)
    loadFeatures(client)
})

// ! Bot token :)
require('dotenv').config()

client.login(process.env.token)