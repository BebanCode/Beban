const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require("discord.js");
const suggestion = require("../../database/suggestion");
const config = require("../../config");
const moment = require("moment-timezone");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('suggestion')
        .setDescription('Mengirimkan sebuah saran yang dapat di voting oleh seluruh member.')
        .setDefaultMemberPermissions(PermissionFlagsBits.SendMessages)
        .addStringOption((option) => option
            .setName('message').setDescription('Saran yang ingin dikirim.').setRequired(true))
        .addStringOption((option) => option
            .setName('image').setDescription('Gambar saran (opsional).').setRequired(false)),

    async execute(interaction, client) {
        const { user, options, guild } = interaction;
        await suggestion.findOne({ GuildID: guild.id }).then(async (data) => {
            if (data) {
                const Embed = new EmbedBuilder()
                    // .setTitle(``)
                    .setDescription(`${user} telah mengirimkan saran baru`)
                    .addFields([
                        { name: 'Pemberi Saran', value: `\`\`\`${user.id}\`\`\``, inline: true },
                        { name: 'Dikirim pada', value: `\`\`\`${moment(Date.now()).tz('Asia/Jakarta').format('DD MMMM YYYY HH:mm A')}\`\`\``, inline: true },
                        { name: 'Saran', value: `${options.getString('message').replace(/\\n/g, '\n')}`, inline: false },
                    ])
                    .setColor(config.embed.color)

                const image = options.getString('image');
                if (image) {
                    Embed.setImage(image)
                }
                // else {
                //     Embed.setImage(``)
                // }

                return interaction.reply({
                    embeds: [new EmbedBuilder()
                        // .setTitle(``)
                        .setDescription(`Berhasil mengirimkan saran pada server ini.`)
                        .setColor(config.embed.color)], ephemeral: true
                }).then(async () => {
                    await client.channels.cache.get(data.ChannelID).send({
                        embeds: [Embed]
                    })
                    // .then(async (msg) => {
                    //     msg.react(``);
                    //     msg.react(``);
                    // });
                });
            } else {
                return interaction.reply({
                    embeds: [new EmbedBuilder()
                        // .setTitle(``)
                        .setDescription(`Server ini tidak menyalakan fitur saran.`)
                        .setColor(config.embed.color)], ephemeral: true
                });
            }
        });
    }
}