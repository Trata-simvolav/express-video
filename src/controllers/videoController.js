// ---- НАСТРОЙКИ ---- //
const express = require('express');
const app = express();

// const multer  = require("multer");
const fs = require('fs');
const path = require('path');
const db = require('../db');

// const Video = require('../models/videoModel');

// ---- МЕТОДЫ ---- //

exports.test = (req, res) => {
    console.log('TEST ROUTE');
    res.status(200).send('Привет, мир! Это тестовый маршрут для видео.');
};

exports.startStream = (req, res) => { 
    const videoId = req.params.identification;
    const query = 'SELECT filename FROM videos WHERE identification = ?';
    db.query(query, [videoId], (err, results) => {
        if (err) {
            console.error('Ошибка выполнения запроса:', err.stack);
            res.status(500).send('Ошибка сервера');
            return;
        }
        if (results.length === 0) {
            res.status(404).send('Видео не найдено');
            return;
        }

        const videoFilename = results[0].filename;
      
        const videoPath = path.join(__dirname, `../videos/${videoFilename}`);  // путь к вашему видеофайлу
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
    console.log('VIDEO EXPORT ROUTE');
}

