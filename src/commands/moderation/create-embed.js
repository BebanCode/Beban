const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');
const config = require('../../config');
 
module.exports = {
    data: new SlashCommandBuilder()
    .setDMPermission(false)
    .setName('create-embed')
    .setDescription('Create an embed.')
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
    .addStringOption(option => option
        .setName('title')
        .setDescription('The title of your embed.').setRequired(true))
    .addStringOption(option => option
        .setName('description')
        .setDescription('The description of your embed.').setRequired(true))
    .addBooleanOption(option => option
        .setName('timestamp').setDescription('Add a timestamp to your embed.').setRequired(true))
    .addStringOption(option => option
        .setName('color')
        .setDescription('(HEX) The color of your embed. DEFAULT: white.').setMaxLength(6).setMinLength(6).setRequired(false))
    .addStringOption(option => option
        .setName('image_link')
        .setDescription('The image of your embed.').setRequired(false))
    .addStringOption(option => option
        .setName('thumbnail_link')
        .setDescription('The thumbnail of your embed.').setRequired(false))
    .addStringOption(option => option
        .setName('field-name')
        .setDescription('The field name of your embed (BOTH FIELD OPTIONS ARE REQUIRED IF YOU USE ONE).').setRequired(false))
    .addStringOption(option => option
        .setName('field-value').setDescription('The field value of your embed (BOTH FIELD OPTIONS ARE REQUIRED IF YOU USE ONE).').setRequired(false))
    .addStringOption(option => option
        .setName('footer')
        .setDescription('The footer of your embed.').setRequired(false)),
 
    async execute (interaction, client) {       
        const op = interaction.options 
        const title = op.getString('title');
        const description = op.getString('description');
        const timestamp = op.getBoolean('timestamp');
        const footer = op.getString('footer')
        const color = op.getString('color');
        const image = op.getString('image_link');
        const thumbnail = op.getString('thumbnail_link');
        let fieldName = op.getString('field-name');
        let fieldValue = op.getString('field-value');
        
    try {
        const embed = new EmbedBuilder()
        .setTitle(title)
        .setDescription(description)
        .setColor(config.embed.color)
        
        if(fieldName != null || fieldValue != null) {
            if (fieldName == null) fieldName = 'No input here.';
            if (fieldValue == null) fieldValue = 'No input here.';
            embed.addFields(
                { name: `${fieldName}`, value: `${fieldValue}`}
                )
        }
        
        if(timestamp == true) {
            embed.setTimestamp()
        }
        if(footer) {
            embed.setFooter({ text: footer})
        }
        if(color) { 
            embed.setColor(`#${color}`)
        }
        if(image) {
            embed.setImage(`${image}`)
        }
        if(thumbnail) {
            embed.setThumbnail(thumbnail)
        }
        await interaction.reply({ content: 'Embed sent successfully', ephemeral: true})
        await interaction.channel.send({ embeds: [embed] })
    } catch (err) {
        const embed = new EmbedBuilder()
        .setColor(config.embed.errcolor)
        .setTitle('Error')
        .setDescription("There was an error creating your embed")
        await interaction.reply({ embeds: [embed], ephemeral: true})
    }
        }
    }
 
