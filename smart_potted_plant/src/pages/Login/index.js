import React, { useEffect, useState } from "react";
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
                localStorage.setItem("user", JSON.stringify(response.data));
            }
            // navigate('/', {replace: true});
            window.location.href = '/';
            console.log(response.data);
        }).catch(err => { 
            // console.log(4);
            setSuccessful(false);
            setMessage(err.response.data);
            console.log(err.response.data);
        })
    }


    return (
        <div className="wrapper-container">
            <form className="form">
                <div className="mb-3">
                    <label htmlFor='email' className="form-label">Email address</label>
                    <input className="form-control" id="email" type='email' onChange={ (event) => setEmail(event.target.value) }></input>
                </div>

                <div className="mb-3">
                    <label htmlFor='password' className="form-label">Password</label>
                    <input className="form-control" id="password" type='password' onChange={ (event) => setPassword(event.target.value) }></input>
                </div>
                <div style={{marginBottom: '20px'}}>   
                    <small id="register-navigate" className="form-text text-muted">
                        Don't have an account.   
                        <a href="#" onClick={ (event) => navigate('/register') } > Register here</a> 
                    </small>
                </div>
                <button className='btn btn-primary my-btn' type='submit' onClick={ handleLogin }>Login</button>
            </form>
            {
                !successful &&
                <div className="alert alert-danger my-alert" role="alert">
                    { message }
                </div>
            }
            
        </div>
        
    );
}

export default Login;