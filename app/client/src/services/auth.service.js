import axios from "axios";
const API_URL = "http://localhost:8080/api/user";


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
  register(username, email, password, role) {
    return axios.post(API_URL + "/register", {
      username,
      email,
      password,
      role,
    });
  }
  //get current user function
  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }
}



export default new AuthService();
