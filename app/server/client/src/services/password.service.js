import axios from "axios";
const API_URL = "http://localhost:8080/api/user";

// const API_URL = "/api/user";

class PasswordService {
  //login function
  forgot(email) {
    return axios.post(API_URL + "/forgot", {email});
  }

  resetPassword(newPassword, confirmPassword, id, token){
    return axios.post(API_URL + "/resetPassword", {newPassword, confirmPassword, id, token});
  }

}



export default new PasswordService();
