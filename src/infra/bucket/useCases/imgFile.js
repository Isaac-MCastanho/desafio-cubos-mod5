const s3 = require("../connectionS3");
const { cleanImageUrl } = require("../utils/imgFile");

exports.uploadImg = async (file) => {
  return await s3
    .upload({
      Bucket: process.env.BACKBLAZE_BUCKET,
      Key: `imagens/${file.originalname}`,
      Body: file.buffer,
      ContentType: file.mimetype,
    })
    .promise();
};

exports.deleteImg = async (pathFile) => {
  console.log(cleanImageUrl(pathFile));
  return await s3
    .deleteObject({
      Bucket: process.env.BACKBLAZE_BUCKET,
      Key: cleanImageUrl(pathFile),
    })
    .promise();
};
