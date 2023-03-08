const fs = require("fs");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET,
});

const petPhotoUpload = async (file, folder, filename) => {
  const cloudFilePath = folder + "/" + filename;

  const options = {
    public_id: cloudFilePath + Math.floor(Math.random() * 10000),
    overwrite: true,
  };
  console.log("public_id:", options.public_id);

  try {
    const { url } = await cloudinary.uploader.upload(file, options);

    await fs.unlinkSync(file);

    return {
      message: "Upload success",
      url,
    };
  } catch (error) {
    fs.unlinkSync(file);

    return {
      message: "Upload fail",
      error,
    };
  }
};

module.exports = { petPhotoUpload };
