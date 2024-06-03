const connection = require('../db');

class VideoModel {
    constructor() {
        this.connection = connection;
    }

    async save(filename, originalname, mimetype, size, videoIdentCode) {
        const sql = 'INSERT INTO videos_express (filename, originalname, mimetype, size, identification) VALUES (?, ?, ?, ?, ?)';
        const values = [filename, originalname, mimetype, size, videoIdentCode];
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