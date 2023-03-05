const { changeUser } = require("../../services/user/patchUser");

const patchUserController = async (req, res) => {
  const { _id } = req.user;

  const { email, name, city, birthday, phone } = await changeUser(
    _id,
    req.body
  );

  res.status(200).json({ email, name, city, birthday, phone });
};

module.exports = { patchUserController };
