const express = require('express');
const router = express.Router();
const clientsController = require('../controllers/clients');
const validator = require('../middleware/validator');

router.get('/', clientsController.getAll);

router.get('/:id', clientsController.getOne);

router.post('/', validator.saveClient, clientsController.createClient);

router.put('/:id', validator.saveClient, clientsController.updateClient);

router.delete('/:id', clientsController.deleteClient);

module.exports = router;
