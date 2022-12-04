import axios from "axios";
const API_URL = "http://localhost:8080/api/recruiters";

class RecruiterService {

    renderMyHomePage() {
        let token;
        if (localStorage.getItem("user")) {
            token = JSON.parse(localStorage.getItem("user")).token;
        } else {
            token = "";
        }
        return axios.get(API_URL + "/home", {
            headers: {
                Authorization: token,
            },
        });
    }

    createNewJob(jobName, description) {
        let token;
        if (localStorage.getItem("user")) {
            token = JSON.parse(localStorage.getItem("user")).token;
        } else {
            token = "";
        }
        return axios.post(API_URL + "/jobs/new",
            { jobName, description },
            {
                headers: {
                    Authorization: token,
                },
            }
        );
    }

    renderJobForm(jobId) {
        let token;
        if (localStorage.getItem("user")) {
            token = JSON.parse(localStorage.getItem("user")).token;
        } else {
            token = "";
        }
        return axios.get(API_URL + `/jobs/${jobId}/edit`,
            {
                headers: {
                    Authorization: token,
                },
            });
    }

    updateJob(jobId, jobName, jobDescription) {
        let token;
        if (localStorage.getItem("user")) {
            token = JSON.parse(localStorage.getItem("user")).token;
        } else {
            token = "";
        }
        return axios.put(API_URL + `/jobs/${jobId}/edit`,
        {jobName, jobDescription},
        {
            headers: {
                Authorization: token,
            },
        });
    }

    deleteJob(jobId) {
        let token;
        if (localStorage.getItem("user")) {
            token = JSON.parse(localStorage.getItem("user")).token;
        } else {
            token = "";
        }
        return axios.delete(API_URL + `/jobs/${jobId}/edit`,
        {
            headers: {
                Authorization: token,
            },
        });
    }

    renderApplication(jobId){
        let token;
        if (localStorage.getItem("user")) {
            token = JSON.parse(localStorage.getItem("user")).token;
        } else {
            token = "";
        }
        return axios.get(API_URL + `/jobs/${jobId}/applications`,
        {
            headers: {
                Authorization: token,
            },
        });
    }

    renderResume(jobId, resumeId){
        let token;
        if (localStorage.getItem("user")) {
            token = JSON.parse(localStorage.getItem("user")).token;
        } else {
            token = "";
        }
        return axios.get(API_URL + `/jobs/${jobId}/applications/${resumeId}`,
        {
            headers: {
                Authorization: token,
            },
        });
    }

    renderProfileForm() {
        let token;
        if (localStorage.getItem("user")) {
            token = JSON.parse(localStorage.getItem("user")).token;
        } else {
            token = "";
        }
        return axios.get(API_URL + "/intro", {
            headers: {
                Authorization: token,
            },
        });
    }

    // update profile
    updateProfile(editProfile,editCompany) {
        let token;
        if (localStorage.getItem("user")) {
            token = JSON.parse(localStorage.getItem("user")).token;
        } else {
            token = "";
        }
        return axios.put(API_URL + "/intro",
            { editProfile, editCompany },
            {
                headers: {
                    Authorization: token,
                },
            });
    }


}

export default new RecruiterService();
