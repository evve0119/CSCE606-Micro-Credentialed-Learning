const User = require("../models").User;
const Job = require("../models").Job;
const Resume = require("../models").Resume;

module.exports.myHomePage = async (req, res) => {
    try{
        const currentRecruiter = await User.findById(req.user._id).populate("jobs");
        if (!currentRecruiter.isRecruiter()) {
            return res.status(403).send("You are not a recruiter");
        }
        return res.send(currentRecruiter);
    } catch(err){
        return res.status(400).send("Error!! Cannot get myHomePage!!");
    }
};


module.exports.createNewJob = async (req, res) => {
    try {
        const currentRecruiter = await User.findById(req.user._id);
        if (!currentRecruiter.isRecruiter()) {
            return res.status(403).send("You are not a recruiter");
        }
        const { jobName, description } = req.body;
        const currentJob = new Job({ name: jobName, holder: req.user._id, description: description });
        await currentJob.save();
        currentRecruiter.jobs.push(currentJob._id);
        await currentRecruiter.save();
        return res.send("Successfully add new job");

    } catch (err) {
        return res.status(400).send("Failed to create");
    }
};

module.exports.renderJobForm = async (req, res) => {
    try{
        const currentJob = await Job.findById(req.params.jobId).populate("holder").populate("resumes");
        if(req.user._id != currentJob.holder._id.toString()){
            return res.status(403).send("You are not authorized");
        }
        return res.send(currentJob);
    } catch(err){
        return res.status(400).send("Job does not exist");
    }
};

module.exports.updateJob = async (req, res) => {
    try{
        const currentJob = await Job.findById(req.params.jobId);
        if(req.user._id != currentJob.holder._id.toString()){
            return res.status(400).send("You are not authorized");
        }
        await currentJob.update({ $set: { name: req.body.jobName, description: req.body.jobDescription } });
        await currentJob.save();
        return res.send("Successfully update!!!");
    } catch(err){
        return res.status(400).send("Update failed");
    }
};

module.exports.deleteJob = async (req, res) => {
    try{
        const currentJob = await Job.findById(req.params.jobId);
        if(req.user._id != currentJob.holder._id.toString()){
            return res.status(400).send("You are not authorized");
        }
        const currentRecruiter = User.findById(currentJob.holder._id);
        await currentRecruiter.update({ $pull: { jobs: currentJob._id } });
        await Job.findByIdAndDelete(req.params.jobId);
        return res.send("Successfully delete!!!");
    } catch(err){
        return res.status(404).send("Delete fail!");
    }
};

module.exports.renderResume = async (req, res) => {
    try{
        console.log(req.params.resumeId);
        const currentResume = await Resume.findById(req.params.resumeId).populate("credentials");
        return res.send(currentResume);
    } catch(err){
        return res.status(400).send("Resume does not exist");
    }
};

module.exports.renderProfileForm = async (req, res) => {
    try{
        const currentRecruiter = await User.findById(req.user._id);
        if (!currentRecruiter.isRecruiter()) {
            return res.status(403).send("You are not a recruiter");
        }
        return res.send(currentRecruiter);
    } catch (err) {
        return res.status(400).send("Error!! Cannot get profile!!");
    }

};

module.exports.updateProfile = async (req, res) => {
    try {
        const currentRecruiter = await User.findById(req.user._id);
        if (!currentRecruiter.isRecruiter()) {
            return res.status(403).send("You are not a recruiter");
        }
        await currentRecruiter.update({ $set: { company: req.body.editCompany, profile: req.body.editProfile } });
        return res.send("Successfully update!!!");
    } catch(err){
        return res.status(400).send("Error!! Cannot update profile!!");
    }
};

