const { model, Schema } = require("mongoose");

module.exports = model('botGreetings', new Schema({
    GuildID: String,
    ChannelID: String
}))