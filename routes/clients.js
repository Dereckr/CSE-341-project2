const express = require('express');
const router = express.Router();

const clientsController = require('../controllers/clients');

router.get('/', clientsController.getAll);

router.get('/:id', clientsController.getOne);

router.post('/', clientsController.createClient);

module.exports = router;
