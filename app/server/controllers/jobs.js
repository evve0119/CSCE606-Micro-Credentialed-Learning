const User = require("../models").User;
const Job = require("../models").Job;
const Credential = require("../models").Credential;

module.exports.renderJobPage = async (req, res) => {
    try{
        const currentJob = await Job.findById(req.params.id).populate("holder");
        return res.send(currentJob);
    } catch(err){
        return res.status(404).send("Job does not exist");
    }
};