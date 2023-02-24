const { model, Schema } = require("mongoose");

const newsSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
});

const News = model("news", newsSchema);

module.exports = {
  News,
};
