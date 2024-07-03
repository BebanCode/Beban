const { SlashCommandBuilder, PermissionFlagsBits, ChannelType, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const config = require("../../config");
const greeting = require("../../database/greeting");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('greeting')
        .setDescription('Manage the installation of the greeting feature on this server.')
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
        .addSubcommand((command) => command
            .setName('enable').setDescription('Enables the greeting feature for this server.')
            .addChannelOption((channel) => channel
                .setName('channel').setDescription('The channel where greeting messages are sent.').setRequired(true).addChannelTypes(ChannelType.GuildText)))
        .addSubcommand((command) => command
            .setName('disable').setDescription('Disables the greeting feature for this server.')),

    async execute(interaction, client) {
        const { guild, options } = interaction;
        switch (options.getSubcommand()) {
            case 'enable': {
                await greeting.findOne({ GuildID: guild.id }).then(async (data) => {
                    if (!data) {
                        return interaction.reply({
                            embeds: [new EmbedBuilder()
                                // .setTitle(``)
                                .setDescription(`Successfully added feature data to the database for this server.`)
                                .setColor(config.embed.color)], ephemeral: true
                        }).then(async () => {
                            await greeting.create({
                                GuildID: guild.id, ChannelID: options.getChannel('channel').id
                            });
                        });
                    } else {
                        return interaction.reply({
                            embeds: [new EmbedBuilder()
                                // .setTitle(``)
                                .setDescription(`Failed to create feature data because this server has this feature installed.`)
                                .setColor(config.embed.color)], ephemeral: true
                        });
                    }
                });
            }
                break;
            case 'disable': {
                await greeting.findOneAndDelete({ GuildID: guild.id }).then(async (data) => {
                    if (data) {
                        return interaction.reply({
                            embeds: [new EmbedBuilder()
                                // .setTitle(``)
                                .setDescription(`Successfully deleted feature data on this server.`)
                                .setColor(config.embed.color)], ephemeral: true
                        });
                    } else {
                        return interaction.reply({
                            embeds: [new EmbedBuilder()
                                // .setTitle(``)
                                .setDescription(`Failed to delete feature data because this server does not have this feature installed.`)
                                .setColor(config.embed.errcolor)], ephemeral: true
                        });
                    }
                });
            }
                break;
        }
    }
}
