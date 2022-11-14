////email expire and includes identity information
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tokenSchema = new Schema({
    userId:{
        type: Schema.Types.ObjectId,
        require: true,
        ref: "user",
        unique: true,
    },
    token: {type: String, required: true},
    createAt: {type: Date, default: Date.now(), expires: 3600}, //1 Hour
});

module.exports = mongoose.model("token", tokenSchema);
