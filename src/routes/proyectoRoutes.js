const express = require('express');
const router = express.Router();
const proyectoController = require('../controllers/proyectoController');

router.get('/', proyectoController.getAllProyectos);
router.get('/create', proyectoController.createProyectoForm);
router.post('/', proyectoController.createProyecto);
router.get('/:id/edit', proyectoController.editProyectoForm);
router.post('/:id/update', proyectoController.updateProyecto);
router.post('/:id/delete', proyectoController.deleteProyecto);

module.exports = router;
