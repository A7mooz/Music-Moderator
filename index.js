//Main Packages
const Discord = require('discord.js')
const client = new Discord.Client()

//Custom constants
const { prefix } = require('./config.json')
const loadCommand = require('./loaders/load-command')
const loadFeatures = require('./loaders/load-features')

// ! Ready Event
client.on('ready', async () => {
    console.log(`${client.user.tag} client is ready!`)

    loadCommand(client)
    loadFeatures(client)
})

// ! Bot token :)
require('dotenv').config()

client.login(process.env.token)