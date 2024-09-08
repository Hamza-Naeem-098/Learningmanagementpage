import { createUserWithEmailAndPassword } from 'firebase/auth'
import React, { useState } from 'react'
import {auth} from '../../Config.jsx/Firebase'
import { useNavigate } from 'react-router-dom'
import './Signup.css' // Import the CSS file

const Signup = () => {
    const [name, setName] = useState('')
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()
    let userObj = {
        name,
        email,
        username,
    }

    const handleSignup = () => {
        console.log(name, username, email, password)

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log("userCredential", userCredential);
                localStorage.setItem("userData", JSON.stringify(userObj));
                navigate("/")
            })
            .catch((err) => {
                console.log("err", err);
            })
    }

    return (
        <div className="signup-container">
            <h1>Signup</h1>
            <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                placeholder='Enter your full name'
            />
            <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                type="text"
                placeholder='Enter your username'
            />
            <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder='Enter your email'
            />
            <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder='Enter your password'
            />
            <button onClick={handleSignup}>Signup</button>
            <br /><br />
            <button onClick={()=>navigate("/")}>I have already account</button>
        </div>
    )
}

export default Signup
