const item = require("../models/Item");

const getItems = async (req, res) => {
  const items = await item.find({});
  res.status(200).send(items);
};

module.exports = {
  getItems
};
