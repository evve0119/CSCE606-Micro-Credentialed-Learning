const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");


const userSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
        unique: true
    },
    credentials:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Credential"
    }]
});
userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("User",userSchema);