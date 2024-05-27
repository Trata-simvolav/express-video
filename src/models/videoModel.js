const connection = require('../db');

class UserModel {
    constructor() {
        this.connection = connection;
    }

    async save(filename, originalname, mimetype, size) {
        const sql = 'INSERT INTO users (filename, originalname, mimetype, size) VALUES (?, ?, ?)';
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
    } // Метод для создания нового пользователя

    // ---- ---- //


}





// ---- ЭКСПОРТ ---- //
module.exports = UserModel;