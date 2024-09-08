import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './StudentRegistration.css';
import Dashboard from '../../Componment/Dashboard'; // Adjusted import path
import { db } from '../../Config.jsx/Firebase'; // Ensure correct Firebase import
import { collection } from "firebase/firestore"
import { addDoc } from "firebase/firestore"

const StudentRegistration = ({ onAddStudent }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [className, setClassName] = useState('');
  const [gender, setGender] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  // Validate form input
  const isFormValid = () => {
    return firstName && lastName && email && className && gender;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isFormValid()) {
      try {
        // Save data to Firestore
        await addDoc(collection(db, 'students'), {
          firstName,
          lastName,
          email,
          className,
          gender,
        });

        // Call the onAddStudent function if provided
        if (onAddStudent) {
          onAddStudent({ firstName, lastName, email, className, gender });
        }

        // Navigate to the student list page
        navigate('/student/student-list');
      } catch (error) {
        console.error('Error adding document:', error.message || error);
        setErrorMessage('Failed to save student data. Please try again.');
      }
    } else {
      setErrorMessage('Please fill in all fields.');
    }
  };

  return (
    <div className="registration-container">
      <Dashboard />
      <h1 className="header">Student Registration Form</h1>
      <form onSubmit={handleSubmit} className="registration-form">
        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <label htmlFor="firstName">First Name:</label>
        <input
          id="firstName"
          type="text"
          placeholder="Enter your first name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />

        <label htmlFor="lastName">Last Name:</label>
        <input
          id="lastName"
          type="text"
          placeholder="Enter your last name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />

        <label htmlFor="email">Email:</label>
        <input
          id="email"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="className">Class:</label>
        <input
          id="className"
          type="text"
          placeholder="Enter your class name"
          value={className}
          onChange={(e) => setClassName(e.target.value)}
        />

        <label>Gender:</label>
        <div className="gender-options">
          <input
            id="male"
            type="radio"
            name="gender"
            value="Male"
            checked={gender === 'Male'}
            onChange={(e) => setGender(e.target.value)}
          />
          <label htmlFor="male">Male</label>

          <input
            id="female"
            type="radio"
            name="gender"
            value="Female"
            checked={gender === 'Female'}
            onChange={(e) => setGender(e.target.value)}
          />
          <label htmlFor="female">Female</label>
        </div>

        <button type="submit" disabled={!isFormValid()}>Submit</button>
      </form>
    </div>
  );
};

export default StudentRegistration;
