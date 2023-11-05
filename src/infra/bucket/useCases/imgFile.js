const s3 = require("../connectionS3");

exports.uploadImg = async (file) => {
  return await s3
    .upload({
      Bucket: process.env.BACKBLAZE_BUCKET,
      Key: file.originalname,
      Body: file.buffer,
      ContentType: file.mimetype,
    })
    .promise();
};
