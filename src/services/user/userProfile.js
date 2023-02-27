const { User } = require("../../db/userModel");
const { Pet } = require("../../db/petModel");
const { WrongParametersError } = require("../../helpers/errors");
const jsonwebtoken = require("jsonwebtoken");

const userProfile = async (id) => {
  const findedUser = await User.findByIdAndUpdate(id).select([
    "-password",
    "-createdAt",
    "-updatedAt",
    "-token",
    "-userPets",
    "-favorites",
  ]);
  if (!findedUser) throw new WrongParametersError("user not found");

  const pets = await Pet.find({ owner: findedUser._id }).sort({
    updatedAt: -1,
  });

  if (!pets.length) console.log(pets);
  return { findedUser, pets: pets.length ? pets : null };
};

module.exports = { userProfile };
