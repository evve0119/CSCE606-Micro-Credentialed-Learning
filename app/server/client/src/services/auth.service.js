import axios from "axios";
import jwt_decode from "jwt-decode";
const API_URL = "http://localhost:8080/api/user";
// const API_URL = "/api/user";

class AuthService {
  //login function
  login(email, password, role) {
    return axios.post(API_URL + "/login", { email, password, role });
  }
  //logout function
  logout() {
    // While sending http request without user, there is no jwt token, which lead to logout
    localStorage.removeItem("user");
  }
  //register function
  register(username, email, password, role, firstname, lastname) {
    return axios.post(API_URL + "/register", {
      username,
      email,
      password,
      role,
      profile: {
        firstname,
        lastname
      }
    });
  }
  
  getCurrentRole() {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      return jwt_decode(user.token).role;
    }
    else {
      return null;
    }
  }
}



export default new AuthService();
