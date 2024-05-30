// 0.0.6

// ---- ИМПОРТ ---- //
const express = require('express');
const cors = require('cors');
const videoController = require('./src/controllers/videoController');

const app = express();
app.use(cors({
    origin: 'http://localhost:3000', // допустимый домен
    methods: 'GET,POST', // разрешенные методы запроса
    allowedHeaders: 'Content-Type,Authorization', // разрешенные заголовки
}));


// ---- МАРШРУТЫ ---- //
app.get('/test', (req, res) => {
    console.log('TEST ROUTE');
    res.send('Привет, мир! Это тестовый маршрут для видео.');
}); // Тестовый маршрут

// ОТПРАВКА ВИДЕО НА АДМИНКУ
app.get('/:id/stream', videoController.startStream);

// ПРИНЯТИЕ ВИДЕО С АДМИНКИ
app.post('/upload-video', videoController.importVideo);


// ---- ЗАПУСК ---- //
const PORT = 3000;
const HOST = '0.0.0.0';
app.listen(PORT, HOST, () => {
    console.log(`http://localhost:${PORT}`);
});
