const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('send-dm')
        .setDescription('Send message to user.')
        .addUserOption(option => 
            option.setName('user')
            .setDescription('User that u want to dm.')
            .setRequired(true))
        .addStringOption(option => 
            option.setName('message')
            .setDescription('Message/s')
            .setRequired(true))
            .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),

    async execute(interaction) {
        
        await interaction.deferReply({ephemeral: true});
        const message = interaction.options.get('message').value;
        const userId = interaction.options.get('user').value;
        target = interaction.guild.members.cache.get(userId)

       
        try {
            await target.send(`${message}`)
            interaction.editReply({content: 'DM sent'});
        } catch (error) {
            interaction.editReply(`<@${userId}> dms are closed`)
        }
    }
}  

