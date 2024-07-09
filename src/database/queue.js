const { Schema, model } = require("mongoose");
const queueSchema = new Schema({
    GuildID: String,
    ChannelID: String
});

module.exports = model("botQueue", queueSchema, "purchaseQueue");