require('module-alias/register')
require('dotenv').config()

const { MongoClient } = require('mongodb')
const MongoDBProvider = require('commando-provider-mongo')
const Commando = require('discord.js-commando')
const client = new Commando.Client()


const loadCommands = require('@root/commands/load-commands')
const loadFeatures = require('@root/features/load-features')
const mongo = require('@util/mongo')

// ! Ready Event
client.on('ready', async () => {
    console.log(`${client.user.tag} client is ready!`)

    await mongo()

    loadCommands(client)
    loadFeatures(client)
})

client.login(process.env.token)