const { SlashCommandBuilder, PermissionFlagsBits, ChannelType, EmbedBuilder } = require("discord.js");
const config = require("../../config");
const queueSchema = require("../../database/queue");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('queue')
        .setDescription('Manage the installation of the queue feature on this server.')
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
        .addSubcommand((command) => command
            .setName('enable').setDescription('Enables the queue feature for this server.')
            .addChannelOption((channel) => channel
                .setName('channel').setDescription('Channel used for feature configuration.').setRequired(true).addChannelTypes(ChannelType.GuildText)))
        .addSubcommand((command) => command
            .setName('disable').setDescription('Enables the queue feature for this server.')),

    async execute(interaction, client) {
        const { guild, options } = interaction;
        switch (options.getSubcommand()) {
            case 'enable': {
                await queueSchema.findOne({ GuildID: guild.id }).then(async (data) => {
                    if (!data) {
                        return interaction.reply({
                            embeds: [new EmbedBuilder()
                                // .setTitle(``)
                                .setDescription(`Successfully added feature data to the database for this server.`)
                                .setColor(config.embed.color)], ephemeral: true
                        }).then(async () => {
                            await queueSchema.create({
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
            case 'disable': {await queueSchema.findOneAndDelete({ GuildID: guild.id }).then(async (data) => {
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
}