const { deletePetById } = require("../../services/pets/deletePet");

const deletePetController = async (req, res, next) => {
  const { petId } = req.params;
  const { _id: ownerId } = req.user;

  await deletePetById(petId, ownerId);
  res.json({ message: "pet deleted" });
};

module.exports = { deletePetController };
