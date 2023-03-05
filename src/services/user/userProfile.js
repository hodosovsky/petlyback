const { Pet } = require("../../db/petModel");

const userProfile = async (id) => {
  const pets = await Pet.find({ owner: id }).sort({
    updatedAt: -1,
  });

  return { pets: pets.length ? pets : [] };
};

module.exports = { userProfile };
