const { Client, CommandInteraction, Message, MessageEmbed } = require("discord.js");
const embedColor = require('../../config/config.json').Colors.maincolor;
const success = require('../../config/config.json').Colors.success;
const failure = require('../../config/config.json').Colors.failure;
module.exports = {
    name: "botguilds",
    description: "Returns the guilds that have me!",
    type: 'CHAT_INPUT',
    default_permission: true,

    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {

        const guilds = client.guilds.cache.sort((a, b) => b.memberCount - a.memberCount).first(10);

        const description = guilds.map((guild, index) => {
            return `**${index+1}) ${guild.name} | ${guild.memberCount} Members**`
        }).join('\n')

        const embed = new MessageEmbed()
        interaction.reply({ embeds: [embed.setTitle(`Servers That Have ${client.user.username}!`)
        .setColor(embedColor)
        .setDescription(description)], ephemeral: true});
    },
};