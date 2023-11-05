const { BACKBLAZE_BUCKET, BUCKET_ENDPOINT } = process.env;

exports.cleanImageUrl = (url) => {
  return url.replace(`https://${BACKBLAZE_BUCKET}.${BUCKET_ENDPOINT}/`, "");
};
