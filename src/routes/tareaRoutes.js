const express = require('express');
const router = express.Router();
const tareaController = require('../controllers/tareaController');

router.get('/', tareaController.getAllTareas);
router.get('/create', tareaController.createTareaForm);
router.post('/', tareaController.createTarea);
router.get('/:id/edit', tareaController.editTareaForm);
router.post('/:id/update', tareaController.updateTarea);
router.post('/:id/delete', tareaController.deleteTarea);

module.exports = router;
