import axios from "axios";
const API_URL = "http://localhost:8080/api/recruiters";

class RecruiterService {

    renderMyHomePage(_id) {
        let token;
        if (localStorage.getItem("user")) {
            token = JSON.parse(localStorage.getItem("user")).token;
        } else {
            token = "";
        }
        return axios.get(API_URL + "/home/" + _id, {
            headers: {
                Authorization: token,
            },
        });
    }

    /*
    createNewCourse(courseName, description, addStudentsId, _id) {
        let token;
        if (localStorage.getItem("user")) {
            token = JSON.parse(localStorage.getItem("user")).token;
        } else {
            token = "";
        }
        return axios.post(API_URL + "/courses/new",
            { courseName, description, addStudentsId },
            {
                headers: {
                    Authorization: token,
                },
            }
        );
    }
    */

    createNewJob(jobName, description, _id) {
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

    /*
    renderSendCredentialForm(courseId) {
        let token;
        if (localStorage.getItem("user")) {
            token = JSON.parse(localStorage.getItem("user")).token;
        } else {
            token = "";
        }
        return axios.get(API_URL + "/courses/" + courseId + "/sendCredential", {
            headers: {
                Authorization: token,
            },
        });
    }

    sendCredential(courseId, addStudents) {
        let token;
        if (localStorage.getItem("user")) {
            token = JSON.parse(localStorage.getItem("user")).token;
        } else {
            token = "";
        }
        return axios.post(API_URL + "/courses/" + courseId + "/sendCredential",
            { addStudents },
            {
                headers: {
                    Authorization: token,
                },
            });
    }
    */

    renderJobForm(jobId) {
        let token;
        if (localStorage.getItem("user")) {
            token = JSON.parse(localStorage.getItem("user")).token;
        } else {
            token = "";
        }
        return axios.get(API_URL + "/jobs/" + jobId + "/edit",
            {
                headers: {
                    Authorization: token,
                },
            });
    }

    /*
    updateCourse(courseId, courseName, courseDescription, editStudents) {
        let token;
        if (localStorage.getItem("user")) {
            token = JSON.parse(localStorage.getItem("user")).token;
        } else {
            token = "";
        }
        return axios.put(API_URL + "/courses/" + courseId + "/edit",
            {courseName, courseDescription, editStudents},
            {
                headers: {
                    Authorization: token,
                },
            });
    }
    */

    updateJob(jobId, jobName, jobDescription) {
        let token;
        if (localStorage.getItem("user")) {
            token = JSON.parse(localStorage.getItem("user")).token;
        } else {
            token = "";
        }
        return axios.put(API_URL + "/jobs/" + jobId + "/edit",
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
        return axios.delete(API_URL + "/jobs/" + jobId + "/edit",
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

}

export default new RecruiterService();
