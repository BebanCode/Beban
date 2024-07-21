const { SlashCommandBuilder, PermissionFlagsBits, ButtonBuilder, ButtonStyle, ActionRowBuilder, EmbedBuilder } = require("discord.js");
const config = require("../../config");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("qr-code")
    .setDescription("Create a qr barcode")
    .setDefaultMemberPermissions(PermissionFlagsBits.SendMessages)
    .addStringOption((option) => option
      .setName('url')
      .setDescription('The url you want to turn into qr.')
      .setRequired(true)),

  async execute(interaction) {
    try {
      let url = interaction.options.getString('url');
        if (!url.startsWith('http://') &&!url.startsWith('https://')) {
          url = `http://${url}`;
        }

      const embed = new EmbedBuilder()
        .setColor(config.embed.color)
        .setDescription(`URL : ${url}`)
        .setImage(`http://api.qrserver.com/v1/create-qr-code/?data=${url}&size=512x512`)
        .setFooter({ 
            text: `Requested by ${interaction.user.tag}`,
            iconURL: interaction.user.displayAvatarURL(),
        });

      interaction.reply({ embeds: [embed] });
    } catch (error) {
      console.error(error);
      interaction.reply({ content: "Error: " + error.message, ephemeral: true });
    }
  },
};