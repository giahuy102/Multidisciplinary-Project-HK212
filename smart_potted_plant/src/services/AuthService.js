
import axios from 'axios';
const API_URL = "http://localhost:3001/api/user/";

// import { useNavigate } from "react-router-dom";

const AuthService = function() {
    // let navigate = useNavigate();
    this.register = (username, email, password) => {
        return axios.post(API_URL + 'register', {
            username,
            email, 
            password
        });
    }

    this.login = (email, password) => {
        return axios.post(API_URL + 'login', {
            email, 
            password
        })
    } 
}

export default new AuthService();