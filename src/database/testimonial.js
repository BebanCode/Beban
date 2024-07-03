const { model, Schema } = require("mongoose");

module.exports = model('botTestimonial', new Schema({
    GuildID: String,
    ChannelID: String
}))