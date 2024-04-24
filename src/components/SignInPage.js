import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './SignInPage.css';
import UserContext from '../context/UserContext'; 
import Button from './Button';
import { Link } from 'react-router-dom';


const SignInPage = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const { setUserData } = useContext(UserContext);
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const signIn = async (e) => {
        e.preventDefault();
        if (formData.username === '' || formData.password === '') {
            setErrorMessage('Please enter both username and password.');
            return;
        }

        try {
            const response = await axios.post('/api/users/login', formData);
            setUserData({
                token: response.data.token,
                user: response.data.user
            });
            localStorage.setItem('auth-token', response.data.token);
            navigate('/'); // Redirect to home page after login
        } catch (error) {
            if (error.response) {
                setErrorMessage(error.response.data.msg);
            } else {
                setErrorMessage('An error occurred during sign in.');
            }
        }
    };

    return (
        <div className="sign-in-page">
            <img className="image" src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fdiscoverycollege.co.uk%2Fwp-content%2Fuploads%2F2018%2F08%2Fsport_btec_discovery6.jpg&f=1&nofb=1" alt="Person running" />
            <div className="sign-in-section">
                <h3>Please enter your username and password</h3>
                <form onSubmit={signIn}>
                    <label htmlFor="username">Username:</label><br />
                    <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} /><br /><br />

                    <label htmlFor="password">Password:</label><br />
                    <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} /><br /><br />

                    {errorMessage && <div className="error-message">{errorMessage}</div>}

                    <Button width='150px' height='75px' type="submit">Sign in</Button>
                </form><br /><br /><br />

                <h3>Don't have an account?</h3>
                <div className='signup'>
                    <Link to="/signup">Sign Up!</Link>
                </div>
            </div>
        </div>
    );
};

export default SignInPage;
