const { Pet } = require("../../db/petModel");
const { WrongParametersError } = require("../../helpers/errors");
const patchPetById = async (petId, body, ownerId) => {
  const updatedPet = await Pet.findOneAndUpdate(
    { _id: petId, owner: ownerId },
    {
      $set: body,
    },
    { new: true }
  );

  if (!updatedPet) {
    throw new WrongParametersError(`Pet with id '${petId}' not found`);
  }

  return updatedPet;
};

module.exports = { patchPetById };
