import axios from "axios";
const API_URL = "http://localhost:8080/api/instructors";
// const API_URL = "/api/instructors";

class InstructorService {
    renderMyHomePage(_id) {
        let token;
        if (localStorage.getItem("user")) {
            token = JSON.parse(localStorage.getItem("user")).token;
        } else {
            token = "";
        }
        return axios.get(API_URL + "/myHomePage/" + _id, {
            headers: {
                Authorization: token,
            },
        });
    }
    createNewCourse(courseName, description, addStudentsId, _id){
        let token;
        if (localStorage.getItem("user")) {
            token = JSON.parse(localStorage.getItem("user")).token;
        } else {
            token = "";
        }
        return axios.post(
            API_URL + "/myHomePage/" + _id,
            { courseName, description, addStudentsId },
            {
                headers: {
                    Authorization: token,
                },
            }
        );
    }
}

export default new InstructorService();
