import React, { useState } from 'react';
import './SignUpPage.css';
import { Link } from 'react-router-dom';
import Button from './Button';

const SignUpPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordMatch, setPasswordMatch] = useState(true);

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    };

    const signIn = (e) => {
        e.preventDefault();
        if (username === '' || password === '' || email === '') {
            alert('Please enter username, password and email.');
            return;
        }
        if (password === confirmPassword) {
            // Passwords match, do something like submit the form
            alert('Passwords match!');
          } else {
            // Passwords don't match, show an error
            alert('Passwords do not match!');
            setPasswordMatch(false);
          }
        // Here you can add your logic for authenticating the user
        // For this example, we'll just show an alert with the entered username
        alert('Welcome, ' + username + '!');
    };

    return (
        <div className="sign-up-page">
            <img className="image" src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fdiscoverycollege.co.uk%2Fwp-content%2Fuploads%2F2018%2F08%2Fsport_btec_discovery6.jpg&f=1&nofb=1&ipt=cf4115ccd80c02eae3bb652c74e8b9c56b6906eb4e6efe62f5ebb8850c004755&ipo=images" alt="Guy running on track" />
            <div className="sign-up-section">
                <h3>Please enter your email, username and password</h3>
                <form onSubmit={signIn}><br />

                    <label htmlFor="email">Email:</label><br />
                    <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} /><br /><br />

                    <label htmlFor="username">Username:</label><br />
                    <input type="text" id="username" name="username" value={username} onChange={(e) => setUsername(e.target.value)} /><br /><br />

                    <label htmlFor="password">Password:</label><br />
                    <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} /><br /><br />

                    <label htmlFor="password">Confirm password:</label><br />
                    <input type="password" value={confirmPassword} onChange={handleConfirmPasswordChange} /> <br /><br />

                    <Button width = '150px' height = '75px' type="submit" value="Sign In">Sign up</Button>
                </form><br /><br /><br />
            </div>
        </div>
    );
};

export default SignUpPage;