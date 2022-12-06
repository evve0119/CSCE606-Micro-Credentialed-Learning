import axios from "axios";
const API_URL = "http://localhost:8080/api/jobs";
// const API_URL = "/api/jobs";

class JobService {
    renderJobPage(jobId) {
        let token;
        if (localStorage.getItem("user")) {
            token = JSON.parse(localStorage.getItem("user")).token;
        } else {
            token = "";
        }
        return axios.get(API_URL + "/" + jobId, {
            headers: {
                Authorization: token,
            },
        });
    }

    renderAllJob(){
        let token;
        if (localStorage.getItem("user")) {
            token = JSON.parse(localStorage.getItem("user")).token;
        } else {
            token = "";
        }
        return axios.get(API_URL, {
            headers: {
                Authorization: token,
            },
        });
    }

    searchJobByTitle(searchedJobs){
        let token;
        if (localStorage.getItem("user")) {
            token = JSON.parse(localStorage.getItem("user")).token;
        } else {
            token = "";
        }
        return axios.post(API_URL + "/search",
            {searchedJobs},
            {
            headers: {
                Authorization: token,
            },
        });
    }
};

export default new JobService();
