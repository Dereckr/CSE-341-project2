const express = require('express');
const router = express.Router();
const transController = require('../controllers/services');
const validator = require('../middleware/validator');

router.get('/', transController.getAll);

router.get('/:id', transController.getOne);

router.post('/', validator.saveService, transController.createService);

router.put('/:id', validator.saveService, transController.updateService);

router.delete('/:id', transController.deleteService);

module.exports = router;
