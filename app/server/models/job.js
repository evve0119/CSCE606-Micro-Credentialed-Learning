const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 50,
    },
    holder: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    description: String
});

module.exports.Job = mongoose.model("Job", jobSchema);