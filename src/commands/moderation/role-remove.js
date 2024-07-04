const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('remove-role')
    .setDescription('Remove a user role.')
    .addUserOption(option => option
      .setName('user')
      .setDescription('The user u want to remove the role from.').setRequired(true))
    .addRoleOption(option => option
      .setName('role')
      .setDescription('The role u wanted to remove from user.').setRequired(true)),
      
  async execute(interaction) {
    const guild = interaction.guild;
    const member = guild.members.cache.get(interaction.options.getUser('user').id);
    const role = interaction.options.getRole('role');

    try {
      await member.roles.remove(role);
      await interaction.reply(`The role \`\`${role.name}\`\`\ has been removed from ${member.user.username}.`);
    } catch (error) {
      console.error(error);
      await interaction.reply('There was an error while removing the role.');
    }
  },
};