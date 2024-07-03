const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require("discord.js");
const config = require("../../config");
const history = require("../../database/history");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('history')
        .setDescription('View the top 10 lists of your purchase history.')
        .setDefaultMemberPermissions(PermissionFlagsBits.SendMessages)
        .addBooleanOption((option) => option
            .setName('display').setDescription('Option to display messages publicly or not.').setRequired(false)),

    async execute(interaction, client) {
        await history.find({ userId: interaction.user.id }).sort({ amount: -1 }).limit(10).then(async (historysData) => {
            await history.find({ userId: interaction.user.id }).then(async(dataHistorys) => {
                await history.find({ userId: interaction.user.id }).sort({ _id: -1 }).then(async(lastHistory) => {
                    let totalAmount = 0;
                    await dataHistorys.forEach(async(dataHistory) => {
                        totalAmount += dataHistory.amount;
                    })
    
                    const historyResult = await Promise.all(historysData.map(async (historyData, index) => {
                        return `**${index + 1}.** **${historyData.product}** [ **${historyData.idHistory}** ]\n> **Price :** ${(historyData.amount).toLocaleString('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0, maximumFractionDigits: 0 })},-\n> **Purchase Date :** ${historyData.date}`
                    }))
        
                    const Embed = new EmbedBuilder()
                        .setTitle('Top 10 List of Your Purchase History')
                        .setDescription(`${historyResult.join('\n\n') || '-'}`)
                        .addFields([
                            {name: 'TOTAL PURCHASES', value: `\`\`\`${(totalAmount).toLocaleString('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0, maximumFractionDigits: 0 })},-\`\`\``, inline: true},
                            {name: 'LAST PURCHASES', value: `\`\`\`${lastHistory[0].date}\`\`\``, inline: true},
                        ])
                        .setColor(config.embed.color)
        
                    if (interaction.options.getBoolean('display') === true) {
                        return interaction.reply({ embeds: [Embed], ephemeral: true});
                    } else {
                        return interaction.reply({ embeds: [Embed], ephemeral: true });
                    }
                })
            })
        });
    }
}