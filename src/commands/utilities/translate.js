const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require("discord.js");
const translate = require("@iamtraction/google-translate");
const config = require("../../config");
const { bahasa } = require("../../data/choices")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("translate")
        .setDescription("Translate a text into selected language.")
        .setDefaultMemberPermissions(PermissionFlagsBits.SendMessages)
        .addStringOption((option) => option
            .setName('text')
            .setDescription('Text u want to translate (auto correct).').setRequired(true))
        .addStringOption((option) => option
            .setName('language')
            .setDescription('Language to translate to.').setRequired(true)
            .addChoices(bahasa)),

    async execute(interaction) {
        const text = interaction.options.getString('text');
        const lang = interaction.options.getString('language');
        const hehe = await translate(text, { to: `${lang}` });
        const embed = new EmbedBuilder()
            .setColor(config.embed.color)
            .setTitle('🔎Translate Success')
            .addFields({ name: 'Old Text', value: `\`\`\`${text}\`\`\``, inline: false})
            .addFields({ name: 'Translated Text', value: `\`\`\`${hehe.text}\`\`\``, inline: false});
        
            try {
                await interaction.reply({ content: '🌍Translating text...', ephemeral: true })
                await interaction.editReply({ content: '', embeds: [embed], ephemeral: true })
            } catch (err) {
                await interaction.editReply({ content: '❌ Something went wrong.', ephemeral: true })
            }
    }
}
