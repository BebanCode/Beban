const { SlashCommandBuilder, PermissionFlagsBits, ChannelType, EmbedBuilder } = require("discord.js");
const config = require("../../config");
const testimonial = require("../../database/testimonial");
const feedback = require("../../database/feedback");
const suggestion = require("../../database/suggestion");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('market')
        .setDescription('Manage the installation of the market feature on this server.')
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
        .addSubcommand((command) => command
            .setName('enable').setDescription('Enables the market feature for this server.')
            .addStringOption((option) => option
                .setName('option').setDescription('Options that can be selected in this action.').setRequired(true)
                .addChoices(
                    { name: 'Suggestion', value: 'a' },
                    { name: 'Feedback', value: 'b' },
                    { name: 'Testimonial', value: 'c' }
                ))
            .addChannelOption((channel) => channel
                .setName('channel').setDescription('Channel used for feature configuration.').setRequired(true).addChannelTypes(ChannelType.GuildText)))
        .addSubcommand((command) => command
            .setName('disable').setDescription('Enables the market feature for this server.')
            .addStringOption((option) => option
                .setName('option').setDescription('Options that can be selected in this action.').setRequired(true)
                .addChoices(
                    { name: 'Suggestion', value: 'd' },
                    { name: 'Feedback', value: 'e' },
                    { name: 'Testimonial', value: 'f' }
                ))),

    async execute(interaction, client) {
        const { guild, options } = interaction;
        switch (options.getSubcommand()) {
            case 'enable': {
                switch (options.getString('option')) {
                    case 'a': {
                        await testimonial.findOne({ GuildID: guild.id }).then(async (data) => {
                            if (!data) {
                                return interaction.reply({
                                    embeds: [new EmbedBuilder()
                                        // .setTitle(``)
                                        .setDescription(`Successfully added feature data to the database for this server.`)
                                        .setColor(config.embed.color)], ephemeral: true
                                }).then(async () => {
                                    await testimonial.create({
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
                    case 'b': {
                        await feedback.findOne({ GuildID: guild.id }).then(async (data) => {
                            if (!data) {
                                return interaction.reply({
                                    embeds: [new EmbedBuilder()
                                        // .setTitle(``)
                                        .setDescription(`Successfully added feature data to the database for this server.`)
                                        .setColor(config.embed.color)], ephemeral: true
                                }).then(async () => {
                                    await feedback.create({
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
                    case 'c': {
                        await testimonial.findOne({ GuildID: guild.id }).then(async (data) => {
                            if (!data) {
                                return interaction.reply({
                                    embeds: [new EmbedBuilder()
                                        // .setTitle(``)
                                        .setDescription(`Successfully added feature data to the database for this server.`)
                                        .setColor(config.embed.color)], ephemeral: true
                                }).then(async () => {
                                    await testimonial.create({
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
                }
            }
                break;
            case 'disable': {
                switch (options.getString('option')) {
                    case 'd': {
                        await testimonial.findOneAndDelete({ GuildID: guild.id }).then(async (data) => {
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
                                        .setColor(config.embed.color)], ephemeral: true
                                });
                            }
                        });
                    }
                        break;
                    case 'e': {
                        await feedback.findOneAndDelete({ GuildID: guild.id }).then(async (data) => {
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
                                        .setColor(config.embed.color)], ephemeral: true
                                });
                            }
                        });
                    }
                        break;
                    case 'f': {
                        await suggestion.findOneAndDelete({ GuildID: guild.id }).then(async (data) => {
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
                                        .setColor(config.embed.color)], ephemeral: true
                                });
                            }
                        });
                    }
                        break;
                }
            }
                break;
        }
    }
}