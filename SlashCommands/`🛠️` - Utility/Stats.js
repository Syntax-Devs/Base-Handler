const { CommandInteraction, Client, MessageEmbed, Guild } = require("discord.js");
const embedColor = require('../../config/config.json').Colors.maincolor;
const success = require('../../config/config.json').Colors.success;
const failure = require('../../config/config.json').Colors.failure;
const { parseDur } = require('../../functions');
const { connection } = require("mongoose");

module.exports = {
    name: "stats",
    description: "Shows the bot's status",
    /**
     * 
     * @param {CommandInteraction} interaction 
     * @param {Client} client 
     */
     run: async (client, interaction, args) => {
        const duration = parseDur(client.uptime);


        const Response = new MessageEmbed()
            .setColor(embedColor)
            .setTitle("Bots Stats Status")
            .setDescription(`\`\`\`Client: 🟢 ONLINE - ${client.ws.ping}ms\n Uptime: ${duration}\n\nDatabase: ${switchTo(connection.readyState)} \n \n Tools: \n > Discord Javscript: ${process.version}\n > Node.js: ${process.version}\n > Discord.js: ${require("discord.js").version}\n > MongoDB: ${require("mongoose").version}\n > Mongoose: ${require("mongoose").version}\n > Discord.js-Commands: ${require("../../package.json").version}\`\`\``)
            .addField("**__Guilds__**", `\`${client.guilds.cache.size}\` Guilds Connected.`, true)
            .addField("**__Users__**", `\`${client.users.cache.size}\` Users Connected.`, true)
            .setThumbnail(client.user.avatarURL({ format: "png", dynamic: true, size: 1024 }))
            .setTimestamp()
            .setFooter({ text: `${client.user.username}`, iconURL: `${client.user.displayAvatarURL({ dynamic: true})}`});

        interaction.reply({ embeds: [Response], ephemeral: true });
    }
};

function switchTo(val) {
    var status = " ";
    switch (val) {
        case 0:
            status = "🔴 DISCONNECTED";
            break;
        case 1:
            status = `🟢 CONNECTED`
            break;
        case 2:
            status = `🟡 CONNECTING`
            break;
        case 3:
            status = `🔵 DISCONNECTING`
            break;
    }
    return status;
}