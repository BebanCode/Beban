const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('purge')
    .setDescription('Delete the targeted message/s.')
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
    .addStringOption(option => option
      .setName('amount')
      .setDescription('The amount of messages to delete.')
      .setRequired(true)),

  async execute(interaction) {
    const amount = interaction.options.getString('amount');

    if (!/^\d+$/.test(amount)) {
      return interaction.reply('Invalid amount. Please enter a positive integer.');
    }

    const amountInt = parseInt(amount, 10);

    if (amountInt <= 0 || amountInt > 100) {
      return interaction.reply('Amount must be between 1 and 100.');
    }

    if (!interaction.guild.members.me.permissions.has(PermissionFlagsBits.ManageMessages)) {
      return interaction.reply('I don\'t have the necessary permissions to manage messages in this channel.');
    }

    try {
      await interaction.channel.messages.fetch({ limit: amountInt }).then(messages => {
        interaction.channel.bulkDelete(messages);
        interaction.reply(`${amountInt} message/s from ${interaction.channel} has been deleted.`);
      });
    } catch (error) {
      console.error(error);
      interaction.reply('An error occurred while deleting messages. Please try again later.');
    }
  },
};