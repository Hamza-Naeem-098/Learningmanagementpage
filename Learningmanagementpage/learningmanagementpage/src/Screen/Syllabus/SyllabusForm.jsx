import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Dashboard from '../../Componment/Dashboard';
import { db } from '../../Config.jsx/Firebase'; // Firestore import remains the same
import { collection, addDoc } from 'firebase/firestore'; // Firestore functions
import './SyllabusForm.css'; // Import the CSS file

const SyllabusForm = () => {
  const [subjectName, setSubjectName] = useState('');
  const [className, setClassName] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Save subject and class data to Firestore
      await addDoc(collection(db, 'syllabuses'), {
        subjectName,
        className,
      });

      // Clear form fields after submission
      setSubjectName('');
      setClassName('');

      // Redirect to Syllabus List
      navigate('/syllabus/syllabus-list');
    } catch (error) {
      console.error('Error adding syllabus:', error);
    }
  };

  return (
    <div className="registration-container">
      <Dashboard />
      <h1 className="header">Syllabus Add</h1>
      <form className="registration-form" onSubmit={handleSubmit}>
        <label>Subject Name:</label>
        <input
          type="text"
          placeholder="Enter your subject name"
          value={subjectName}
          onChange={(e) => setSubjectName(e.target.value)}
        />
        <label>Class:</label>
        <input
          type="text"
          placeholder="Enter your class"
          value={className}
          onChange={(e) => setClassName(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default SyllabusForm;
