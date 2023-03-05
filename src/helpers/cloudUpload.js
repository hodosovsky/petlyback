const fs = require("fs");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET,
});

const cloudUpload = async (file, folder, filename) => {
  const cloudFilePath = folder + "/" + filename;

  const options = {
    public_id: cloudFilePath,
    overwrite: true,
    transformation: [{ width: 250, height: 250, crop: "fit" }],
  };

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

module.exports = { cloudUpload };
