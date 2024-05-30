const connection = require('../db');
const nameHandler = require('../handler/nameHandler');

class VideoModel {
    constructor() {
        this.connection = connection;
    }

    async save(filename, originalname, mimetype, size) {
        const sql = 'INSERT INTO videos (filename, originalname, mimetype, size) VALUES (?, ?, ?, ?)';
        filename = nameHandler();
        originalname = 'lolox';
        mimetype = 'video/mp4';
        size = 'dohua';
        const values = [filename, originalname, mimetype, size];
        return new Promise((resolve, reject) => {
            this.connection.query(sql, values, (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    } // Метод для создания нового видео

    // ---- ---- //


}





// ---- ЭКСПОРТ ---- //
module.exports = VideoModel;