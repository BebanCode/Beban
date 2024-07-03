const { SlashCommandBuilder, PermissionFlagsBits, ChannelType, EmbedBuilder } = require("discord.js");
const config = require("../../config");
const feedback = require("../../database/feedback");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('feedback')
        .setDescription('Memberikan rating kepada seller.')
        .setDefaultMemberPermissions(PermissionFlagsBits.SendMessages)
        .addChannelOption((channel) => channel
            .setName('product')
            .setDescription('Produk yang dibeli.').setRequired(true)
            .addChannelTypes(ChannelType.GuildText))
        .addUserOption(option => option
            .setName('penjual')
            .setDescription('Penjual.').setRequired(true))
        .addStringOption((option) => option
            .setName('harga').setDescription('Harga produk yang dibeli.').setRequired(true))
        .addStringOption((option) => option
            .setName('rating').setDescription('Rating pelayanan dan kualitas produk.').setRequired(true)
            .addChoices(
                { name: '⭐', value: '⭐' },
                { name: '⭐⭐', value: '⭐⭐' },
                { name: '⭐⭐⭐', value: '⭐⭐⭐' },
                { name: '⭐⭐⭐⭐', value: '⭐⭐⭐⭐' },
                { name: '⭐⭐⭐⭐⭐', value: '⭐⭐⭐⭐⭐' },
            ))
        .addStringOption((option) => option
            .setName('komentar').setDescription('Komentar tentang produk & pelayanan.').setRequired(true)),


    async execute(interaction, client) {
        const { user, options, guild } = interaction;
        const seller = interaction.options.getUser('penjual');
        // ini dah ga kepake sih... dlu ama fijar di tambahin
        await feedback.findOne({ GuildID: guild.id }).then(async (data) => {
            if (data) {
                const star = [
                    `🌟`,
                    `🌟🌟`,
                    `🌟🌟🌟`,
                    `🌟🌟🌟🌟`,
                    `🌟🌟🌟🌟🌟`
                ]

                const Embed = new EmbedBuilder()
                    // .setTitle(``)
                    .setDescription(`${options.getString('rating')}`)
                    .setColor(config.embed.feedbackcolor)
                    .setImage(`https://i.imgur.com/dvOvJtg.gif`)
                    .setFooter({
                        text: `Garansi ${user.tag} telah aktif`,
                        iconURL: user.displayAvatarURL(),
                      })

                switch (options.getString('rating')) {
                    case '⭐': {
                        Embed.addFields([
                            { name: 'Penjual', value: `${seller}`, inline: false },
                            { name: 'Pembeli', value: `${user}`, inline: true },
                            { name: 'Produk', value: `${options.getChannel('product')}`, inline: true },
                            { name: 'Harga', value: `${options.getString('harga')}`, inline: true },
                            { name: 'Komentar', value: `\`\`\`${options.getString('komentar')}\`\`\``, inline: false },
                        ])
                    }
                        break;
                    case '⭐⭐': {
                        Embed.addFields([
                            { name: 'Penjual', value: `${seller}`, inline: false },
                            { name: 'Pembeli', value: `${user}`, inline: true },
                            { name: 'Produk', value: `${options.getChannel('product')}`, inline: true },
                            { name: 'Harga', value: `${options.getString('harga')}`, inline: true },
                            { name: 'Komentar', value: `\`\`\`${options.getString('komentar')}\`\`\``, inline: false },
                        ])
                    }
                        break;
                    case '⭐⭐⭐': {
                        Embed.addFields([
                            { name: 'Penjual', value: `${seller}`, inline: false },
                            { name: 'Pembeli', value: `${user}`, inline: true },
                            { name: 'Produk', value: `${options.getChannel('product')}`, inline: true },
                            { name: 'Harga', value: `${options.getString('harga')}`, inline: true },
                            { name: 'Komentar', value: `\`\`\`${options.getString('komentar')}\`\`\``, inline: false },
                        ])
                    }
                        break;
                    case '⭐⭐⭐⭐': {
                        Embed.addFields([
                            { name: 'Penjual', value: `${seller}`, inline: false },
                            { name: 'Pembeli', value: `${user}`, inline: true },
                            { name: 'Produk', value: `${options.getChannel('product')}`, inline: true },
                            { name: 'Harga', value: `${options.getString('harga')}`, inline: true },                         
                            { name: 'Komentar', value: `${options.getString('komentar').replace(/\\n/g, '\n')}`, inline: false },
                        ])
                    }
                        break;
                    case '⭐⭐⭐⭐⭐': {
                        Embed.addFields([
                            { name: 'Penjual', value: `${seller}`, inline: false },
                            { name: 'Pembeli', value: `${user}`, inline: true },
                            { name: 'Produk', value: `${options.getChannel('product')}`, inline: true },
                            { name: 'Harga', value: `${options.getString('harga')}`, inline: true },
                            { name: 'Komentar', value: `\`\`\`${options.getString('komentar')}\`\`\``, inline: false },
                        ])
                    }
                        break;
                }
                return interaction.reply({
                    embeds: [new EmbedBuilder()
                        // .setTitle(``)
                        .setDescription(`Berhasil memberikan rating kepada seller.`)
                        .setColor(config.embed.color)], ephemeral: true
                }).then(async () => {
                    await client.channels.cache.get(data.ChannelID).send({ embeds: [Embed] });
                });
            } else {
                return interaction.reply({
                    embeds: [new EmbedBuilder()
                        // .setTitle(``)
                        .setDescription(`Server ini tidak menyalakan fitur rating.`)
                        .setColor(config.embed.errcolor)], ephemeral: true
                });
            }
        });
    }
}
