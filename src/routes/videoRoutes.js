
// ---- НАСТРОЙКА ----- //
const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const db = require('../db');

// ---- МАРШРУТЫ ----//

router.get('/test', (req, res) => {
    res.send('Привет, мир! Это тестовый маршрут для видео.');
}); // Тестовый маршрут

// СТРИМИНГ ВИДЕО ПО АЙДИ
router.get('/:id/stream', async (req, res) => { 

    const videoId = req.params.id;
    let videoName = '';
    const query = 'SELECT title FROM videos WHERE id = ?';
    await db.query(query, [videoId], (err, results) => {
      if (err) {
        console.error('Ошибка выполнения запроса:', err.stack);
        res.status(500).send('Ошибка сервера');
        return;
      }
      if (results.length === 0) {
        res.status(404).send('Видео не найдено');
        return;
      }

      const videoTitle = results[0].title;
      videoName = videoTitle;
    });

    const videoPath = path.join(__dirname, `../videos/${videoName}`);  // путь к вашему видеофайлу
    const videoStat = fs.statSync(videoPath);
    const fileSize = videoStat.size;
    const range = req.headers.range;
    if (range) {
        const parts = range.replace(/bytes=/, "").split("-");
        const start = parseInt(parts[0], 10);
        const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
        const chunksize = (end - start) + 1;
        const file = fs.createReadStream(videoPath, { start, end });
        const head = {
            'Content-Range': `bytes ${start}-${end}/${fileSize}`,
            'Accept-Ranges': 'bytes',
            'Content-Length': chunksize,
            'Content-Type': 'video/mp4',
        };

        res.writeHead(206, head);
        file.pipe(res);
    } else {
        const head = {
            'Content-Length': fileSize,
            'Content-Type': 'video/mp4',
        };
        res.writeHead(200, head);
        fs.createReadStream(videoPath).pipe(res);
    }
});

// ---- ИМПОРТ ----- //
module.exports = router;