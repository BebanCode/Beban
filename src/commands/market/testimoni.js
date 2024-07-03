const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require("discord.js");
const config = require("../../config");
const testimonial = require("../../database/testimonial");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('testimoni')
        .setDescription('Create testimonial messages for every product purchase.')
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
        .addUserOption((option) => option
            .setName('buyer').setDescription('Buyer of the product for this testimonial.').setRequired(true))
        .addNumberOption((option) => option
            .setName('number').setDescription('Testimonial creation number this time.').setRequired(true))
        .addStringOption((option) => option
            .setName('product').setDescription('Products that have been purchased currently.').setRequired(true))
        .addStringOption((option) => option
            .setName('price').setDescription('The price of the product that has been purchased.').setRequired(true))
        .addStringOption((option) => option
            .setName('image').setDescription('Image of successful transaction sent by buyer.').setRequired(true)),

    async execute(interaction, client) {
        const { user, options, guild } = interaction;
        await testimonial.findOne({ GuildID: guild.id }).then(async (data) => {
            if (data) {
                const buyer = options.getMember('buyer');
                return interaction.reply({
                    embeds: [new EmbedBuilder()
                        // .setTitle(``)
                        .setDescription(`Successfully sent a testimonial message for product purchase.`)
                        .setColor(config.embed.color)], ephemeral: true
                }).then(async () => {
                    await client.channels.cache.get(data.ChannelID).send({
                        embeds: [new EmbedBuilder()
                            // .setTitle(``)
                            .setDescription(`We have a new buyer and this is testimonial #${options.getNumber('number')}`)
                            .addFields([
                                { name: 'BUYER', value: `${buyer}`, inline: true },
                                { name: 'PRODUCT', value: `${options.getString('product').replace(/\\n/g, '\n')}`, inline: true },
                                { name: 'PRICE', value: `IDR ${options.getString('price')}`, inline: true },
                            ])
                            .setImage(options.getString('image'))
                            .setColor(config.embed.color)]
                    });
                    await buyer.send({
                        embeds: [new EmbedBuilder()
                            // .setTitle(``)
                            .setDescription(`We have a new buyer and this is testimonial #${options.getNumber('number')}`)
                            .addFields([
                                { name: 'BUYER', value: `${buyer}`, inline: true },
                                { name: 'PRODUCT', value: `${options.getString('product').replace(/\\n/g, '\n')}`, inline: true },
                                { name: 'PRICE', value: `IDR ${options.getString('price')}`, inline: true },
                            ])
                            // .setImage(``)
                            .setColor(config.embed.color)]
                    });
                });
            } else {
                return interaction.reply({
                    embeds: [new EmbedBuilder()
                        // .setTitle(``)
                        .setDescription(`Failed to execute command because there is no testimonial data on this server.`)
                        .setColor(config.embed.color)], ephemeral: true
                });
            }
        });
    }
}