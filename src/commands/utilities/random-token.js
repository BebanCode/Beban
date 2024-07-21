const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const fetch = require("node-fetch");

module.exports = {
  data: new SlashCommandBuilder()
    .setName('token')
    .setDescription('Show the bot\'s token'),
  async execute(interaction) {


    try {
      const response = await fetch(`https://some-random-api.com/bottoken?id=${interaction.user.id}`);
      const json = await response.json();

      const embed = new EmbedBuilder()
        .setTitle('🤖・Bot token')
        .setDescription(json.token)
        .setFooter({ text: 'This is just a random token 😂' })

      await interaction.reply({ embeds: [embed] });
    } catch (error) {
      console.error(error);
      await interaction.reply('Error fetching token');
    }
  }
};
