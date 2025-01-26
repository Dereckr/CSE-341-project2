const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  //#swagger.tags=['Services']
  try {
    const result = await mongodb.getDb().db().collection('transportations').find();
    result.toArray().then((services) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(services);
    });
  } catch (error) {
    res.status(400).json({ message: err });
    console.error('Error displaying all clients', error);
  }
};

const getOne = async (req, res) => {
  //#swagger.tags=['Services']
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid contact id to find a service');
  }
  const userId = new ObjectId(req.params.id);
  const result = await mongodb
    .getDb()
    .db()
    .collection('transportations')
    .find({ _id: userId });
  result.toArray().then((users) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(users[0]);
  });
};

const createService = async (req, res) => {
  //#swagger.tags=['Services']
  const service = {
    type: req.body.type,
    departureCountry: req.body.departureCountry,
    arrivalCountry: req.body.arrivalCountry,
    dateOfDeparture: req.body.dateOfDeparture,
    estimatedDateofArrival: req.body.estimatedDateofArrival,
    clientCompany: req.body.clientCompany,
  };
  const response = await mongodb
    .getDb()
    .db()
    .collection('transportations')
    .insertOne(service);
  if (response.acknowledged) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(response.error || 'Some error ocurred while creating the service');
  }
};

const updateService = async (req, res) => {
  //#swagger.tags=['Services']
  if (!ObjectId.isValid(req.params.id)) {
    res
      .status(400)
      .json('Must use a valid transportation id to update a service');
  }
  const userId = new ObjectId(req.params.id);
  const user = {
    type: req.body.type,
    departureCountry: req.body.departureCountry,
    arrivalCountry: req.body.arrivalCountry,
    dateOfDeparture: req.body.dateOfDeparture,
    estimatedDateofArrival: req.body.estimatedDateofArrival,
    clientCompany: req.body.clientCompany,
  };
  const response = await mongodb
    .getDb()
    .db()
    .collection('transportations')
    .replaceOne({ _id: userId }, user);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(response.error || 'Some error ocurred while updating the service');
  }
};

const deleteService = async (req, res) => {
  //#swagger.tags=['Services']
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid contact id to delete a service');
  }
  const userId = new ObjectId(req.params.id);
  const response = await mongodb
    .getDb()
    .db()
    .collection('transportations')
    .deleteOne({ _id: userId });
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(response.error || 'Some error ocurred while deleting the client');
  }
};

module.exports = {
  getAll,
  getOne,
  createService,
  updateService,
  deleteService,
};
