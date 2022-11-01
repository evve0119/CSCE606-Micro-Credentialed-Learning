import axios from "axios";
const API_URL = "http://localhost:8080/api/courses";
// const API_URL = "/api/courses";

class CourseService {
    renderCourseForm(courseId) {
        let token;
        if (localStorage.getItem("user")) {
            token = JSON.parse(localStorage.getItem("user")).token;
        } else {
            token = "";
        }
        return axios.get(API_URL + "/" + courseId + "/sendCredential", {
            headers: {
                Authorization: token,
            },
        });
    }
};

export default new CourseService();
