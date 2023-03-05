const { addPet } = require("../../services/pets/addPet");

const addPetController = async (req, res) => {
  const { _id: ownerId } = req.user;

  const newPet = await addPet(req.body, req.file, ownerId);

  res.status(201).json({ newPet });
};

module.exports = { addPetController };
