const { Client, Collection, MessageEmbed, Interaction } = require("discord.js");
const ms = require('ms');
const client = new Client({
    intents: 32767,
    partials: ['CHANNEL']
});
module.exports = client;
const token = require('./config/config.json')["Bot-Info"].token;

// Global Variables
client.commands = new Collection();
client.slashCommands = new Collection();
client.config = require("./config/config.json");

// Initializing the project
require("./handler")(client);

// Misc
client.setMaxListeners(50);

client.login(token)