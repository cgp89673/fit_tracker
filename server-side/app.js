require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 8085;
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/api/users');
const workoutRoutes = require('./routes/api/workout');

app.use(cors({ origin: true, credentials: true }));
app.use(express.json()); 
app.get('/', (req, res) => res.send('Hello world!'));
app.use('/api/users', userRoutes);
app.use('/api/workout', workoutRoutes);
const conn_str = process.env.MONGODB_URI;

mongoose.set('strictQuery', false);
mongoose.connect(conn_str, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
    console.log('MongoDB Connection Succeeded...');
    app.listen(port, () => console.log(`Server running on port ${port}`));
})
.catch(err => {
    console.error('Error in DB Connection:', err);
});


