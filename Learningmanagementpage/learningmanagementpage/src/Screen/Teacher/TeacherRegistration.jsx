import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Dashboard from '../../Componment/Dashboard';
import './TeacherRegistration.css';
import { db } from '../../Config.jsx/Firebase'; // Import Firebase config
import { collection, addDoc } from 'firebase/firestore'; // Import Firestore methods

const TeacherRegistration = ({ onAddTeacher }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    subject: '',
    gender: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const isFormValid = () => {
    return Object.values(formData).every(field => field);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isFormValid()) {
      try {
        // Save teacher data to Firestore
        await addDoc(collection(db, 'teachers'), formData);

        // Optional: Pass the new teacher data to parent component
        if (onAddTeacher) {
          onAddTeacher(formData);
        }

        // Clear form and navigate to teacher list
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          subject: '',
          gender: '',
        });
        navigate('/teacher/teacher-list'); // Navigate to TeacherList
      } catch (error) {
        console.error("Error adding document: ", error);
        setErrorMessage('Failed to save teacher data. Please try again.');
      }
    } else {
      setErrorMessage("Please fill in all fields.");
    }
  };

  return (
    <div className="registration-container">
      <Dashboard />
      <h1 className="header">Teacher Registration Form</h1>
      <form className="registration-form" onSubmit={handleSubmit}>
        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <label htmlFor="firstName">First Name:</label>
        <input
          id="firstName"
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          placeholder="Enter your first name"
          required
        />

        <label htmlFor="lastName">Last Name:</label>
        <input
          id="lastName"
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          placeholder="Enter your last name"
          required
        />

        <label htmlFor="email">Email:</label>
        <input
          id="email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email"
          required
        />

        <label htmlFor="subject">Subject:</label>
        <input
          id="subject"
          type="text"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          placeholder="Enter your subject"
          required
        />

        <label>Gender:</label>
        <div className="gender-options">
          <input
            id="male"
            type="radio"
            name="gender"
            value="Male"
            checked={formData.gender === 'Male'}
            onChange={handleChange}
          />
          <label htmlFor="male">Male</label>

          <input
            id="female"
            type="radio"
            name="gender"
            value="Female"
            checked={formData.gender === 'Female'}
            onChange={handleChange}
          />
          <label htmlFor="female">Female</label>
        </div>

        <button type="submit" disabled={!isFormValid()}>Submit</button>
      </form>
    </div>
  );
};

export default TeacherRegistration;
