const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
   .setName('remove-role')
   .setDescription('Remove a role from a user.')
   .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers)
   .addUserOption(option => option
     .setName('user')
     .setDescription('The user to remove the role from.')
     .setRequired(true))
   .addRoleOption(option => option
     .setName('role')
     .setDescription('The role to remove from the user.')
     .setRequired(true)),

  async execute(interaction) {
    const guild = interaction.guild;
    const member = guild.members.cache.get(interaction.options.getUser('user').id);
    const role = interaction.options.getRole('role');

    if (!interaction.guild.members.me.permissions.has(PermissionFlagsBits.ModerateMembers)) {
      await interaction.reply('I do not have permission to manage roles.');
      return;
    }

    if (!interaction.member.permissions.has(PermissionFlagsBits.ModerateMembers)) {
      await interaction.reply('You do not have permission to remove roles.');
      return;
    }

    if (!member) {
      await interaction.reply('User not found.');
      return;
    }

    if (!role) {
      await interaction.reply('Role not found.');
      return;
    }

    const botRole = guild.members.me.roles.highest;
    if (role.position > botRole.position) {
      await interaction.reply('I do not have permission to remove roles higher than my own.');
      return;
    }

    try {
      await member.roles.remove(role);
      await interaction.reply(`The role \`\`${role.name}\`\`\ has been removed from ${member.user.username}.`);
    } catch (error) {
      console.error(error);
      await interaction.reply('There was an error removing the role.');
    }
  },
};
