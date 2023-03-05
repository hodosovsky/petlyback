const { User } = require("../../db/userModel");

const logout = async (id) => {
  await User.findByIdAndUpdate(id, { token: null });
};

module.exports = { logout };
