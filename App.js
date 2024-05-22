// 0.0.1

// ---- ИМПОРТ ---- //
const express = require('express');
const videoRoutes = require('./routes/videoRoutes')

const app = express();



// ---- МАРШРУТЫ ---- //
// VIDEO //
app.use('/video', videoRoutes); // ТЕСТ



// ---- ЗАПУСК ---- //
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});
