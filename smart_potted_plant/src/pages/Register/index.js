import React, { useState } from "react";
import './style.css'

import AuthService from '../../services/AuthService';
import { useNavigate } from "react-router-dom";

function Register() {
    let navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [successful, setSuccessful] = useState(true);
    const [message, setMessage] = useState('');

    const handleRegister = (event) => {
        event.preventDefault();
        AuthService.register(
            username, email, password
        ).then(response => {
            setSuccessful(true);
            console.log(response);
            navigate('/login');
        }).catch(err => { 
            // console.log(4);
            setSuccessful(false);
            setMessage(err.response.data);
            console.log(err.response.data);
        })
    }

    return (
        // <div>
        //     <form>
        //         <label>
        //             Email:
        //             <input type='email' onChange={ (event) => setEmail(event.target.value) }></input>
        //         </label>
        //         <label>
        //             Username:
        //             <input type='text' onChange={ (event) => setUsername(event.target.value) }></input>
        //         </label>
        //         <label>
        //             Password:
        //             <input type='password' onChange={ (event) => setPassword(event.target.value) }></input>
        //         </label>
        //         <div>
        //             <button className='btn btn-primary' type='submit' onClick={ handleRegister }>Signup</button>
        //         </div>
        //     </form>
        //     {
        //         !successful &&

        //         <div className="alert alert-danger" role="alert">
        //             { message }
        //         </div>
        //     }
            
        // </div>
        <div className="wrapper-container">
            <form className="form">
                <div className="mb-3">
                    <label for='email' className="form-label">Email address</label>
                    <input className="form-control" id="email" type='email' onChange={ (event) => setEmail(event.target.value) }></input>
                </div>

                <div className="mb-3">
                    <label for='username' className="form-label">Username</label>
                    <input className="form-control" id="username" type='text' onChange={ (event) => setUsername(event.target.value) }></input>
                </div>

                <div className="mb-3">
                    <label for='password' className="form-label">Password</label>
                    <input className="form-control" id="password" type='password' onChange={ (event) => setPassword(event.target.value) }></input>
                </div>
                <button className='btn btn-primary my-btn' type='submit' onClick={ handleRegister }>Register</button>
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

export default Register;