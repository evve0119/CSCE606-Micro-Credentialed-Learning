const mongoose = require("mongoose");
const Schema = mongoose.Schema; 

const credentialSchema = new Schema({
    name: String,
    holder:{
        type: Schema.Types.ObjectId,
        ref: "User"
    }
});

module.exports = mongoose.model("Credential",credentialSchema);