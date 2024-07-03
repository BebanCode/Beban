const { model, Schema } = require("mongoose");

module.exports = model('botFeedback', new Schema({
    GuildID: String,
    ChannelID: String
}))