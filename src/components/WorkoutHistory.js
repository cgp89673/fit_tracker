import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Doughnut, Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import './WorkoutHistory.css';
import Button from './Button';
import Hdr from './Hdr';
import DeleteButton from './DeleteButton';
import Modal from 'react-modal';
import EditUserModal from './EditUser';

const WorkoutHistory = () => {
  const [workouts, setWorkouts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedWorkoutId, setSelectedWorkoutId] = useState(null);

  useEffect(() => {
    fetchWorkouts();
  }, []);

  const fetchWorkouts = async () => {
    const token = localStorage.getItem('auth-token');
    try {
      const response = await axios.get('http://localhost:8085/api/workout/', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setWorkouts(response.data);
    } catch (error) {
      console.error('Failed to fetch workouts:', error);
    }
  };

  const handleSave = async (editedData) => {
    const token = localStorage.getItem('auth-token');
    try {
      const response = await axios.put(`http://localhost:8085/api/workout/update/${editedData._id}`, editedData, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setWorkouts(workouts.map(workout => workout._id === editedData._id ? response.data : workout));
      closeModal();
    } catch (error) {
      console.error('Failed to update workout:', error);
    }
  };

  const handleDelete = async (workoutId) => {
    const token = localStorage.getItem('auth-token');
    try {
      await axios.delete(`http://localhost:8085/api/workout/${workoutId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setWorkouts(workouts.filter(workout => workout._id !== workoutId));
    } catch (error) {
      console.error('Failed to delete workout:', error);
    }
  };

  const openModal = (workoutId) => {
    setIsModalOpen(true);
    setSelectedWorkoutId(workoutId);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedWorkoutId(null);
  };

  const totalDuration = workouts.reduce((acc, workout) => acc + workout.duration, 0);
  const goal = 150;
  const percentageGoalMet = Math.min((totalDuration / goal) * 100, 100).toFixed(2);

  const doughnutChartData = {
    datasets: [{
      data: [totalDuration, goal - totalDuration],
      backgroundColor: ['#4CAF50', '#FF6384'],
      hoverOffset: 4,
      borderRadius: 20,
      spacing: 10,
    }],
    labels: ['Minutes Done', 'Minutes Left'],
  };

  const doughnutChartOptions = {
    plugins: {
      tooltip: { enabled: true },
      legend: { display: false }
    },
    cutout: '60%',
    circumference: 180,
    rotation: 270,
  };

  const barChartData = {
    labels: workouts.map(workout => new Date(workout.date).toLocaleDateString()),
    datasets: [{
      label: 'Exercise Duration (minutes)',
      data: workouts.map(workout => workout.duration),
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      borderColor: 'rgb(255, 99, 132)',
      borderWidth: 1
    }]
  };

  const barChartOptions = {
    scales: { y: { beginAtZero: true } }
  };

  return (
    <div>
      <Hdr />
      <div className="workout-history-container">
        <h1>Your Workout History</h1>
        <div className="workout-cards-container">
          <ul>
            {workouts.map((workout, index) => (
              <div key={index} className="workout-card">
                <div className="content">
                  <p>Date: {new Date(workout.date).toLocaleDateString()}</p>
                  <p>Duration: {workout.duration} minutes</p>
                  <Button className="btn" onClick={() => openModal(workout._id)}>Edit</Button>
                  <DeleteButton className="btn" onClick={() => handleDelete(workout._id)}>Delete</DeleteButton>
                </div>
                <EditUserModal
                  isOpen={isModalOpen}
                  onClose={closeModal}
                  userData={workouts.find((workout) => workout._id === selectedWorkoutId)}
                  onSave={handleSave}
                />
              </div>
            ))}
          </ul>
        </div>
        <div className="chart-container">
          <div className="workout-header">
            <h1>Goal Progress</h1>
          </div>
          <Doughnut data={doughnutChartData} options={doughnutChartOptions} style={{ margin: '0' }}/>
          <div className="workout-header">
            <h2>Activity Summary</h2>
          </div>
          <Bar data={barChartData} options={barChartOptions} />
          <div className="chart-center-label">
            {percentageGoalMet}% Goal Met
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkoutHistory;
