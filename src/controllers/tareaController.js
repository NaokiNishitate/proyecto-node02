const Tarea = require('../models/tareaModel');
const Proyecto = require('../models/proyectoModel');
const path = require('path');
const fs = require('fs');
const upload = require('../middlewares/upload');

exports.getAllTareas = async (req, res) => {
    try {
        const tareas = await Tarea.findAll({
            include: [{
                model: Proyecto,
                as: 'Proyecto'
            }]
        });
        res.render('tareas/index', { tareas });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener las tareas');
    }
};

exports.createTareaForm = async (req, res) => {
    try {
        const proyectos = await Proyecto.findAll();
        res.render('tareas/create', { proyectos });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al cargar el formulario');
    }
};

exports.createTarea = [
    upload.single('imagen'),
    async (req, res) => {
        try {
            const { titulo, descripcion, proyecto_id } = req.body;

            if (!req.file) {
                return res.status(400).send('La imagen es requerida');
            }

            const imagenPath = '/uploads/' + req.file.filename;

            await Tarea.create({
                titulo,
                descripcion,
                imagen: imagenPath,
                proyecto_id
            });

            res.redirect('/tareas');
        } catch (error) {
            console.error(error);
            res.status(500).send('Error al crear la tarea');
        }
    }
];

exports.editTareaForm = async (req, res) => {
    try {
        const tarea = await Tarea.findByPk(req.params.id, {
            include: [{
                model: Proyecto,
                as: 'Proyecto'
            }]
        });

        if (!tarea) {
            return res.status(404).send('Tarea no encontrada');
        }

        const proyectos = await Proyecto.findAll();
        res.render('tareas/edit', { tarea, proyectos });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al cargar el formulario');
    }
};

exports.updateTarea = [
    upload.single('imagen'),
    async (req, res) => {
        try {
            const { titulo, descripcion, proyecto_id } = req.body;
            const tarea = await Tarea.findByPk(req.params.id);

            if (!tarea) {
                return res.status(404).send('Tarea no encontrada');
            }

            let imagenPath = tarea.imagen;

            if (req.file) {
                // Eliminar la imagen anterior si existe
                if (imagenPath) {
                    const oldImagePath = path.join(__dirname, '../../public', imagenPath);
                    if (fs.existsSync(oldImagePath)) {
                        fs.unlinkSync(oldImagePath);
                    }
                }

                // Actualizar con la nueva imagen
                imagenPath = '/uploads/' + req.file.filename;
            }

            await tarea.update({
                titulo,
                descripcion,
                imagen: imagenPath,
                proyecto_id
            });

            res.redirect('/tareas');
        } catch (error) {
            console.error(error);
            res.status(500).send('Error al actualizar la tarea');
        }
    }
];

exports.deleteTarea = async (req, res) => {
    try {
        const tarea = await Tarea.findByPk(req.params.id);

        if (!tarea) {
            return res.status(404).send('Tarea no encontrada');
        }

        // Eliminar la imagen asociada si existe
        if (tarea.imagen) {
            const imagePath = path.join(__dirname, '../../public', tarea.imagen);
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
            }
        }

        await tarea.destroy();
        res.redirect('/tareas');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al eliminar la tarea');
    }
};
