const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require('discord.js');
const axios = require('axios');
const config = require('../../config')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('banner')
    .setDescription('View a user\'s banner')
    .addUserOption(option =>
      option.setName('user')
        .setDescription('The user to view the banner of')
        .setRequired(true)
    ),
  async execute(interaction, client) {
    const user = interaction.options.getUser('user')

    axios.get(`https://discord.com/api/users/${user.id}`, {
      headers: {
        Authorization: `Bot ${client.token}`,
      },
    }).then(res => {
      const { banner, accent_color } = res.data;
  
      if (banner) {
        const extension = banner.startsWith("a_") ? ".gif" : ".png";
        const url = `https://cdn.discordapp.com/banners/${user.id}/${banner}${extension}?size=1024`;
        const embed = new EmbedBuilder()
        .setColor(config.embed.color)
        .setDescription(`**${user.username}'s Banner**`)
        .setImage(url);
        interaction.reply({ embeds: [embed] })
      }
      else {
        if (accent_color) {
  
          const embed_accent = new EmbedBuilder()
          .setColor(config.embed.color)
          .setDescription(`**${user.username} doesn't have a banner.**`)
          interaction.reply({ embeds: [embed_accent] })
        }
        else {
          const embed_accenterr = new EmbedBuilder()
          .setColor(config.embed.color)
          .setDescription(`**${user.username} doesn't have a banner.**`)
          interaction.reply({ embeds: [embed_accenterr] })
        }
      }
    })
  }
};
