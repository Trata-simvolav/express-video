// 0.0.8

// ---- ИМПОРТ ---- //
const express = require('express');
const cors = require('cors');
const multer  = require("multer");
const crypto = require('crypto');

const videoController = require('./src/controllers/videoController');
const Video = require('./src/models/videoModel');
const storageConfig = require('./src/handler/storageHandler');
// const nameHandler = require('./src/handler/nameHandler');

const app = express();
app.use(cors({
    origin: 'http://localhost:3000', // допустимый домен
    methods: 'GET,POST', // разрешенные методы запроса
    allowedHeaders: 'Content-Type,Authorization', // разрешенные заголовки
}));


// ---- МАРШРУТЫ ---- //
app.get('/test', videoController.test); // Тестовый маршрут

// ОТПРАВКА ВИДЕО НА АДМИНКУ
app.get('/:id/stream', videoController.startStream);

// ПРИНЯТИЕ ВИДЕО С АДМИНКИ
app.use(multer({storage:storageConfig}).single("filedata"));
app.use(express.static(__dirname));
app.post("/upload-video", function (req, res, next) {
    let filedata = req.file;
    if(!filedata)
        res.status(400).send("Ошибка при загрузке файла");
    else {
        // res.status(200).send("Файл сохранен");
        try {    
            const filename = req.file.filename;
            const originalname = req.file.originalname;
            const mimetype = req.file.mimetype;
            const size = req.file.size;
            const videoIdentCode = crypto.randomBytes(Math.ceil(10)).toString('hex').slice(0, 20);
            const newVideo = new Video();
    
            newVideo.save(filename, originalname, mimetype, size, videoIdentCode)
                .then(() => {
                    console.log('усе норм');
                    res.status(200).send(videoIdentCode);
                })
                .catch(error => {
                    console.log(error);
                    res.status(500).send("Произошла ошибка при сохранении видео");
                });
        } catch (error) {
            console.log(error);
            res.status(500).send("Произошла ошибка на сервере");
        }
    }
});


// ---- ЗАПУСК ---- //
const PORT = 3000;
const HOST = '0.0.0.0';
app.listen(PORT, HOST, () => {
    console.log(`http://localhost:${PORT}`);
});
