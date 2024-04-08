import React from 'react';
import { Doughnut, Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import './WorkoutHistory.css';

const WorkoutHistory = () => {
  // Dummy data for the workouts
  const workouts = [
    { date: '2024-04-03', duration: 30 },
    { date: '2024-04-05', duration: 45 },
    { date: '2024-04-07', duration: 60 },
  ];

  // Calculate total duration for the doughnut chart
  const totalDuration = workouts.reduce((acc, workout) => acc + workout.duration, 0);
  const percentageGoalMet = Math.min((totalDuration / 150) * 100, 100).toFixed(2);

  // Chart data for doughnut chart
  const doughnutChartData = {
    datasets: [{
      data: [totalDuration, 150 - totalDuration],
      backgroundColor: ['#4CAF50', '#FF6384'],
      hoverOffset: 4,
      borderRadius: 20,
      spacing: 10,
    }],
    labels: ['Minutes Done', 'Minutes Left'],
  };

  // Chart options for doughnut chart
  const doughnutChartOptions = {
    plugins: {
      tooltip: {
        enabled: true,
      },
      legend: {
        display: false,
      }
    },
    cutout: '60%', // Adjusted size for the doughnut chart
    circumference: 180,
    rotation: 270,
  };

  // Bar chart data and options
  const labels = ['2024-04-01', '2024-04-02', '2024-04-03']; // Sample labels
  const barChartData = {
    labels: labels,
    datasets: [{
      label: 'Exercise Duration (minutes)',
      data: [30, 45, 60, 0, 0, 0, 0], // Sample data, adjust as needed
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

  // Chart options for bar chart
  const barChartOptions = {
    scales: {
      y: {
        beginAtZero: true
      }
    }
   
    
  };

  return (
    <div className="workout-history-container">
      <h1>Your Walk History</h1>
      <div className="workout-cards-container">
        {workouts.map((workout, index) => (
          <div key={index} className="workout-card">
            <p>Date: {workout.date}</p>
            <p>Duration: {workout.duration} minutes</p>
          </div>
        ))}
      </div>
      <div className="chart-container">
        {/* Doughnut chart */}
        <div className="workout-header">
        <h1>Goal Progress</h1>
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
  );
};

export default WorkoutHistory;