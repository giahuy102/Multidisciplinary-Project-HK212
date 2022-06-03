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


    // this.getUser = async(token) => {
    //     return axios.post(API_URL + 'get_user', {
    //         token
    //     })
    // }

    this.getUser = () => {
        return localStorage.getItem('user');
    }
}

export default new AuthService();