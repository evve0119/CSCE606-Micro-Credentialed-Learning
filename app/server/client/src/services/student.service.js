import axios from "axios";
const API_URL = "http://localhost:8080/api/students";
// const API_URL = "/api/students";

class StudentService {
  // get student profile, group, resume
  renderMyHomePage() {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }
    return axios.get(API_URL + "/home", 
      {headers: {Authorization: token}}
    );
  }

  //add new group function
  createNewGroup(groupName, addCredentials) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }
    return axios.post(API_URL + "/groups/new",
      {groupName, addCredentials},
      {headers: {Authorization: token}}
    );
  }

  //get group info function
  renderGroupForm(groupId) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }
    return axios.get(API_URL + `/groups/${groupId}`, 
      {headers: {Authorization: token}}
    );
  }

  //update group
  updateGroup(editCredentials, groupId, newGroupName) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }
    return axios.put(API_URL + `/groups/${groupId}`,
      {editCredentials, newGroupName},
      {headers: {Authorization: token}}
    );
  };

  deleteGroup(groupId) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }
    return axios.delete(API_URL + `/groups/${groupId}`,
      {headers: {Authorization: token}}
    );
  }

  renderAllCredentials() {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }
    return axios.get(API_URL + "/credentials", {
        headers: {Authorization: token},
    });
  }

  searchStudentbyEmail(studentEmail){
      let token;
      if (localStorage.getItem("user")) {
          token = JSON.parse(localStorage.getItem("user")).token;
      } else {
          token = "";
      }
      return axios.post(
          API_URL + "/search",
          { studentEmail },
          {
              headers: {
                  Authorization: token,
              },
          }
      );
  }

  // get profile information
  renderProfileForm() {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }
    return axios.get(API_URL + "/intro", 
      {headers: {Authorization: token}}
    );
  }

  // update profile
  updateProfile(editProfile) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }
    return axios.put(API_URL + "/intro",
      {editProfile},
      {headers: {Authorization: token}}
    );
  }

  //add new resume
  createNewResume(resumeName, addProfile, addCredentials) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }
    return axios.post(API_URL + "/resumes/new",
      {resumeName, addProfile, addCredentials},
      {headers: {Authorization: token}}
    );
  }

  //get resume info
  renderResumeForm(resumeId) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }
    return axios.get(API_URL + `/resumes/${resumeId}`, 
      {headers: {Authorization: token}}
    );
  }

  //update resume
  updateResume(resumeName, addProfile, addCredentials, resumeId) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }
    return axios.put(API_URL + `/resumes/${resumeId}`,
      {resumeName, addProfile, addCredentials},
      {headers: {Authorization: token}}
    );
  }

  deleteResume(resumeId) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }
    return axios.delete(API_URL + `/resumes/${resumeId}`,
      {headers: {Authorization: token}}
    );
  }

  submitResume(resumeId, jobId){
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }
    return axios.post(API_URL + "/application",
      {resumeId, jobId}, 
      {headers: {Authorization: token}}
    );
  }
}

export default new StudentService();