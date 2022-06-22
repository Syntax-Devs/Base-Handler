const { MessageEmbed, MessageActionRow, MessageButton, Interaction } = require("discord.js");
const { readdirSync } = require("fs");
const prefix = require("../../config/config.json").prefix;
const embedColor = require('../../config/config.json').Colors.maincolor;
const success = require('../../config/config.json').Colors.success;
const failure = require('../../config/config.json').Colors.failure;
module.exports = {
  name: "help",
  aliases : ['h'],
  description: "Shows all of My Commands.",
  run: async (client, interaction, args) => {

    const roleColor =
    interaction.guild.me.displayHexColor === `${embedColor}`
        ? "#ffffff"
        : interaction.guild.me.displayHexColor;

    if (!args[0]) {
      let categories = [];

      readdirSync("./SlashCommands/").forEach((dir) => {
        const commands = readdirSync(`./SlashCommands/${dir}/`).filter((file) =>
          file.endsWith(".js")
        );

        const cmds = commands.map((command) => {
          let file = require(`../../SlashCommands/${dir}/${command}`);

          if (!file.name) return `\`No command name.\``;

          let name = file.name.replace(".js", "");

          return `\`\`${name}\`\``;
        });

        let data = new Object();

        data = {
          name: dir.toUpperCase(),
          value: cmds.length === 0 ? `\`\`\`In Progress...\`\`\`` : cmds.join(" "),
        };

        categories.push(data);
      });

      const clientID = `${client.user.id}`
      const embed = new MessageEmbed()
      .setAuthor({ name: `${client.user.username} Help Menu`, iconURL: interaction.guild.iconURL(), url: `https://discord.com/api/oauth2/authorize?client_id=${clientID}&permissions=8&scope=applications.commands%20bot` })
      .setTitle("🔨 Need help? Here are all of my commands:")
        .addFields(categories)
        .setFooter({ text: `${interaction.user.username}`, iconURL: `${interaction.guild.iconURL()}`})
        .setTimestamp()
        .setColor(embedColor);
return interaction.reply({ embeds: [embed], ephemeral: true})
    } else {
      const command =
        client.commands.get(args[0].toLowerCase()) ||
        client.commands.find(
          (c) => c.aliases && c.aliases.includes(args[0].toLowerCase())
        );

      if (!command) {
        const embed = new MessageEmbed()
          .setTitle(`Invalid command! Use \`/help\` for all of my commands!`)
          .setColor(embedColor);
  return interaction.reply({ embeds: [embed], ephemeral: true});
      }

      const embed = new MessageEmbed()
      .setAuthor({ name: `${client.user.username} Help Menu`, iconURL: interaction.guild.iconURL(), url: `https://discord.com/api/oauth2/authorize?client_id=${clientID}&permissions=8&scope=applications.commands%20bot` })
        .setTitle("Command Details:")
        .addField("PREFIX:", `\`/\``)
        .addField(
          "COMMAND:",
          command.name ? `\`${command.name}\`` : "No name for this command."
        )
        .addField(
          "ALIASES:",
          command.aliases
            ? `\`${command.aliases.join("` `")}\``
            : "No aliases for this command."
        )
        .addField(
          "USAGE:",
          command.usage
            ? `\`/${command.name} ${command.usage}\``
            : `\`/${command.name}\``
        )
        .addField(
          "DESCRIPTION:",
          command.description
            ? command.description
            : "No description for this command."
        )
        .setFooter({ text: `${interaction.user.username}`, iconURL: `${interaction.guild.iconURL()}`})
        .setTimestamp()
        .setColor(embedColor);
return interaction.reply({ embeds: [embed], ephemeral: true});
    }
  },
};
