const validator = require('../utilities/validate');

const saveClient = (req, res, next) => {
  const validationRule = {
    email: 'required|email',
    firstName: 'required|string',
    lastName: 'required|string',
    cellphone: 'required|string',
    company: 'required|string',
    city: 'required|string',
    country: 'required|string',
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err,
      });
    } else {
      next();
    }
  });
};

const saveService = (req, res, next) => {
  const validationRule = {
    type: 'required|string',
    departureCountry: 'required|string',
    arrivalCountry: 'required|string',
    dateOfDeparture: 'required|string',
    estimatedDateofArrival: 'required|string',
    clientCompany: 'required|string',
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err,
      });
    } else {
      next();
    }
  });
};

module.exports = {
  saveClient,
  saveService,
};
