const mongoose = require('mongoose');

const workoutSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  duration: { type: Number, required: true },
  date: { type: Date, required: true }
});

const Workout = mongoose.model('Workout', workoutSchema);
module.exports = Workout;
