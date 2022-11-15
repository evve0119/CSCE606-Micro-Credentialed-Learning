const Job = require("../models").Job;

module.exports.renderJobPage = async (req, res) => {
    try{
        const currentJob = await Job.findById(req.params.id).populate("holder");
        return res.send(currentJob);
    } catch(err){
        return res.status(404).send("Job does not exist");
    }
};

module.exports.renderAllJob = async (req, res) => {
    try{
        const jobs = await Job.find({}).populate("holder");
        return res.send(jobs);
    } catch(err){
        return res.status(404).send("Job does not exist");
    }
};