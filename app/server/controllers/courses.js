const User = require("../models").User;
const Course = require("../models").Course;
const Credential = require("../models").Credential;

module.exports.renderCoursePage = async (req, res) => {
    try{
        console.log(req.params.id);
        const currentCourse = await Course.findById(req.params.id).populate("holder");
        return res.send(currentCourse);
    } catch(err){
        return res.status(404).send("Course does not exist");
    }
};