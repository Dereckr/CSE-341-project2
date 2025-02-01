const express = require('express');
const router = express.Router();
const clientsController = require('../controllers/clients');
const validator = require('../middleware/validator');
const { isAuthenticated } = require('../middleware/authenticate');

router.get('/', clientsController.getAll);

router.get('/:id', clientsController.getOne);

router.post(
  '/',
  isAuthenticated,
  validator.saveClient,
  clientsController.createClient
);

router.put(
  '/:id',
  isAuthenticated,
  validator.saveClient,
  clientsController.updateClient
);

router.delete('/:id', isAuthenticated, clientsController.deleteClient);

module.exports = router;
