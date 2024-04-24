import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { UserProvider } from './context/UserContext'; // Make sure the path is correct
import AboutPage from './AboutPage';
import WorkoutHistory from './components/WorkoutHistory';
import AddWorkout from './components/AddWorkout';
import HomePage from './HomePage';
import SignIn from './SignIn';
import SignUp from './SignUp';

const App = () => {
    return (
        <UserProvider> {}
            <Router>
                <Routes>
                    <Route exact path="/" element={<HomePage />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/workout-history" element={<WorkoutHistory />} />
                    <Route path="/add-workout" element={<AddWorkout />} />
                    <Route path="/login/" element={<SignIn />}/>
                    <Route path="/signup/" element={<SignUp />}/>
                </Routes>
            </Router>
        </UserProvider>
    );
};

export default App;
