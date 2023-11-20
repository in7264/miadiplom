const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000; // Используйте переменную окружения PORT, если она существует

// Подключение к MongoDB
mongoose.connect('mongodb+srv://in7264:gfhjkm7264@nyotvali0.x8murab.mongodb.net/', { ssl: true });

// Создание схемы для пользователя
const userSchema = new mongoose.Schema({
  username: String,
  password: String
});

const User = mongoose.model('User', userSchema);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Регистрация нового пользователя
app.post('/register', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Проверка, существует ли пользователь с таким именем
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.status(409).json({ message: 'Пользователь с таким именем уже существует' });
    }

    // Создание нового пользователя
    const newUser = new User({ username, password });
    await newUser.save();

    res.status(201).json({ message: 'Пользователь успешно зарегистрирован' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

// Аутентификация пользователя
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Поиск пользователя в базе данных
    const user = await User.findOne({ username, password });

    if (user) {
      res.status(200).json({ message: 'Авторизация успешна' });
    } else {
      res.status(401).json({ message: 'Неверный логин или пароль' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
