// 0.0.2

// ---- ИМПОРТ ---- //
const express = require('express');
const videoRoutes = require('./src/routes/videoRoutes')

const app = express();


// ---- МАРШРУТЫ ---- //
app.use('/video', videoRoutes); // Видосики



// ---- ЗАПУСК ---- //
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});
