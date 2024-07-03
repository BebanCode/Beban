const { model, Schema } = require("mongoose");

module.exports = model("HistorySchema", new Schema({
    idHistory: Number,
    userId: String,
    product: String,
    amount: Number,
    date: String
}))