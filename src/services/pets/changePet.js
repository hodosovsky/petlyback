const { Pet } = require("../../db/petModel");

const patchPetById = async (petId, body, ownerId) => {
  const pet = await Pet.findOne({
    _id: petId,
    owner: ownerId,
  });
  if (!pet) {
    throw new WrongParametersError(`Contact with id '${contactId}' not found`);
  }

  console.log(body);
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
