const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder, AttachmentBuilder } = require("discord.js");
const puppeteer = require("puppeteer")
const config = require("../../config");
const { WaitTask } = require("puppeteer");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("screenshot")
        .setDescription("Take a screenshot of a web")
        .setDefaultMemberPermissions(PermissionFlagsBits.SendMessages)
        .addStringOption((option) => option
            .setName('url')
            .setDescription('The web u want to take screenshot from.').setRequired(true))
        .addStringOption((option) => option
            .setName('resolution')
            .setDescription('The screenshot resolution.').setRequired(true)
            .addChoices(
                { name: '1366x768', value: '1366x768' },
                { name: '1920x1080', value: '1920x1080' },)),

    async execute(interaction) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const url = interaction.options.getString('url');
    const reso = interaction.options.getString('resolution');
    const load = await interaction.reply({ content: 'Taking screenshot, please wait...', ephemeral: true});

    await page.goto(url, {waitUntil: 'networkidle0'});


    switch (reso) {
        case '1366x768': {await page.setViewport({width: 1366, height: 768})} break;
        case '1920x1080': {await page.setViewport({width: 1920, height: 1080})} break;
    }

    const layar = await page.screenshot();
    await browser.close();    
    const attachment = new AttachmentBuilder()
        .setFile(layar)
        .setName('image.png');

    
    const hasil = new EmbedBuilder()
        .setAuthor({ name: 'Web Screenshot', iconURL: interaction.guild.iconURL({ dynamic: true }) })
        .setDescription(`Web: \`\`${url}\`\`
        Resolution: \`\`${reso}\`\``)
        .setImage(`attachment://image.png`)
        .setColor(config.embed.color)
        .setTimestamp();
        try {
    await interaction.member.send({ content: '', embeds: [hasil], files: [{attachment: layar, name: `image.png` }] });
    load.edit({ content: 'Image have been sent to your dm.', ephemeral: true });
        } catch (error) {
            console.log(error);
            load.edit({ content: `⚠️Error : \`\`\`Only support http/https format!\`\`\``, ephemeral: true });
        }
    }
}

