require('dotenv').config();
const express = require('express');
const path = require('path');
const app  = express();

// Configuración
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));

// Rutas
const tareaRoutes = require('./routes/tareaRoutes');
const proyectoRoutes = require('./routes/proyectoRoutes');
app.use('/tareas', tareaRoutes);
app.use('/proyectos', proyectoRoutes);

// Ruta principal
app.get('/', (req, res) => {
    res.redirect('/tareas');
});

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
