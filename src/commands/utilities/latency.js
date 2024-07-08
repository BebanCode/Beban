const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require("discord.js");
const config = require("../../config");

const EMOJI_BAGUS = "🟢";
const EMOJI_OKAY = "🟡";
const EMOJI_JELEK = "🔴";

const MILLISECONDS_PER_SECOND = 1000;
const MILLISECONDS_PER_MINUTE = 60 * MILLISECONDS_PER_SECOND;
const MILLISECONDS_PER_HOUR = 60 * MILLISECONDS_PER_MINUTE;
const MILLISECONDS_PER_DAY = 24 * MILLISECONDS_PER_HOUR;

module.exports = {
  data: new SlashCommandBuilder()
   .setName("ping")
   .setDescription("Check the bot's latency")
   .setDefaultMemberPermissions(PermissionFlagsBits.SendMessages),

  async execute(interaction) {
    try {
      await interaction.deferReply();

      const pinging = await interaction.editReply({ content: "Pinging..." });
      const ws = interaction.client.ws.ping;
      const msgEdit = Date.now() - pinging.createdTimestamp;

      const uptime = calculateUptime(interaction.client.uptime);
      const wsEmoji = getLatencyEmoji(ws);
      const msgEmoji = getLatencyEmoji(msgEdit);

      const pingEmbed = createPingEmbed(ws, msgEdit, uptime, wsEmoji, msgEmoji);
      await pinging.edit({ embeds: [pingEmbed], content: "\u200b" });
    } catch (error) {
      console.error(error);
      await interaction.reply({ content: "Error: Unable to ping", ephemeral: true });
    }
  },
};

function calculateUptime(uptime) {
  const days = Math.floor(uptime / MILLISECONDS_PER_DAY);
  const hours = Math.floor((uptime % MILLISECONDS_PER_DAY) / MILLISECONDS_PER_HOUR);
  const minutes = Math.floor((uptime % MILLISECONDS_PER_HOUR) / MILLISECONDS_PER_MINUTE);
  const seconds = Math.floor((uptime % MILLISECONDS_PER_MINUTE) / MILLISECONDS_PER_SECOND);

  return { days, hours, minutes, seconds };
}

function getLatencyEmoji(latency) {
  if (latency <= 100) return EMOJI_BAGUS;
  if (latency <= 200) return EMOJI_OKAY;
  return EMOJI_JELEK;
}

function createPingEmbed(ws, msgEdit, uptime, wsEmoji, msgEmoji) {
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
        value: `⏳ \`${uptime.days} days, ${uptime.hours} hours, ${uptime.minutes} minutes, ${uptime.seconds} seconds\``,
      }
    );

  return pingEmbed;
}
