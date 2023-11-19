const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 3000;

// Подключение к MongoDB
mongoose.connect('mongodb+srv://in7264:gfhjkm7264@nyotvali0.x8murab.mongodb.net/', { useNewUrlParser: true, useUnifiedTopology: true });

// Создание схемы для пользователя
const userSchema = new mongoose.Schema({
    username: String,
    password: String
  });
  
  const User = mongoose.model('User', userSchema);
  
  // Добавление middleware для обработки CORS
  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); // Разрешает запросы от всех источников
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
  });
  
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
      const { username, password } = req.body;
  
      const existingUser = await User.findOne({ username });
  
      if (existingUser) {
        return res.status(409).json({ message: 'Пользователь с таким именем уже существует' });
      }
  
      const newUser = new User({ username, password });
      await newUser.save();
  
      res.status(201).json({ message: 'Пользователь успешно зарегистрирован' });
    } catch (error) {
      console.error('Ошибка во время регистрации:', error);
      res.status(500).json({ message: 'Ошибка сервера во время регистрации' });
    }
  });
  
  app.post('/login', async (req, res) => {
    try {
      const { username, password } = req.body;
  
      const user = await User.findOne({ username, password });
  
      if (user) {
        res.status(200).json({ message: 'Авторизация успешна' });
      } else {
        res.status(401).json({ message: 'Неверный логин или пароль' });
      }
    } catch (error) {
      console.error('Ошибка во время входа:', error);
      res.status(500).json({ message: 'Ошибка сервера во время входа' });
    }
  });
  
  app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
  });