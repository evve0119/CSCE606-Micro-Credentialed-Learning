const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
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
    students: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    description: String
});

module.exports.Course = mongoose.model("Course", courseSchema);

