
// ---- НАСТРОЙКА ----- //
const express = require('express');
const router = express.Router();

const Video = require('../models/videoModel');
const multer = require('multer');
const path = require('path');

const videoController = require('../controllers/videoController')

// ---- МАРШРУТЫ ----//

router.get('/test', (req, res) => {
    console.log('TEST ROUTE');
    res.send('Привет, мир! Это тестовый маршрут для видео.');
}); // Тестовый маршрут

// СТРИМИНГ ВИДЕО ПО АЙДИ
router.get('/:id/stream', videoController.startStream);

// ПРИНЯТИЕ ВИДЕО С АДМИНКИ
const upload = multer({ dest: path.join(__dirname, '../videos') }); // Используйте multer для обработки запросов с файлами
router.post('/upload-video', upload.single('video'), async (req, res) => {
    try {
        // // Получаем информацию о загруженном файле
        // const { filename, originalname, mimetype, size } = req.file;

        // // Создаем новую запись о видео в базе данных
        // const newVideo = new Video({
        //     filename,
        //     originalname,
        //     mimetype,
        //     size
        // });

        // // Сохраняем запись в базе данных
        // await newVideo.save();

        console.log(req.file);

        // Отправляем ответ клиенту
        res.status(201).send('Видео успешно загружено.');
        console.log('VIDEO IMPORT ROUTE');
    } catch (error) {
        console.error('Ошибка при загрузке видео:', error);
        res.status(500).send('Произошла ошибка при загрузке видео.');
    }
});




// ---- ИМПОРТ ----- //
module.exports = router;

































// router.post('/upload-video', videoController.importVideoFromClient);