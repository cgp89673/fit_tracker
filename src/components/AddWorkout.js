"use client"
import React, { useState } from 'react';
import './AddWorkout.css'; 

const AddWorkout = () => {
  const [duration, setDuration] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // TODO
    console.log(`Workout: Walk, Duration: ${duration}, Date: ${date}`);
    setDuration('');
    setDate('');
  };

  return (
    <div className="add-workout-container">
      <h2>Add a Walk</h2>
      <form onSubmit={handleSubmit} className="add-workout-form">
        <label htmlFor="duration">Duration (minutes):</label>
        <input
          type="number"
          id="duration"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
        />
        
        <label htmlFor="date">Date:</label>
        <input
          type="date"
          id="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <button type="submit">Add Walk</button>
      </form>
    </div>
  );
};

export default AddWorkout;
