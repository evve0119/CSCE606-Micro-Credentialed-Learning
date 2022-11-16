const Job = require("../models").Job;

module.exports.renderJobPage = async (req, res) => {
    try {
        const currentJob = await Job.findById(req.params.id).populate("holder");
        return res.send(currentJob);
    } catch (err) {
        return res.status(404).send("Job does not exist");
    }
};

module.exports.renderAllJob = async (req, res) => {
    try {
        const jobs = await Job.find({}).populate("holder");
        return res.send(jobs);
    } catch (err) {
        return res.status(404).send("Job does not exist");
    }
};

module.exports.searchJobByTitle = async (req, res) => {
    try {
        const jobs = await Job.find({ name: { $regex: req.body.searchedJobs, $options: 'i' } }).populate("holder"); // regex to search, option i means uppercase and lowercase are allowed
        return res.send(jobs);
    } catch (err) {
        return res.status(400).send("Jobs not found!!");
    }
};