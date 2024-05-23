const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'my_dream'
});

db.connect(err => {
  if (err) {
    console.error('Ошибка соединения с базой данных:', err.stack);
    return;
  }
  console.log('Соединение с базой данных установлено.');
});

module.exports = db;
