import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Link } from 'react-router-dom';
import AboutPage from './AboutPage';
import WorkoutHistory from './components/WorkoutHistory';
import AddWorkout from './components/AddWorkout';
import HomePage from './HomePage';

const App = () => {
    return (
        <Router>
            <Routes>
              <Route exact path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/workout-history" element={<WorkoutHistory />} />
              <Route path="/add-workout" element={<AddWorkout />} />
            </Routes>
        </Router>
    );
};

export default App;
