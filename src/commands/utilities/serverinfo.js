const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits, ChannelType } = require('discord.js');
const config = require('../../config');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("serverinfo")
        .setDescription("Check server information")
        .setDefaultMemberPermissions(PermissionFlagsBits.SendMessages),

  async execute(interaction) {
    await interaction.deferReply();
    try {
    const guild = interaction.guild
    const embed = new EmbedBuilder()
    .setTitle("**Server Information**")
        .setColor(config.embed.color)
        .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
      .setDescription(`
      **Name:** \`${interaction.guild.name}\`
      **Server ID:** ${interaction.guild.id}
      **Owner:** <@${(interaction.guild.ownerId)}>
      **Owner ID:** ${(await interaction.guild.ownerId)}\n
      **Created At: ** <t:${parseInt(interaction.guild.createdTimestamp / 1000)}:R>
      **Members:** \`${interaction.guild.memberCount}\`
      **Roles:** \`${interaction.guild.roles.cache.size}\`
      **Emojis:** \`${interaction.guild.emojis.cache.size}\`
      **Animated Emojis:** \`${interaction.guild.emojis.cache.filter(emoji => emoji.animated).size}\`
      **Text Channels:** \`${await guild.channels.cache.filter(c => c.type === ChannelType.GuildText).size}\`
      **Voice Channels:** \`${await guild.channels.cache.filter(c => c.type === ChannelType.GuildVoice).size}\`\n\n
      **Boost Information**\n
      **Total Boosts:** \`${interaction.guild.premiumSubscriptionCount}\`
      **Boost Level:** \`${interaction.guild.premiumTier}\``)
        .setFooter({
        text: `Powered by ${interaction.guild.name}`
    })
    interaction.followUp({embeds: [embed]});
    } catch (error) {
      console.log(error)
      const errorEmbed = new EmbedBuilder()
        .setDescription(`:x: **Something went wrong while retrieving your server data.**`)
        .setColor(config.embed.errcolor);

     await interaction.editReply({ embeds: [errorEmbed] });
    }  
  }
}