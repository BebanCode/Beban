const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('give-role')
    .setDescription('Give a user a role.')
    .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers)
    .addUserOption(option => option
      .setName('user')
      .setDescription('The user to give the role to.').setRequired(true))
    .addRoleOption(option => option
      .setName('role')
      .setDescription('The role to give to the user.').setRequired(true)),
      
  async execute(interaction) {
    const guild = interaction.guild;
    const member = guild.members.cache.get(interaction.options.getUser('user').id);
    const role = interaction.options.getRole('role');

    try {
      await member.roles.add(role);
      await interaction.reply(`The role \`\`${role.name}\`\`\ has been added to ${member.user.username}.`);
    } catch (error) {
      console.error(error);
      await interaction.reply('There was an error giving the role.');
    }
  },
};