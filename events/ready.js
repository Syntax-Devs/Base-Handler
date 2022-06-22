const { Client, MessageEmbed, Message, MessageAttachment, Interaction, MessageActionRow, MessageButton, MessageSelectMenu, Discord, MessageReaction } = require("discord.js");
const client = require("../index");
const prefix = require('../config/config.json').prefix;
const { joinVoiceChannel } = require('@discordjs/voice');
const chalk = require('chalk');
const { connection } = require("mongoose");
const status1 = require('../config/config.json')["Bot-Info"].Status.status1;
const status2 = require('../config/config.json')["Bot-Info"].Status.status2;
const status3 = require('../config/config.json')["Bot-Info"].Status.status3;
const statustype = require('../config/config.json')["Bot-Info"].Status.statustype;
const mainguild = require('../config/config.json')["Bot-Info"].mainguild;
const chnl = require('../config/config.json')["Bot-Info"].Status.VCtoJoin;
client.on("ready", (member, members) => {
        client.user.setStatus('idle')    
        let statuss = [
            `${status1}`,
            `${status2}`,
            `${status3}`,
        ]
        setInterval(function() {
            let status = statuss[Math.floor(Math.random() * statuss.length)];
            client.user.setActivity(status, {type: `${statustype}`});

            
        }, 2500)
    console.log(`${chalk.red(`${client.user.tag} is up and ready to go!`)}\n${chalk.red(`${client.user.tag} is currently serving ${client.guilds.cache.size} Guilds!`)}\n${chalk.red(`${client.user.tag} is currently serving ${client.users.cache.size} Users!`)}`)
    const guilds = client.guilds.cache.sort((a, b) => b.memberCount - a.memberCount).first(20);
    const description = guilds.map((guild, index) => {
        return `${index+1}) ${guild.name} | ${guild.memberCount} Members`
    }).join('\n')
    console.log(`${chalk.red(description)}`)
})