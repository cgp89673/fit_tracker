import React, { useState, useContext } from 'react';
import axios from 'axios';
import './AddWorkout.css'; 
import Hdr from './Hdr';
import { useNavigate } from 'react-router-dom';
import UserContext from '../context/UserContext'; 

const AddWorkout = ({addWorkout}) => {
    const [formData, setFormData] = useState({
        duration: '',
        date: ''
    });
    const navigate = useNavigate();
    const { setUserData } = useContext(UserContext); 

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Get the token from local storage
        const token = localStorage.getItem('auth-token');
        if (!token) {
            console.error("No auth token found, please log in.");
            return;
        }


        try {
            const response = await axios.post('http://localhost:8085/api/workout/add', {
                duration: parseInt(formData.duration, 10),
                date: formData.date
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            addWorkout(response.data);
            setFormData({ duration: '', date: '' });
            navigate('/workout-history'); 
        } catch (error) {
            console.error("There was an error submitting the form: ", error.response?.data?.msg || error.message);
        }
    };

    return (
        <div className="add-workout-container">
            <Hdr />
            <h2>Add a Walk</h2>
            <form onSubmit={handleSubmit} className="add-workout-form">
                <label htmlFor="duration">Duration (minutes):</label>
                <input
                    type="number"
                    id="duration"
                    name="duration"
                    value={formData.duration}
                    onChange={handleChange}
                    required
                />


                <label htmlFor="date">Date:</label>
                <input
                    type="date"
                    id="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                />

                <button type="submit">Add Walk</button>
            </form>
        </div>
    );
};

export default AddWorkout;