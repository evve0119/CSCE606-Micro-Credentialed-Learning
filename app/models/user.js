const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const groupSchema = new mongoose.Schema({
    name: String,
    credentials:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Credential"
    }],
    holder:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
});

const userSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
        unique: true
    },
    credentials:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Credential"
    }],
    groups:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Group"
    }]
});
// module.exports.Group = mongoose.model("Group",groupSchema) must be before userSchema.plugin(passportLocalMongoose);
module.exports.Group = mongoose.model("Group",groupSchema);

userSchema.plugin(passportLocalMongoose);
module.exports.User = mongoose.model("User",userSchema);
