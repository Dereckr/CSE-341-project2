const express = require('express');
const router = express.Router();
const transController = require('../controllers/services');
const validator = require('../middleware/validator');
const { isAuthenticated } = require('../middleware/authenticate');

router.get('/', transController.getAll);

router.get('/:id', transController.getOne);

router.post(
  '/',
  isAuthenticated,
  validator.saveService,
  transController.createService
);

router.put(
  '/:id',
  isAuthenticated,
  validator.saveService,
  transController.updateService
);

router.delete('/:id', isAuthenticated, transController.deleteService);

module.exports = router;
