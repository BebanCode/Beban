const { SlashCommandBuilder, PermissionFlagsBits, AttachmentBuilder, EmbedBuilder } = require("discord.js");
const { Prodia } = require("prodia.js");
const prodia = new Prodia("3236357f-c0b7-44c2-9245-a086b5827ba3");
const { aspectRatio, styles } = require("../../data/choices")


module.exports = {
    data: new SlashCommandBuilder()
     .setName("imagine")
     .setDescription("Convert your imagination to an image.")
     .addStringOption(option => option
       .setName("prompt")
       .setDescription("The text to convert to an image.").setRequired(true))
      .addStringOption(option => option
        .setName("style")
        .setDescription("The style of the image.").setRequired(true)
        .addChoices(styles))
      .addStringOption(option => option
        .setName("aspect_ratio")
        .setDescription("The aspect ratio of the image.").setRequired(true)
        .addChoices(aspectRatio)),
      
  
    async execute(interaction, member) {
      await interaction.deferReply();
      const text = interaction.options.getString("prompt");
      const preset = interaction.options.getString("style");
      const ratio = interaction.options.getString("aspect_ratio");
      const result = await prodia.generateImage({
        prompt: text,
        model: "absolutereality_v181.safetensors [3d9d4d2b]",
        style_preset: preset,
        aspect_ratio: ratio,
      })
      await interaction.editReply({ content: "Please wait while the image is being generated." })
      while (result.status !== "succeeded" && result.status !== "failed") {
        new Promise((resolve) => setTimeout(resolve, 250));

        const job = await prodia.getJob(result.job);

        if (job.status === "succeeded") {
            return interaction.editReply(job.imageUrl);
        }
        if (job.status === "failed") {
            return interaction.editReply("Failed to generate image.")
        }
    } 
  }
}
