const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require("discord.js");
const config = require("../../config");
const history = require("../../database/history");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('delete-history')
        .setDescription("Delete the user's purchase history by including the product ID.")
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild)
        .addNumberOption((option) => option
            .setName('id').setDescription('The ID of the product that the user wants to delete.').setRequired(true)),

    async execute(interaction, client) {
        await history.findOne({ idHistory: interaction.options.getNumber('id') }).then(async (historyData) => {
            if (historyData) {
                return interaction.reply({
                    embeds: [new EmbedBuilder()
                        .setDescription(`Successfully deleted purchase history on <@!${historyData.userId}> with id: ${historyData.idHistory}`)
                        .setColor(config.embed.color)], ephemeral: true
                }).then(async () => {
                    await history.findOneAndDelete({ idHistory: historyData.idHistory });
                });
            } else {
                return interaction.reply({
                    embeds: [new EmbedBuilder()
                        .setDescription(`Cannot find product with that id, please enter the correct id.`)
                        .setColor(config.embed.color)], ephemeral: true
                });
            }
        });
    }
}