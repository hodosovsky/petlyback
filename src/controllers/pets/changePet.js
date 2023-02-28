const { patchPetById } = require("../../services/pets/changePet");

const patchPetController = async (req, res, next) => {
  const { petId } = req.params;
  const { _id: ownerId } = req.user;
  console.log(req.file);
  const updatedPet = await patchPetById(petId, req.body, ownerId);

  res.status(200).json(updatedPet);
};

module.exports = { patchPetController };
