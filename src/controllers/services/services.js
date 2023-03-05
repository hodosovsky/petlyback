
const { ValidationError } = require("../../helpers/errors");
const { Partners } = require("../../db/servicesModel");

const servicesController = async (req, res) => {
  const result = await Partners.find({});

  if (!result) {
    throw new ValidationError(404, "Not found");
  }

  res.json(result);
};

module.exports = servicesController;