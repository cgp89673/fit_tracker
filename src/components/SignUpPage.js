import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './SignUpPage.css';
import Button from './Button';
import UserContext from '../context/UserContext'; // Adjust the path as necessary

const SignUpPage = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [passwordMatch, setPasswordMatch] = useState(true);
    const { setUserData } = useContext(UserContext);
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'confirmPassword') {
            setPasswordMatch(formData.password === value);
        }
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!passwordMatch) {
            setErrorMessage('Passwords do not match.');
            return;
        }
        if (!formData.username || !formData.email || !formData.password) {
            setErrorMessage('Please enter all required fields.');
            return;
        }
        
        try {
            await axios.post('http://localhost:8085/api/users/signup', {
                username: formData.username,
                email: formData.email,
                password: formData.password,
            });
            // Navigate to the SignIn page upon successful signup
            navigate('/login');
        } catch (error) {
            if (error.response) {
                setErrorMessage(error.response.data.msg);
            } else {
                setErrorMessage('An error occurred during signup.');
            }
        }
    };

    return (
        <div className="sign-up-page">
            <img className="image" src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fdiscoverycollege.co.uk%2Fwp-content%2Fuploads%2F2018%2F08%2Fsport_btec_discovery6.jpg&f=1&nofb=1" alt="Person running" />
            <div className="sign-up-section">
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                <h3>Please enter your email, username, and password</h3>
                <form onSubmit={handleSubmit}><br />
                    <label htmlFor="email">Email:</label><br />
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} /><br /><br />

                    <label htmlFor="username">Username:</label><br />
                    <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} /><br /><br />

                    <label htmlFor="password">Password:</label><br />
                    <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} /><br /><br />

                    <label htmlFor="confirmPassword">Confirm Password:</label><br />
                    <input type="password" id="confirmPassword" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} style={{ borderColor: passwordMatch ? '' : 'red' }} /><br /><br />

                    <Button width='150px' height='75px' type="submit">Sign Up</Button>
                </form>
            </div>
        </div>
    );
};

export default SignUpPage;
