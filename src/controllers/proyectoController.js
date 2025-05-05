const Proyecto = require('../models/proyectoModel');

exports.getAllProyectos = async (req, res) => {
    try {
        const proyectos = await Proyecto.findAll();
        res.render('proyectos/index', { proyectos });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener los proyectos');
    }
};

exports.createProyectoForm = (req, res) => {
    res.render('proyectos/create');
};

exports.createProyecto = async (req, res) => {
    try {
        const { nombre } = req.body;
        await Proyecto.create({ nombre });
        res.redirect('/proyectos');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al crear el proyecto');
    }
};

exports.editProyectoForm = async (req, res) => {
    try {
        const proyecto = await Proyecto.findByPk(req.params.id);
        if (!proyecto) {
            return res.status(404).send('Proyecto no encontrado');
        }
        res.render('proyectos/edit', { proyecto });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener el proyecto');
    }
};

exports.updateProyecto = async (req, res) => {
    try {
        const { nombre } = req.body;
        const proyecto = await Proyecto.findByPk(req.params.id);
        if (!proyecto) {
            return res.status(404).send('Proyecto no encontrado');
        }
        await proyecto.update({ nombre });
        res.redirect('/proyectos');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al actualizar el proyecto');
    }
};

exports.deleteProyecto = async (req, res) => {
    try {
        const proyecto = await Proyecto.findByPk(req.params.id);
        if (!proyecto) {
            return res.status(404).send('Proyecto no encontrado');
        }
        await proyecto.destroy();
        res.redirect('/proyectos');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al eliminar el proyecto');
    }
};
