import React from 'react'
import "./ExamSchedule.css"
import Dashboard from '../../Componment/Dashboard'

const ExamSchedule = () => {

  return (
    <div className='exam-main'>
      <Dashboard />
      <h1 className='exam-head'>Exam Schedule</h1>
      <div className='exam-container'>
        <h4>Class 1 -Mathematic</h4>
        <p>Date: 2024-08-15</p>
        <p>Start Time: 09:00 AM | End Time: 12:00 PM</p>
        <button>View Details</button>
      </div>
      <div className='exam-container'>
        <h4>Class 1 - English</h4>
        <p>Date: 2024-08-16</p>
        <p>Start Time: 10:00 AM | End Time: 01:00 PM</p>
        <button>View Details</button>
      </div>
      <div className='exam-container'>
        <h4>Class 2 - Science</h4>
        <p>Date: 2024-08-17</p>
        <p>Start Time: 09:30 AM | End Time: 12:30 PM</p>
        <button>View Details</button>
      </div>
      <div className='exam-container'>
        <h4>Class 2 - History</h4>
        <p>Date: 2024-08-18</p>
        <p>Start Time: 11:00 AM | End Time: 02:00 PM</p>
        <button>View Details</button>
      </div>
      <div className='exam-container'>
        <h4>Class 3 - Geography</h4>
        <p>Date: 2024-08-19</p>
        <p>Start Time: 01:00 PM | End Time: 04:00 PM</p>
        <button>View Details</button>
      </div>
      <div className='exam-container'>
        <h4>Class 3 - Physics</h4>
        <p>Date: 2024-08-20</p>
        <p>Start Time: 02:00 PM | End Time: 05:00 PM</p>
        <button>View Details</button>
      </div>
      <div className='exam-container'>
        <h4>Class 4 - Chemistry</h4>
        <p>Date: 2024-08-21</p>
        <p>Start Time: 03:00 PM | End Time: 06:00 PM</p>
        <button>View Details</button>
      </div>
      <div className='exam-container'>
        <h4>Class 5 - Mathematics</h4>
        <p>Date: 2024-08-22</p>
        <p>Start Time: 09:00 AM | End Time: 12:00 PM</p>
        <button>View Details</button>
      </div>
      <div className='exam-container'>
        <h4>Class 5 - English</h4>
        <p>Date: 2024-08-23</p>
        <p>Start Time: 10:00 AM | End Time: 01:00 PM</p>
        <button>View Details</button>
      </div>
    </div>
  )
}

export default ExamSchedule
