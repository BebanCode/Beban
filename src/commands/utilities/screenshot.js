const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder, AttachmentBuilder } = require("discord.js");
const puppeteer = require("puppeteer");
const config = require("../../config");
const urlValidator = require("url-validator");

module.exports = {
  data: new SlashCommandBuilder()
   .setName("screenshot")
   .setDescription("Take a screenshot of a web.")
   .setDefaultMemberPermissions(PermissionFlagsBits.SendMessages)
   .addStringOption((option) => option
     .setName('url')
     .setDescription('The web you want to take a screenshot from.')
     .setRequired(true))
   .addStringOption((option) => option
     .setName('resolution')
     .setDescription('The screenshot resolution.')
     .setRequired(true)
     .addChoices(
        { name: '1366x768', value: '1366x768' },
        { name: '1920x1080', value: '1920x1080' },
      )),

  async execute(interaction, client) {
    const browser = await puppeteer.launch({
      args: ['--no-sandbox'],
    });
    const page = await browser.newPage();

    let url = interaction.options.getString('url');
    if (!url.startsWith('http://') &&!url.startsWith('https://')) {
      url = `http://${url}`;
    }

    if (!urlValidator.isValid(url)) {
      interaction.reply({ content: 'Invalid URL', ephemeral: true });
      return;
    }

    const reso = interaction.options.getString('resolution');

    switch (reso) {
      case '1366x768': {
        await page.setViewport({ width: 1366, height: 768 });
      } break;
      case '1920x1080': {
        await page.setViewport({ width: 1920, height: 1080 });
      } break;
      default: {
        interaction.reply({ content: 'Invalid resolution', ephemeral: true });
        return;
      }
    }

    try {
      interaction.reply({ content: 'Taking screenshot, please wait... The image will be delivered to your DM when done', ephemeral: true });
      await page.goto(url, { waitUntil: "networkidle2", timeout: 30000 }); // 30 second timeout
      const screenshot = await page.screenshot();
      const attachment = new AttachmentBuilder()
       .setFile(screenshot)
       .setName('image.png');
      const embed = new EmbedBuilder()
       .setAuthor({ name: 'Web Screenshot', iconURL: 'https://cdn.discordapp.com/icons/1215235509958479894/a_bf57de62bf8946e925e18abd9f761330.gif' })
       .setDescription(`Web: \`\`${url}\`\``
          + `\nResolution: \`\`${reso}\`\``)
       .setImage(`attachment://image.png`)
       .setColor(config.embed.color)
       .setTimestamp();
      await interaction.member.send({ content: '', embeds: [embed], files: [{ attachment: screenshot, name: `image.png` }] });
    } catch (e) {
      console.log(e);
      interaction.followUp({ content: `⚠️Error: ${e.message}`, ephemeral: true });
    } finally {
      await browser.close();
    }
  }
}
