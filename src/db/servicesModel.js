const { model, Schema } = require("mongoose");

const servicesSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  addressUrl: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  workDays: {
    type: Array,
    required: false,
  },
  phone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
});

const Partners = model("partners", servicesSchema);

module.exports = {
    Partners,
};