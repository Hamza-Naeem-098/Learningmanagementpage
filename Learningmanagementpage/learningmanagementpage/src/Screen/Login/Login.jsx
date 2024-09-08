import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import {auth} from '../../Config.jsx/Firebase';
import './Login.css';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Successful login
                console.log('User logged in:', userCredential);
                navigate('/dashboard');
            })
            .catch((error) => {
                // Handle errors
                console.error('Error logging in:', error);
                setError('Failed to log in. Please check your email and password.');
            });
    };

    return (
        <div className="auth-container">
            <h1>Login</h1>
            <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Enter your email"
            />
            <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Enter your password"
            />
            {error && <p className="error-message">{error}</p>}
            <button onClick={handleLogin}>Login</button>
            <br />
            <br />
            <button onClick={() => navigate('/signup')}>Create Your Account</button>
        </div>
    );
};

export default Login;
