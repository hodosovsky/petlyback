const { patchPetById } = require("../../services/pets/changePet");

const patchPetController = async (req, res) => {
  const { petId } = req.params;
  const { _id: ownerId } = req.user;

  const updatedPet = await patchPetById(petId, req.body, ownerId);

  res.status(200).json(updatedPet);
};

module.exports = { patchPetController };
