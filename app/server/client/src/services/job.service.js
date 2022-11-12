import axios from "axios";
const API_URL = "http://localhost:8080/api/jobs";

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
};

export default new JobService();