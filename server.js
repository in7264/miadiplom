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
  
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  
  // Указываем папку со статическими файлами (CSS, изображения, скрипты)
  app.use(express.static(path.join(__dirname, 'public')));
  
  // Отправка HTML страницы при обращении к корневому пути
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
  });
  
  // Обработка GET-запроса на /login
  app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
  });
  
  // Обработка запросов на авторизацию
  app.post('/login', async (req, res) => {
    const { username, password } = req.body;
  
    try {
      const user = await User.findOne({ username, password });
  
      if (user) {
        res.status(200).json({ message: 'Авторизация успешна' });
      } else {
        res.status(401).json({ message: 'Неверный логин или пароль' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Ошибка сервера' });
    }
  });
  
  // Запуск сервера
  app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
  });