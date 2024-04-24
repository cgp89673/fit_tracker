const express = require('express');
const router = express.Router();
const Workout = require('../../models/Workout');
const User = require('../../models/User');
const auth = require('../../middleware/auth'); // Ensure you have this middleware to authenticate

module.exports = router;

//router.post('/add',auth ,  async (req, res) => {
   // try {
     // const { duration, date } = req.body;
  
      //const newWorkout = new Workout({
       // user: req.user, // The user ID will be attached to the request by the auth middleware
       // duration,
       // date,
 //     });
  
   //   const workout = await newWorkout.save();
     // res.json(workout);
   // } catch (err) {
     // console.error(err);
      //res.status(500).send('Server Error');
   // }
  //});

  router.post('/add', auth, async (req, res) => {
    try {
      const { duration, date } = req.body;
  
      
      console.log('Request Body:', req.body);
      console.log('User ID from token:', req.user);
  
      const newWorkout = new Workout({
        user: req.user, 
        duration,
        date: new Date(date), 
      });
  
      const workout = await newWorkout.save();
      res.json(workout);
    } catch (err) {
      console.error('Error in /add route:', err); 
      res.status(500).send('Server Error');
    }
  });
  

  

  
// Update a workout

router.put('/update/:id', auth, async (req, res) => {
    try {
      const { duration, date } = req.body;
      const workout = await Workout.findById(req.params.id);
  
      if (!workout) {
        return res.status(404).json({ msg: 'Workout not found' });
      }
  
      // Check for user
      if (workout.user.toString() !== req.user) {
        return res.status(401).json({ msg: 'User not authorized' });
      }
  
      workout.duration = duration;
      workout.date = date;
      await workout.save();
      res.json(workout);
    } catch (err) {
      console.error(err.message);
      if (err.kind === 'ObjectId') {
        return res.status(404).json({ msg: 'Workout not found' });
      }
      res.status(500).send('Server Error');
    }
  });
  

  // DELETE api/workou
router.delete('/:id', auth, async (req, res) => {
    try {
      const workout = await Workout.findById(req.params.id);
  
      if (!workout) {
        return res.status(404).json({ msg: 'Workout not found' });
      }
  
      // Check user
      if (workout.user.toString() !== req.user) {
        return res.status(401).json({ msg: 'User not authorized' });
      }
  
      await workout.remove();
      res.json({ msg: 'Workout removed' });
    } catch (err) {
      console.error(err.message);
      if (err.kind === 'ObjectId') {
        return res.status(404).json({ msg: 'Workout not found' });
      }
      res.status(500).send('Server Error');
    }
  });

router.get('/', auth, async (req, res) => {
    try {
      const workouts = await Workout.find({ user: req.user }).sort({ date: -1 });
      res.json(workouts);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });
  // ...imports

const AddWorkout = () => {
    // ...state hooks
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      
      const token = localStorage.getItem('auth-token'); 
  
      try {
        const response = await axios.post('/api/workouts/add', 
          { duration, date },
          { headers: { 'Authorization': `Bearer ${token}` } }
        );
        console.log(response.data);
      
      } catch (err) {
        console.error(err.response.data);
       
      }
    };
  
 
  };
  
  module.exports = router;
  