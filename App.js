// 0.0.7

// ---- ИМПОРТ ---- //
const express = require('express');
const cors = require('cors');
const multer  = require("multer");

const videoController = require('./src/controllers/videoController');
// const Video = require('./src/models/videoModel');
const storageConfig = require('./src/handler/storageHandler');
// const nameHandler = require('./src/handler/nameHandler');

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
app.use(multer({storage:storageConfig}).single("filedata"));
app.use(express.static(__dirname));
app.post("/upload-video", function (req, res, next) {
    let filedata = req.file;
    if(!filedata)
        res.status(400).send("Ошибка при загрузке файла");
    else {
        res.status(200).send("Файл сохранен");
        // try {    
        //     const { filename, originalname, mimetype, size } = filedata;
        //     const newVideo = new Video({
        //         filename,
        //         originalname,
        //         mimetype,
        //         size
        //     });
    
        //     newVideo.save()
        //         .then(() => {
        //             res.status(200).send("Файл загружен");
        //         })
        //         .catch(error => {
        //             console.log(error);
        //             res.status(500).send("Произошла ошибка при сохранении видео");
        //         });
        // } catch (error) {
        //     res.status(500).send("Произошла ошибка на сервере");
        // }
    }
});


// ---- ЗАПУСК ---- //
const PORT = 3000;
const HOST = '0.0.0.0';
app.listen(PORT, HOST, () => {
    console.log(`http://localhost:${PORT}`);
});
