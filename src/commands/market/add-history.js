const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require("discord.js");
const config = require("../../config");
const history = require("../../database/history");
const moment = require("moment-timezone");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('add-history')
        .setDescription('Add user purchase history with products and prices.')
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild)
        .addUserOption((option) => option
            .setName('buyer').setDescription('User who want to add their purchase history.').setRequired(true))
        .addStringOption((option) => option
            .setName('product').setDescription('The product that is the ID in this purchase history.').setRequired(true))
        .addNumberOption((option) => option
            .setName('price').setDescription('The price of the product that the user buys.').setRequired(true)),

    async execute(interaction, client) {
        const buyer = interaction.options.getMember('buyer');
        const product = interaction.options.getString('product');
        const price = interaction.options.getNumber('price');
        const convertPriceIDR = price.toLocaleString('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0, maximumFractionDigits: 0 });
        return interaction.reply({
            embeds: [new EmbedBuilder()
                .setDescription(`Successfully added **${product}** for **${convertPriceIDR} to ${buyer}`)
                .setColor(config.embed.color)], ephemeral: true
        }).then(async () => {
            await history.find().sort({ _id: -1}).then(async(historyData) => {
                if(historyData[0]) {
                    await history.create({ idHistory: historyData[0].idHistory + 1, userId: buyer.id, product: product, amount: price, date: moment(Date.now()).tz('Asia/Jakarta').format('DD MMMM YYYY HH:mm') });
                } else {
                    await history.create({ idHistory: 1, userId: buyer.id, product: product, amount: price, date: moment(Date.now()).tz('Asia/Jakarta').format('DD MMMM YYYY HH:mm:ss') });
                }
            });
        });
    }
}