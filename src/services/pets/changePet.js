const { Pet } = require("../../db/petModel");
const { WrongParametersError } = require("../../helpers/errors");
const patchPetById = async (petId, body, ownerId) => {
  const pet = await Pet.findOne({
    _id: petId,
    owner: ownerId,
  });
  if (!pet) {
    throw new WrongParametersError(`Contact with id '${petId}' not found`);
  }

  const updatedPet = await Pet.findOneAndUpdate(
    { _id: petId, owner: ownerId },
    {
      $set: body,
    },
    { new: true }
  );

  return updatedPet;
};

module.exports = { patchPetById };
