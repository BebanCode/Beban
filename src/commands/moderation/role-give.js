const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
   .setName('give-role')
   .setDescription('Give a user a role.')
   .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers)
   .addUserOption(option => option
     .setName('user')
     .setDescription('The user to give the role to.')
     .setRequired(true))
   .addRoleOption(option => option
     .setName('role')
     .setDescription('The role to give to the user.')
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
      await interaction.reply('You do not have permission to give roles.');
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
      await interaction.reply('I do not have permission to give roles higher than my own.');
      return;
    }

    try {
      await member.roles.add(role);
      await interaction.reply(`The role \`\`${role.name}\`\`\ has been added to ${member.user.username}.`);
    } catch (error) {
      console.error(error);
      await interaction.reply('There was an error giving the role.');
    }
  },
};
