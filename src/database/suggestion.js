const { model, Schema } = require("mongoose");

module.exports = model('botSuggestion', new Schema({
    GuildID: String,
    ChannelID: String
}))