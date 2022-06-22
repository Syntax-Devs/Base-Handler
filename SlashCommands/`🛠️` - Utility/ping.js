const { Client, CommandInteraction, MessageEmbed } = require("discord.js");
const color = require('../../config/config.json').Colors.maincolor;
const { parseDur } = require('../../functions');
const { connection } = require("mongoose");

module.exports = {
    name: "ping",
    description: "Returns the Bots Ping.",

    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        const duration = parseDur(client.uptime);

        await interaction.deferReply({ ephemeral: true});        

        interaction.followUp({ content: `Pinging...`, ephemeral: true })

        const embed = new MessageEmbed()
        .setTitle(`:bar_chart: - \`Ping & Uptime Info\``)
        .setDescription(`**Client Ping:** \`${client.ws.ping} MS!\`\n**Uptime:** ${duration}`)
        .setColor(color)

        interaction.editReply({ content: `Pong!`, embeds: [embed], ephemeral: true})
    },
};