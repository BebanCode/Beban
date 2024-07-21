const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const config = require("../../config");

module.exports = {
  data: new SlashCommandBuilder()
    .setName('mcstatus')
    .setDescription('Get the status of a Minecraft server')
    .addStringOption(option =>
      option.setName('ip')
        .setDescription('The IP address of the Minecraft server')
        .setRequired(true)
    ),
  async execute(interaction, client) {
    const ip = interaction.options.getString('ip');
    fetch(`https://api.mcsrvstat.us/2/${ip}`)
      .then((res) => res.json())
      .then(async (json) => {
        if (!json.players) return interaction.reply({ content: "Server is either down or there isn't any", ephemeral: true})

        const embed = new EmbedBuilder()
          .setTitle(`🌍️ Minecraft Server Status`)
          .setThumbnail(`https://eu.mc-api.net/v3/server/favicon/${ip}`)
          .setColor(config.client.errcolor)
          .addFields([
            { name: "<:bot_ping:1216737658177327274>〡 IP", value: `\`\`\`${ip}\`\`\``, inline: true },
            { name: "<:home:1216737668092657765> 〡 Port", value: `\`\`\`${json.port}\`\`\``, inline: true },
            { name: "<:Inpo:1216737668923396249> 〡 Description", value: `\`\`\`${json.motd.clean}\`\`\``, inline: false },
            { name: "<:codev:1216737642775842817> 〡 Version", value: `\`\`\`${json.version}\`\`\``, inline: true },
            { name: "<:member:1216737644411883532> 〡 Players online", value: `\`\`\`${json.players.online}/${json.players.max}\`\`\``, inline: true },
            { name: "<:bot_staff:1216737659079102605>  〡 Support us!", value: `[Support Server](https://discord.gg/tXyWPTb3fn) 〡 [Vote](https://top.gg/bot/1260210808776818729)`, inline: false },
          ]);

        await interaction.reply({ embeds: [embed] });
      }).catch({})
  }
}