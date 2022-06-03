import React, { useState } from "react";
import './style.css'

import AuthService from '../../services/AuthService';
import { useNavigate } from "react-router-dom";

function Login() {
    let navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [successful, setSuccessful] = useState(true);
    const [message, setMessage] = useState('');

    const handleLogin = (event) => {
        event.preventDefault();
        AuthService.login(
            email, password
        ).then(response => {
            if (response.data.accessToken) {
                taojj
            }
            navigate('/');
            console.log(response.data);
        }).catch(err => { 
            // console.log(4);
            setSuccessful(false);
            setMessage(err.response.data);
            console.log(err.response.data);
        })
    }

    return (
        <div>
            <form>
                <label>
                    Email:
                    <input type='email' onChange={ (event) => setEmail(event.target.value) }></input>
                </label>
                <label>
                    Password:
                    <input type='password' onChange={ (event) => setPassword(event.target.value) }></input>
                </label>
                <div>
                    <button className='btn btn-primary' type='submit' onClick={ handleLogin }>Login</button>
                </div>
            </form>
            {
                !successful &&
                <div className="alert alert-danger" role="alert">
                    { message }
                </div>
            }
            
        </div>
        
    );
}

export default Login;