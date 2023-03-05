const { Notices } = require("../../db/noticesModel");
const { NotAuthorizedError } = require("../../helpers/errors");

const patchNoticeService = async (noticeId, userId, body) => {
  const { owner } = await Notices.findById(noticeId);

  if (owner.toString() !== userId.toString()) {
    throw new NotAuthorizedError("You are not owner of this pet");
  }

  const updatedPet = await Notices.findByIdAndUpdate(
    noticeId,
    { ...body },
    { new: true }
  );

  return updatedPet;
};

module.exports = { patchNoticeService };
