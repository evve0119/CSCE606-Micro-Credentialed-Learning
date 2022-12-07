import axios from "axios";
const API_URL = "http://localhost:8080/api/instructors";
// const API_URL = "/api/instructors";

class InstructorService {

  renderMyHomePage() {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }
    return axios.get(API_URL + "/home/",
      {headers: {Authorization: token}}
    );
  }

  createNewCourse(courseName, description, addStudentsId) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }
    return axios.post(API_URL + "/courses/new",
      { courseName, description, addStudentsId },
      {headers: {Authorization: token}}
    );
  }

  renderSendCredentialForm(courseId) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }
    return axios.get(API_URL + `/courses/${courseId}/sendCredential`,
     {headers: {Authorization: token}}
    );
  }

  sendCredential(courseId, addStudents) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }
    return axios.post(API_URL + `/courses/${courseId}/sendCredential`,
      { addStudents },
      {headers: {Authorization: token}}
    );
  }

  renderCourseForm(courseId) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }
    return axios.get(API_URL + `/courses/${courseId}/edit`,
      {headers: {Authorization: token}}
    );
  }

  updateCourse(courseId, courseName, description, addStudentsId) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }
    return axios.put(API_URL + `/courses/${courseId}/edit`,
      {courseName, description, addStudentsId},
      {headers: {Authorization: token}}
    );
  }

  deleteCourse(courseId) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }
    return axios.delete(API_URL + `/courses/${courseId}/edit`,
      {headers: {Authorization: token}}
    );
  }

  renderProfileForm() {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }
    return axios.get(API_URL + "/intro/",
      {headers: {Authorization: token}}
    );
  }

  // update profile
  updateProfile(editProfile, editInstitute) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }
    return axios.put(API_URL + "/intro/",
      { editProfile, editInstitute },
      {headers: {Authorization: token}}
    );
  }
}

export default new InstructorService();
