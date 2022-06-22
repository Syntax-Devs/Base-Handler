let { MessageEmbed } = require('discord.js');
let moment = require('moment');
const embedColor = require('../../config/config.json').Colors.maincolor;
const success = require('../../config/config.json').Colors.success;
const failure = require('../../config/config.json').Colors.failure;
module.exports = {
    name: "userinfo",
    category: "utility",
    description: "Displays a users information.",
    aliases: ['uinfo', 'ui', 'find'],
    options: [
        {
            name: 'user',
            description: 'User to Investigate!',
            type: 'USER',
            required: true,
        },
    ],

    run: async (client, interaction, args) => {
        let member = interaction.options.getUser('user') || interaction.user;
        let userID = `<@${member.id}>`;
        let userName = `\`\`\`${member.tag}\`\`\``;
        let memberID = `\`\`\`${member.id}\`\`\``;
        let nickname = member ? `\`\`\`${member.nickname}\`\`\`` : null;
        let JoinedAT = `\`\`\`${moment(member.JoinedAT)}\`\`\``;
        let createdAtD = `\`\`\`${moment(member.createdAt)}\`\`\``;
        
        let embed23 = new MessageEmbed()
        .setColor(embedColor)
        .setThumbnail(member.displayAvatarURL({dynamic: true}))
        .setTitle(`User Information for ${member.tag}`)
        .addFields(
        { 
            name: 'Username:', 
            value: userName, 
            inline: true
        },
        { 
            name: 'Discord ID' ,
            value: memberID, 
            inline: true
        },
        {
            name: 'User Tag',
            value: userID,
            inline: false 
        },
//        { 
//            name: 'Nickname', 
//            value: nickname, 
//            inline: true
//        }, 
        { 
            name: 'Discord Account Created At', 
            value: createdAtD,
            inline: true
        }, 
        { 
            name: `Joined ${interaction.guild.name} At:`, 
            value: JoinedAT, 
            inline: false
        },
        )
        .setFooter({ text: `Requested by ${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL()}`})

        await interaction.reply({ embeds: [embed23], ephemeral: true })
    }
}