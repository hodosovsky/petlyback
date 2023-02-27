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

  //  await User.findByIdAndUpdate(
  //   ownerId,
  //   { $pull: { userPets: petId } },
  //   { new: true }
  // );

  const user = await User.findById(ownerId);

  if (!user) throw new WrongParametersError("User not found");

  const idx = user.userPets.indexOf(petId);
  user.userPets.splice(idx, 1);
  await user.save();
};

module.exports = { deletePetById };
