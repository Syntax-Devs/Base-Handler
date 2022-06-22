const { Client, Message, MessageEmbed, MessageActionRow, MessageSelectMenu, Interaction, MessageComponentCollector } = require('discord.js');
const color = require('../../config/config.json').Colors.maincolor;
const success = require('../../config/config.json').Colors.success;
const failure = require('../../config/config.json').Colors.failure;


module.exports = {
    name: 'guildbans',
    category: 'utility',
    description: 'Display the Servers Ban Amount and Banned Users.',

    run: async(client, interaction, args) => {
        await interaction.deferReply({ ephemeral: true});        

        try {
            const fetchBans = interaction.guild.bans.fetch();
            const bannedMembers = (await fetchBans)
            .map((member) => `${member.user.tag},`)
            .join("\n");

            interaction.guild.bans.fetch().then(bans => {

                if(!bans.size === '0') {
                    interaction.reply('No Recorded Bans!')
                } else {
                    interaction.followUp({ content: `Loading Bans... ${searching}`, ephemeral: true })

                    totalbans = new MessageEmbed()
                .setTitle(`\`🔨\` - \`Ban List Fetched\``)
                .setDescription(`We have a Total of \`${bans.size} Bans!\``)
                .addField('Ban List', `\`\`\`${bannedMembers}\`\`\``, true)
                .setColor(embedColor)

                interaction.editReply({ embeds: [totalbans], ephemeral: true })
                }
        })
        } catch (e) {
        const embed = new MessageEmbed()
        .setTitle(`\`✅\` - \`Action Successful\``)
        .setDescription(`No Recorded Bans!`)
        .setColor(embedColor)

        interaction.followUp({ embeds: [embed], ephemeral: true })
        }

    }
}