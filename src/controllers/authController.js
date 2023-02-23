// const { changeAvatar } = require("../services/auth/changeAvatar");
// const { getCurrentUser } = require("./../services/auth/current");

// const registrationController = async (req, res) => {
//   const { email, password } = req.body;
//   const { userEmail, subscription, token, avatarURL } = await registration(
//     email,
//     password
//   );

//   res.status(201).json({
//     token,
//     user: {
//       email: userEmail,
//       subscription,
//       avatarURL,
//     },
//   });
// };

// const loginController = async (req, res) => {
//   const { email: reqEmail, password } = req.body;
//   const { token, _id, subscription, email } = await login(reqEmail, password);

//   res.status(200).json({ token, user: { userId: _id, email, subscription } });
// };

// const logoutController = async (req, res) => {
//   const [, token] = req.headers.authorization.split(" ");

//   await logout(token);

//   res.status(204).json();
// };

// const currentUserController = async (req, res) => {
//   const [, token] = req.headers.authorization.split(" ");

//   const { email, subscription } = await getCurrentUser(token);

//   res.status(200).json({ email, subscription });
// };

// const changeSubscriptionController = async (req, res) => {
//   const [, token] = req.headers.authorization.split(" ");

//   const { email, subscription } = await changeSubscription(token, req.body);

//   res.status(200).json({ email, subscription });
// };

// const changeAvatarController = async (req, res) => {
//   const [, token] = req.headers.authorization.split(" ");

//   const { _id } = await getCurrentUser(token);

//   const avatarURL = await changeAvatar(req.file, _id);

//   res.status(200).json({ avatarURL });
// };

// module.exports = {
//   changeSubscriptionController,
//   changeAvatarController,
// };
