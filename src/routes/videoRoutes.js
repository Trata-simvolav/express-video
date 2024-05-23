
// ---- НАСТРОЙКА ----- //
const express = require('express');
const router = express.Router();

const videoController = require('../controllers/videoController')

// ---- МАРШРУТЫ ----//

router.get('/test', (req, res) => {
    res.send('Привет, мир! Это тестовый маршрут для видео.');
}); // Тестовый маршрут

// СТРИМИНГ ВИДЕО ПО АЙДИ
router.get('/:id/stream', videoController.startStream);

// ---- ИМПОРТ ----- //
module.exports = router;