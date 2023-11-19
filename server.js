const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 3000;

// Подключение к MongoDB
mongoose.connect('mongodb+srv://in7264:gfhjkm7264@nyotvali0.x8murab.mongodb.net/', { useNewUrlParser: true, useUnifiedTopology: true });

const userSchema = new mongoose.Schema({
    username: String,
    password: String
  });
  
  const User = mongoose.model('User', userSchema);
  
  // Use bodyParser middleware
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  
  // Serve static files
  app.use('/public', express.static(path.join(__dirname, 'public')));
  
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
  });
  
  app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
  });
  
  app.post('/register', async (req, res) => {
    try {
      const { username, password } = req.body; // Ensure req.body is properly parsed
  
      const existingUser = await User.findOne({ username });
  
      if (existingUser) {
        return res.status(409).json({ message: 'User with this username already exists' });
      }
  
      const newUser = new User({ username, password });
      await newUser.save();
  
      res.status(201).json({ message: 'User successfully registered' });
    } catch (error) {
      console.error('Error during registration:', error);
      res.status(500).json({ message: 'Server error during registration' });
    }
  });
  
  app.post('/login', async (req, res) => {
    try {
      const { username, password } = req.body; // Ensure req.body is properly parsed
  
      const user = await User.findOne({ username, password });
  
      if (user) {
        res.status(200).json({ message: 'Login successful' });
      } else {
        res.status(401).json({ message: 'Incorrect username or password' });
      }
    } catch (error) {
      console.error('Error during login:', error);
      res.status(500).json({ message: 'Server error during login' });
    }
  });
  
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });