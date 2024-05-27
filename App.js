// 0.0.4

// ---- ИМПОРТ ---- //
const express = require('express');
const videoRoutes = require('./src/routes/videoRoutes')
const cors = require('cors');

const app = express();
app.use(cors());


// ---- МАРШРУТЫ ---- //
app.use('/video', videoRoutes); // Видосики



// ---- ЗАПУСК ---- //
const PORT = 3000;
const HOST = '0.0.0.0';
app.listen(PORT, HOST, () => {
    console.log(`http://localhost:${PORT}`);
});
