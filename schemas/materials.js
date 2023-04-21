const { model, Schema } = require("mongoose")

module.exports = model("Materials", new Schema({
	User: String,
	Resources: Array,
	Cash: Number,
	Levels: Number
}), "Materials")