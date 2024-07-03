const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('purge')
        .setDescription('Delete the targeted message/s.')
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
        .addStringOption(option => option
            .setName('amount')
            .setDescription('The amount of text to delete.').setRequired(true))
        .addUserOption(option => option
            .setName('user')
            .setDescription('The targeted user.').setRequired(true)),

    async execute(interaction) {
        const user = interaction.options.getUser('user');
        const amount = interaction.options.getString('amount');

        try {
            await interaction.channel.messages.fetch({ limit: amount }).then(messages => {
                const userMessages = messages.filter(m => m.author.id === user.id);
                interaction.channel.bulkDelete(userMessages);
                interaction.reply(`${amount} message/s from ${user.tag} has been deleted.`);
            });
        } catch (error) {
            console.error(error);
            interaction.reply('⚠️Error. :v');
        }
    },
};