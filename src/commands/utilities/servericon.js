const { SlashCommandBuilder, PermissionFlagsBits, ButtonBuilder, ButtonStyle, ActionRowBuilder, EmbedBuilder } = require("discord.js");
const config = require("../../config");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("servericon")
        .setDescription("Get the server icon")
        .setDefaultMemberPermissions(PermissionFlagsBits.SendMessages),

    async execute(interaction) {
        const guild = interaction.guild
        const gif = new ButtonBuilder()
            .setLabel(".gif")
            .setStyle(ButtonStyle.Link)
            .setURL(guild.iconURL({ dynamic: true, size: 2048, format: "gif" }))	    
        const png = new ButtonBuilder()
            .setLabel(".png")
            .setStyle(ButtonStyle.Link)
            .setURL(guild.iconURL({ dynamic: true, size: 2048, format: "png" }))
        const row = new ActionRowBuilder()
            .addComponents(gif, png)
        
        
	embed = new EmbedBuilder()
	.setColor(config.embed.color)
        .setDescription(`**Guild Icon**`)
        .setImage(guild.iconURL({ dynamic: true, size: 2048 }))
        interaction.reply({ embeds: [embed], components: [row]})
    }
};
