import axios from "axios";
const API_URL = "http://localhost:8080/api/students";


class StudentService {
    // get all groups function
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

    //get group info function
    renderGroupForm(_id, group_id) {
        let token;
        if (localStorage.getItem("user")) {
            token = JSON.parse(localStorage.getItem("user")).token;
        } else {
            token = "";
        }
        return axios.get(API_URL + "/myHomePage/" + _id + "/" + group_id, {
            headers: {
                Authorization: token,
            },
        });
    }

    //update group
    updateGroup(_id, editCredentials, group_id, newGroupName) {
        let token;
        if (localStorage.getItem("user")) {
            token = JSON.parse(localStorage.getItem("user")).token;
        } else {
            token = "";
        }
        return axios.put(API_URL + "/myHomePage/" + _id + "/" + group_id,
            { editCredentials, newGroupName },
            {
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
            API_URL + "/myHomePage/" + _id,
            { groupName, addCredentials },
            {
                headers: {
                    Authorization: token,
                },
            }
        );
    }

    // add credential function
    //   addCredential(credentialName, _id) {
    //     let token;
    //     if (localStorage.getItem("user")) {
    //       token = JSON.parse(localStorage.getItem("user")).token;
    //     } else {
    //       token = "";
    //     }
    //     return axios.post(
    //       API_URL + "/allCredentials/" + _id,
    //       { credentialName },
    //       {
    //         headers: {
    //           Authorization: token,
    //         },
    //       }
    //     );
    //   }
    // get all crendentials function
    renderAllCredentials(_id) {
        let token;
        if (localStorage.getItem("user")) {
            token = JSON.parse(localStorage.getItem("user")).token;
        } else {
            token = "";
        }
        return axios.get(API_URL + "/allCredentials/" + _id, {
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
}



export default new StudentService();
