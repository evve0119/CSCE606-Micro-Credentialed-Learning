import axios from "axios";
const API_URL = "http://localhost:8080/api/students";
// const API_URL = "/api/students";

class StudentService {
    // get student profile, group, resume
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

    //add new group function
    createNewGroup(groupName, addCredentials, _id) {
        let token;
        if (localStorage.getItem("user")) {
            token = JSON.parse(localStorage.getItem("user")).token;
        } else {
            token = "";
        }
        return axios.post(
            API_URL + "/groups/new/" + _id,
            { groupName, addCredentials },
            {
                headers: {
                    Authorization: token,
                },
            }
        );
    }

    //get group info function
    renderGroupForm(_id, groupId) {
        let token;
        if (localStorage.getItem("user")) {
            token = JSON.parse(localStorage.getItem("user")).token;
        } else {
            token = "";
        }
        return axios.get(API_URL + "/groups/" + _id + "/" + groupId, {
            headers: {
                Authorization: token,
            },
        });
    }

    //update group
    updateGroup(_id, editCredentials, groupId, newGroupName) {
        let token;
        if (localStorage.getItem("user")) {
            token = JSON.parse(localStorage.getItem("user")).token;
        } else {
            token = "";
        }
        return axios.put(API_URL + "/groups/" + _id + "/" + groupId,
            { editCredentials, newGroupName },
            {
                headers: {
                    Authorization: token,
                },
            });
    };

    deleteGroup(_id, groupId) {
        let token;
        if (localStorage.getItem("user")) {
            token = JSON.parse(localStorage.getItem("user")).token;
        } else {
            token = "";
        }
        return axios.delete(API_URL + "/groups/" + _id + "/" + groupId,
            {
                headers: {
                    Authorization: token,
                },
            });
    }

    renderAllCredentials(_id) {
        let token;
        if (localStorage.getItem("user")) {
            token = JSON.parse(localStorage.getItem("user")).token;
        } else {
            token = "";
        }
        return axios.get(API_URL + "/credentials/" + _id, {
            headers: {
                Authorization: token,
            },
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
    renderProfileForm(_id) {
        let token;
        if (localStorage.getItem("user")) {
            token = JSON.parse(localStorage.getItem("user")).token;
        } else {
            token = "";
        }
        return axios.get(API_URL + "/intro/" + _id, {
            headers: {
                Authorization: token,
            },
        });
    }

    // update profile
    updateProfile(_id, editProfile) {
        let token;
        if (localStorage.getItem("user")) {
            token = JSON.parse(localStorage.getItem("user")).token;
        } else {
            token = "";
        }
        return axios.put(API_URL + "/intro/" + _id ,
            { editProfile },
            {
                headers: {
                    Authorization: token,
                },
            });
    }

    //add new resume
    createNewResume(resumeName, addProfile, addCredentials, _id) {
        let token;
        if (localStorage.getItem("user")) {
            token = JSON.parse(localStorage.getItem("user")).token;
        } else {
            token = "";
        }
        return axios.post(
            API_URL + "/resumes/new/" + _id,
            { resumeName, addProfile, addCredentials },
            {
                headers: {
                    Authorization: token,
                },
            }
        );
    }

    //get resume info
    renderResumeForm(_id, resumeId) {
        let token;
        if (localStorage.getItem("user")) {
            token = JSON.parse(localStorage.getItem("user")).token;
        } else {
            token = "";
        }
        return axios.get(API_URL + "/resumes/" + _id + "/" + resumeId, {
            headers: {
                Authorization: token,
            },
        });
    }

    //update resume
    updateResume(resumeName, addProfile, addCredentials, _id, resumeId) {
        let token;
        if (localStorage.getItem("user")) {
            token = JSON.parse(localStorage.getItem("user")).token;
        } else {
            token = "";
        }
        return axios.put(API_URL + "/resumes/" + _id + "/" + resumeId,
            { resumeName, addProfile, addCredentials },
            {
                headers: {
                    Authorization: token,
                },
            });
    }

    deleteResume(_id, resumeId) {
        let token;
        if (localStorage.getItem("user")) {
            token = JSON.parse(localStorage.getItem("user")).token;
        } else {
            token = "";
        }
        return axios.delete(API_URL + "/resumes/" + _id + "/" + resumeId,
            {
                headers: {
                    Authorization: token,
                },
            });
    }

    submitResume(_id, resumeId, jobId){
        let token;
        if (localStorage.getItem("user")) {
            token = JSON.parse(localStorage.getItem("user")).token;
        } else {
            token = "";
        }
        return axios.post(API_URL + `/application/${_id}`,
        { resumeId, jobId}, 
        {
            headers: {
                Authorization: token,
            },
        });
    }
}



export default new StudentService();
