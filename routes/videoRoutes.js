
// ---- НАСТРОЙКА ----- //
const express = require('express');
const router = express.Router();



// ---- МАРШРУТЫ ----//

router.get('/test', (req, res) => {
    res.send('Привет, мир! Это тестовый маршрут для видео.');
}); // Тестовый маршрут

router.get('/:idVideo/stream', (req, res) => {
    const idVideo = req.params.idVideo;
    res.send(`Начат стриминг видео с ID ${idVideo}`);
}); // Маршрут для начала стриминга видео по его ID




// ---- ИМПОРТ ----- //
module.exports = router;