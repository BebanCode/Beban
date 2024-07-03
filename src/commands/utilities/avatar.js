const { SlashCommandBuilder, PermissionFlagsBits, ButtonBuilder, ButtonStyle, ActionRowBuilder, EmbedBuilder } = require("discord.js");
const config = require("../../config");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("avatar")
        .setDescription("Check the targetet user's avatar")
        .setDefaultMemberPermissions(PermissionFlagsBits.SendMessages)
        .addUserOption((option) => option
            .setName('target').setDescription('Target.').setRequired(true)),

    async execute(interaction) {
        const tagged = interaction.options.getUser('target');

        const gif = new ButtonBuilder()
            .setLabel(".gif")
            .setStyle(ButtonStyle.Link)
            .setURL(tagged.displayAvatarURL({ dynamic: true, size: 2048, format: "gif" }))
        
        const jpeg = new ButtonBuilder()
            .setLabel(".jpeg")
            .setStyle(ButtonStyle.Link)
            .setURL(tagged.displayAvatarURL({ dynamic: true, size: 2048, format: "jpeg" }))
        
        const jpg = new ButtonBuilder()
            .setLabel(".jpg")
            .setStyle(ButtonStyle.Link)
            .setURL(tagged.displayAvatarURL({ dynamic: true, size: 2048, format: "jpg" }))
        
        const png = new ButtonBuilder()
            .setLabel(".png")
            .setStyle(ButtonStyle.Link)
            .setURL(tagged.displayAvatarURL({ dynamic: true, size: 2048, format: "png" }))
        
        const webp = new ButtonBuilder()
            .setLabel(".webp")
            .setStyle(ButtonStyle.Link)
            .setURL(tagged.displayAvatarURL({ dynamic: true, size: 2048, format: "webp" }))
        const row = new ActionRowBuilder()
            .addComponents(gif, jpeg, jpg, png, webp)
        
        
	embed = new EmbedBuilder()
	.setColor(config.embed.color)
        .setDescription(`**${tagged}'s Avatar**`)
        .setImage(tagged.displayAvatarURL({ dynamic: true, size: 2048 }))
        interaction.reply({ embeds: [embed], components: [row]})
    }
};
