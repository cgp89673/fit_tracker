const express = require('express');
const router = express.Router();
const Workout = require('../../models/Workout');

const User = require('../../models/User');
const auth = require('../../middleware/auth'); 

module.exports = router;

router.post('/add', auth, async (req, res) => {
  try {
    const { duration, date } = req.body;
  
    // Create a date object from the received string
    const dateObject = new Date(date);
    // Add one day to compensate for the timezone offset issue
    dateObject.setDate(dateObject.getDate() + 1);

    const newWorkout = new Workout({
      user: req.user, 
      duration,
      date: dateObject, 
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

    if (workout.user.toString() !== req.user) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    // Create a new date object from the received date
    const newDate = new Date(date);
    // Add one day to the date
    newDate.setDate(newDate.getDate() + 1);

    workout.duration = duration;
    workout.date = newDate; // Update with the adjusted date
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

// DELETE api/workouts/:id
router.delete('/:id', auth, async (req, res) => {
  try {
    const workout = await Workout.findById(req.params.id);

    if (!workout) {
      return res.status(404).json({ msg: 'Workout not found' });
    }

    // Check user authorization
    if (workout.user.toString() !== req.user) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    await Workout.findByIdAndDelete(req.params.id);
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
  

const AddWorkout = () => {
    
  
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
  