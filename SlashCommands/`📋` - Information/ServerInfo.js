const { MessageEmbed, Interaction } = require('discord.js');
const embedColor = require('../../config/config.json').Colors.maincolor;
const success = require('../../config/config.json').Colors.success;
const failure = require('../../config/config.json').Colors.failure;module.exports = {
    name: "serverinfo",
    category: "utility",
    description: "Displays a servers information!",
    aliases: ['sinfo', 'si'],

    run: async (client, interaction, args) => {
        let region;
        switch (interaction.guild.region) {
            case "europe":
                region = 'Europe';
                break;
            case "us-east":
                region = 'us-east'
                break;
            case "us-west":
                region = 'us-west';
                break;
            case "us-south":
                region = 'us-south'
                break;
            case "us-central":
                region = 'us-central'
                break;
        }
        const serverOwner = await interaction.guild.fetchOwner();

        const embed = new MessageEmbed()
            .setThumbnail(interaction.guild.iconURL({dynamic : true}))
            .setColor(embedColor)
            .setTitle(`${interaction.guild.name} Server Stats`)
            .addFields(
                {
                    name: "Owner: ",
                    value: `${serverOwner}`,
                    inline: false
                },
                {
                    name: "Members: ",
                    value: `There are ${interaction.guild.memberCount} users!`,
                    inline: false
                },
                {
                    name: "Total Bots: ",
                    value: `There are ${interaction.guild.members.cache.filter(m => m.user.bot).size} bots!`,
                    inline: false
                },
                {
                    name: "Creation Date: ",
                    value: interaction.guild.createdAt.toLocaleDateString("en-us"),
                    inline: false
                },
                {
                    name: "Roles Count: ",
                    value: `There are ${interaction.guild.roles.cache.size} roles in this server.`,
                    inline: false,
                },
//                    {
//                    name: `🗺 Region: `,
//                        value: region,
//                        inline: false
//                    },
                {
                    name: `Verified: `,
                    value: interaction.guild.verified ? 'Server is verified' : `Server isn't verified`,
                    inline: false
                },
                {
                    name: 'Boosters: ',
                    value: interaction.guild.premiumSubscriptionCount >= 1 ? `There are ${interaction.guild.premiumSubscriptionCount} Boosters` : `There are no boosters`,
                    inline: false
                },
                {
                    name: "Emojis: ",
                    value: interaction.guild.emojis.cache.size >= 1 ? `There are ${interaction.guild.emojis.cache.size} emojis!` : 'There are no emojis' ,
                    inline: false
                }
            )
        interaction.reply({ embeds: [embed], ephemeral: true })
    }
}