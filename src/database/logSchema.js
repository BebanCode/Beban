const { Schema, model } = require("mongoose");
const logSchema = new Schema({
  _id: Schema.Types.ObjectId,
  guildId: String,
  channelId: String,
});

module.exports = model("modSchema", logSchema, "serverModlogs");