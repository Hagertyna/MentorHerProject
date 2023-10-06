const express = require('express');
const mongoose = require('mongoose');

const app = express();

mongoose.connect('mongodb://localhost:27017/WellnessEdu', { useNewUrlParser: true, useUnifiedTopology: true });

const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
});

const ExerciseSchema = new mongoose.Schema({
  type: String,
  description: String,
  duration: Number,
});

const UserModel = mongoose.model('UserDatas', UserSchema);
const ExerciseModel = mongoose.model('Exercise', ExerciseSchema);

app.use(express.json());

// Create a new user
app.post('/users', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = new UserModel({ username, password });
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all users
app.get('/users', async (req, res) => {
  try {
    const users = await UserModel.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a single user by username
app.get('/users/:username', async (req, res) => {
  try {
    const user = await UserModel.findOne({ username: req.params.username });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a user by username
app.put('/users/:username', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await UserModel.findOneAndUpdate(
      { username: req.params.username },
      { username, password },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a user by username
app.delete('/users/:username', async (req, res) => {
  try {
    const user = await UserModel.findOneAndDelete({ username: req.params.username });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create a new exercise
app.post('/exercises', async (req, res) => {
  try {
    const { type, description, duration } = req.body;
    const exercise = new ExerciseModel({ type, description, duration });
    await exercise.save();
    res.status(201).json(exercise);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all exercises
app.get('/exercises', async (req, res) => {
  try {
    const exercises = await ExerciseModel.find();
    res.json(exercises);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a single exercise by ID
app.get('/exercises/:id', async (req, res) => {
  try {
    const exercise = await ExerciseModel.findById(req.params.id);
    if (!exercise) {
      return res.status(404).json({ error: 'Exercise not found' });
    }
    res.json(exercise);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update an exercise by ID
app.put('/exercises/:id', async (req, res) => {
  try {
    const { type, description, duration } = req.body;
    const exercise = await ExerciseModel.findByIdAndUpdate(
      req.params.id,
      { type, description, duration },
      { new: true }
    );
    if (!exercise) {
      return res.status(404).json({ error: 'Exercise not found' });
    }
    res.json(exercise);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete an exercise by ID
app.delete('/exercises/:id', async (req, res) => {
  try {
    const exercise = await ExerciseModel.findByIdAndDelete(req.params.id);
    if (!exercise) {
      return res.status(404).json({ error: 'Exercise not found' });
    }
    res.sendStatus(204);
 } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3001, () => {
  console.log('Server started on port 3001');
});