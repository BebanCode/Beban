const { SlashCommandBuilder, PermissionFlagsBits, AttachmentBuilder, EmbedBuilder } = require("discord.js");
const { Prodia } = require("prodia.js");
const config = require("../../config")
const prodia = new Prodia(config.client.prodiakey);
const { generateImage, wait } = new Prodia(config.client.prodiakey);
const { aspectRatio, styles, ai_model, samplers } = require("../../data/choices")


module.exports = {
    data: new SlashCommandBuilder()
     .setName("imagine")
     .setDescription("Convert your imagination to an image.")
     .addStringOption(option => option
       .setName("prompt")
       .setDescription("The text to convert to an image.").setRequired(true))
      .addStringOption(option => option
        .setName("style")
        .setDescription("The style of the image.").setRequired(false)
        .addChoices(styles))
      .addStringOption(option => option
        .setName("aspect_ratio")
        .setDescription("The aspect ratio of the image.").setRequired(false)
        .addChoices(aspectRatio))
      .addStringOption(option => option
        .setName("ai_model")
        .setDescription("Select the ai model to generate the image.").setRequired(false)
        .addChoices(ai_model))
      .addStringOption(option => option
        .setName("sampler")
        .setDescription("Select the sampler to generate the image.").setRequired(false)
        .addChoices(samplers)),
      
  
    async execute(interaction, member) {
      await interaction.deferReply();
      const text = interaction.options.getString("prompt");
      const style_preset = interaction.options.getString("style");
      const aspect_ratio = interaction.options.getString("aspect_ratio");
      const model = interaction.options.getString("ai_model")
      const sampler = interaction.options.getString("sampler")
      const cfg_scale = interaction.options.getString("cfg_scale")
      const steps = interaction.options.getString("steps")
      const result = await prodia.generateImage({
        prompt: text,
        sampler: sampler ? sampler : 'Euler a',
        steps: steps ? steps : 20,
        cfg_scale: cfg_scale ? cfg_scale : 7  ,
        model: model ? model: 'elldreths-vivid-mix.safetensors [342d9d26]',
        aspect_ratio: aspect_ratio ? aspect_ratio : 'square'
      })
      await interaction.editReply({ content: "Please wait while the image is being generated." })
      while (result.status !== "succeeded" && result.status !== "failed") {
        new Promise((resolve) => setTimeout(resolve, 250));

        const job = await prodia.getJob(result.job);

        if (job.status === "succeeded") {
            return interaction.editReply(job.imageUrl);
        } 
        if (job.status === "failed") {
            return interaction.followUp("Failed to generate image.")
        }
    } 
  }
}
