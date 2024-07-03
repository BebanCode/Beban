const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require("discord.js");
const config = require("../../config");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Check the bot's latency")
    .setDefaultMemberPermissions(PermissionFlagsBits.SendMessages)
    .setDMPermission(false),
  async execute(interaction) {
    let circles = {
      bagus: "🟢",
      okay: "🟡",
      jelek: "🔴",
    };

    await interaction.deferReply();

    const pinging = await interaction.editReply({ content: "Pinging..."});

    const ws = interaction.client.ws.ping;
    const msgEdit = Date.now() - pinging.createdTimestamp;

    // uptime
    let days = Math.floor(interaction.client.uptime / 86400000);
    let hours = Math.floor(interaction.client.uptime / 3600000) % 24;
    let minutes = Math.floor(interaction.client.uptime / 60000) % 60;
    let seconds = Math.floor(interaction.client.uptime / 1000) % 60;

    const wsEmoji =
      ws <= 100 ? circles.bagus : ws <= 200 ? circles.okay : circles.jelek;
    const msgEmoji = msgEdit <= 200 ? circles.bagus : circles.jelek;

    const pingEmbed = new EmbedBuilder()
      .setColor(config.embed.color)
      .setTimestamp()
      .setFooter({ text: "Pinged At" })
      .addFields(
        {
          name: "Websocket Latency",
          value: `${wsEmoji} \`${ws}ms\``,
        },
        {
          name: "API Latency",
          value: `${msgEmoji} \`${msgEdit}ms\``,
        },
        {
          name: `${interaction.client.user.username} Uptime`,
          value: `⏳ \`${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds\``,
        }
      );

    await pinging.edit({ embeds: [pingEmbed], content: "\u200b" });
  },
};