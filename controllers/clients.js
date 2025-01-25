const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  //#swagger.tags=['CLients']
  const result = await mongodb.getDb().db().collection('clients').find();
  result.toArray().then((clients) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(clients);
  });
};

const getOne = async (req, res) => {
  //#swagger.tags=['Clients']
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid contact id to find a contact');
  }
  const userId = new ObjectId(req.params.id);
  const result = await mongodb
    .getDb()
    .db()
    .collection('clients')
    .find({ _id: userId });
  result.toArray().then((users) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(users[0]);
  });
};

const createClient = async (req, res) => {
  //#swagger.tags=['Clients']
  const user = {
    email: req.body.email,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    cellphone: req.body.cellphone,
    company: req.body.company,
    city: req.body.city,
    country: req.body.country,
  };
  const response = await mongodb
    .getDb()
    .db()
    .collection('clients')
    .insertOne(user);
  if (response.acknowledged) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(response.error || 'Some error ocurred while updating the user');
  }
};

module.exports = {
  getAll,
  getOne,
  createClient,
};
