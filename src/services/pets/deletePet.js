const { Pet } = require("../../db/petModel");
const { User } = require("../../db/userModel");
const { WrongParametersError } = require("../../helpers/errors");

const deletePetById = async (petId, ownerId) => {
  const pet = await Pet.findOne({
    _id: petId,
    owner: ownerId,
  });

  if (!pet) {
    throw new WrongParametersError(`Pet with id '${petId}' not found`);
  }

  await Pet.findOneAndRemove({
    _id: petId,
    owner: ownerId,
  });

  await User.findByIdAndUpdate(ownerId, {
    $pull: { userPets: petId },
  });
};

module.exports = { deletePetById };
