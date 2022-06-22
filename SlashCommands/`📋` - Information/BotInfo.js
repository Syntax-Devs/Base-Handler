const { MessageEmbed, Interaction } = require('discord.js');
const moment = require('moment');
const embedColor = require('../../config/config.json').Colors.maincolor;
const success = require('../../config/config.json').Colors.success;
const failure = require('../../config/config.json').Colors.failure;const client = require('../../index');

module.exports = {
    name: "botinfo",
    category: "utility",
    description: "Displays My Information!",
    aliases: [],

    run: async (client, interaction, args) => {
        const embed = new MessageEmbed()
            .setThumbnail(interaction.guild.iconURL({dynamic : true}))
            .setColor(embedColor)
            .setTitle(`${client.user.username} Information.`)
            .addFields(
                {
                    name: 'Client Username',
                    value: `\`\`\`${client.user.username}\`\`\``,
                    inline: false
                },
                {
                    name: 'Client Tag',
                    value: `\`\`\`${client.user.tag}\`\`\``,
                    inline: false,
                },
                {
                    name: 'Client ID',
                    value: `\`\`\`${client.user.id}\`\`\``,
                    inline: false
                },
                {
                    name: `Bot Created At:`,
                    value: `\`\`\`${moment(client.user.createdAt)}\`\`\``,
                    inline: false
                },
                {
                    name: `Joined ${interaction.guild.name}`,
                    value: `\`\`\`${moment(client.JoinedAT)}\`\`\``,
                    inline: false
                },
            )
        interaction.reply({ embeds: [embed], ephemeral: true })
    }
}