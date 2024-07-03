const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder, AttachmentBuilder } = require("discord.js");
const puppeteer = require("puppeteer")
const config = require("../../config");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("screenshot")
        .setDescription("Take a screenshot of a web.")
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

    async execute(interaction, client) {
    const browser = await puppeteer.launch({
        args: ['--no-sandbox'],
    });
    const page = await browser.newPage();
    let url = interaction.options.getString('url');
        if (!url.startsWith('http://') && !url.startsWith('https://')) { url = `http://${url}`; }
    const reso = interaction.options.getString('resolution');
        
    switch (reso) {
        case '1366x768': {await page.setViewport({width: 1366, height: 768})} break;
        case '1920x1080': {await page.setViewport({width: 1920, height: 1080})} break;
    }

        try {
            interaction.reply({ content: 'Taking screenshot, please wait... The image will be delivered to your DM when done', ephemeral: true });
            await page.goto(url, {waitUntil: "networkidle2"});
            const layar = await page.screenshot();
            const attachment = new AttachmentBuilder()
        		.setFile(layar)
        		.setName('image.png');  
    	    const hasil = new EmbedBuilder()
        		.setAuthor({ name: 'Web Screenshot', iconURL: 'https://cdn.discordapp.com/icons/1215235509958479894/a_bf57de62bf8946e925e18abd9f761330.gif' })
        		.setDescription(`Web: \`\`${url}\`\`
Resolution: \`\`${reso}\`\``)
        		.setImage(`attachment://image.png`)
        		.setColor(config.embed.color)
        		.setTimestamp();
    await interaction.member.send({ content: '', embeds: [hasil], files: [{attachment: layar, name: `image.png` }] });
        } catch (e) {
            console.log(e);
            interaction.followUp({ content: `⚠️Error : \`\`Only support http/https protocol\`\``, ephemeral: true });
        } finally {
      await browser.close();
    }
    }
}

