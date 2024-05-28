
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
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../videos'));
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage: storage });

router.post('/upload-video', upload.single('video'), async (req, res) => {
    try {
        // const { filename, originalname, mimetype, size } = req.file;
        
        // const newVideo = new Video({
        //     filename,
        //     originalname,
        //     mimetype,
        //     size
        // });

        // await newVideo.save();
        console.log(req.file);

        res.status(201).send('Видео успешно загружено.');
    } catch (error) {
        console.error('Ошибка при загрузке видео:', error);
        res.status(500).send('Произошла ошибка при загрузке видео.');
    }
    console.log('VIDEO IMPORT ROUTE');
});




// ---- ИМПОРТ ----- //
module.exports = router;

































// router.post('/upload-video', videoController.importVideoFromClient);