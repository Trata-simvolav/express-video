// ---- НАСТРОЙКИ ---- //
const express = require('express');
const app = express();

const multer  = require("multer");
const fs = require('fs');
const path = require('path');
const db = require('../db');

const Video = require('../models/videoModel');

// ---- МЕТОДЫ ---- //

exports.startStream = (req, res) => { 
    const videoId = req.params.id;
    const query = 'SELECT filename FROM videos WHERE id = ?';
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

const upload = multer({ dest: "../videos" });
exports.importVideo = async (req, res, next) => {
    try {
        upload.single("filedata")(req, res, err => {
            if (err instanceof multer.MulterError) {
                // Если произошла ошибка Multer
                return res.status(400).send("Ошибка при загрузке файла");
            } else if (err) {
                // Если произошла другая ошибка
                return res.status(500).send("Произошла ошибка сервера");
            }

            // Если файл успешно загружен
            if (!req.file) {
                return res.status(400).send("Ошибка при загрузке файла");
            }

            const { filename, originalname, mimetype, size } = req.file;
            const newVideo = new Video({
                filename,
                originalname,
                mimetype,
                size
            });

            newVideo.save()
                .then(() => {
                    res.send("Файл загружен");
                })
                .catch(error => {
                    console.log(error);
                    res.status(500).send("Произошла ошибка при сохранении видео");
                });
        });
    } catch (error) {
        res.status(500).send("Произошла ошибка на сервере");
    }
};












































// // const uploadDir = ; // Определите путь сохранения файлов
// const upload = multer({ dest: path.join(__dirname, '../videos') }); // Используйте multer для обработки запросов с файлами
// exports.importVideoFromClient = upload.single('video'), async (req, res) => {
//     try {
//         // // Получаем информацию о загруженном файле
//         // const { filename, originalname, mimetype, size } = req.file;

//         // // Создаем новую запись о видео в базе данных
//         // const newVideo = new Video({
//         //     filename,
//         //     originalname,
//         //     mimetype,
//         //     size
//         // });

//         // // Сохраняем запись в базе данных
//         // await newVideo.save();

//         // Отправляем ответ клиенту
//         res.status(201).send('Видео успешно загружено.');
//     } catch (error) {
//         console.error('Ошибка при загрузке видео:', error);
//         res.status(500).send('Произошла ошибка при загрузке видео.');
//     }
//     console.log('VIDEO IMPORT ROUTE');
// };