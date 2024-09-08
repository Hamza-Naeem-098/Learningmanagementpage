import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './ClassForm.css';
import Dashboard from '../../Componment/Dashboard';
import { db } from '../../Config.jsx/Firebase'; // Import Firestore config
import { collection, addDoc } from 'firebase/firestore';

const ClassForm = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [dob, setDob] = useState('');
  const [qualification, setQualification] = useState('');
  const [gender, setGender] = useState('');

  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Add data to Firestore in the 'classes' collection
    try {
      await addDoc(collection(db, 'classes'), {
        firstName,
        lastName,
        email,
        phoneNumber,
        dob,
        qualification,
        gender,
      });
      
      // Clear form fields after submission
      setFirstName('');
      setLastName('');
      setEmail('');
      setPhoneNumber('');
      setDob('');
      setQualification('');
      setGender('');
      
      // Redirect to ClassList after successful submission
      navigate('/class/class-list');
    } catch (error) {
      console.error('Error adding class:', error);
    }
  };

  return (
    <div className="form-container">
      <Dashboard />
      <h1>Admission Form</h1>
      <form className="form" onSubmit={handleSubmit}>
        <label htmlFor="firstName">First Name:</label>
        <input type="text" id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder='Enter your first name' />
        
        <label htmlFor="lastName">Last Name:</label>
        <input type="text" id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder='Enter your last name' />
        
        <label htmlFor="email">Email:</label>
        <input type="text" id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Enter your email' />
        
        <label htmlFor="phoneNumber">Phone Number:</label>
        <input type="text" id="phoneNumber" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} placeholder='Enter your phone number' />
        
        <label htmlFor="dob">Date Of Birth:</label>
        <input type="text" id="dob" value={dob} onChange={(e) => setDob(e.target.value)} placeholder='MM/DD/YYYY' />
        
        <label htmlFor="qualification">Qualification:</label>
        <input type="text" id="qualification" value={qualification} onChange={(e) => setQualification(e.target.value)} placeholder='Enter your qualification' />
        
        <label>Gender:</label>
        <div className="radio-group">
          <label>
            <input type="radio" id="male" name="gender" value="Male" checked={gender === 'Male'} onChange={(e) => setGender(e.target.value)} />
            Male
          </label>
          <label>
            <input type="radio" id="female" name="gender" value="Female" checked={gender === 'Female'} onChange={(e) => setGender(e.target.value)} />
            Female
          </label>
        </div>
        
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ClassForm;
