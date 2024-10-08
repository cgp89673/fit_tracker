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



const WorkoutHistory = ({workouts, setWorkouts}) => {

const token = localStorage.getItem('auth-token');
const config = {
  headers: {
    'Authorization': `Bearer ${token}`
  }
};

useEffect(() => {
  // Code to run when the component mounts
  const fetchWorkouts = async () => {
    try {
        const response = await axios.get('http://localhost:8085/api/workout/', config);
        setWorkouts(response.data);
    } catch (error) {
        console.error('Error fetching workouts:', error);
    }
  };

  fetchWorkouts();
}, []);

  // Dummy data for the workouts
  const dummyWorkouts = [
    { id: 1, date: '2024-04-03', duration: 30 },
    { id: 2, date: '2024-04-05', duration: 45 },
    { id: 3, date: '2024-04-07', duration: 60 },
  ];
  
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


  // Calculate total duration for the doughnut chart
  
  const totalDuration = workouts.reduce((acc, workout) => acc + workout.duration, 0);
  const numberOfWorkouts = workouts.length;//
  const totalGoal = numberOfWorkouts * 60;//
  const percentageGoalMet = Math.min((totalDuration / totalGoal) * 100, 100).toFixed(2);

  const doughnutChartData = {
    datasets: [{
      data: [totalDuration, totalGoal - totalDuration],
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

  // Bar chart data and options
  // const labels = ['2024-04-01', '2024-04-02', '2024-04-03', '2024-04-04']; // Sample labels
  const labels = workouts.slice(0, 7).map((workout) => workout.date.split('T')[0].toString());
  const barChartData = {
    labels: workouts.map(workout => new Date(workout.date).toLocaleDateString()),
    datasets: [{
      label: 'Exercise Duration (minutes)',
      data: workouts.slice(0, 7).map((workout) => workout.duration), // Sample data, adjust as needed
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(255, 205, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(201, 203, 207, 0.2)'
      ],
      borderColor: [
        'rgb(255, 99, 132)',
        'rgb(255, 159, 64)',
        'rgb(255, 205, 86)',
        'rgb(75, 192, 192)',
        'rgb(54, 162, 235)',
        'rgb(153, 102, 255)',
        'rgb(201, 203, 207)'
      ],
      borderWidth: 1
    }]
  };

  const barChartOptions = {
    scales: { y: { beginAtZero: true } }
  };

  return (
    <div>
      <Hdr></Hdr>
    <div className="workout-history-container">
      <h1>Your Walk History</h1>
      <div className="workout-cards-container">
        <ul>
        {workouts.map((workout, index) => (
          <div key={index} className="workout-card">
            <div className = "content">
              <p>Date: {workout.date.split('T')[0]}</p>
              <p>Duration: {workout.duration} minutes</p>
              <Button className = "btn" onClick={() => openModal(workout._id)}>Edit</Button>
              <DeleteButton className = "btn"  onClick={() => handleDelete(workout._id)}>Delete</DeleteButton>
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
        {/* Doughnut chart */}
        <div className="workout-header">
        <h1>Goal Progress</h1>
        <h3>With a walkday goal(aim) of 60 minutes per day</h3>
        </div>
        <Doughnut data={doughnutChartData} options={doughnutChartOptions} style={{ margin: '0' }}/>
        {/* Bar chart */}
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
