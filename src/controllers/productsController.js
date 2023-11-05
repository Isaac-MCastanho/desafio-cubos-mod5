const aws = require("aws-sdk");
const { saveProduct } = require("../repositories/productsRepository");

exports.createProduct = async (req, res) => {
  const { describe, price } = req.query;
  const { file } = req;

  const endpoint = new aws.Endpoint(process.env.BUCKET_ENDPOINT);

  const s3 = new aws.S3({
    endpoint,
    credentials: {
      accessKeyId: process.env.KEY_ID,
      secretAccessKey: process.env.APPLICATION_KEY,
    },
  });

  if (!describe)
    return res.status(400).json({ message: "describe is required!" });
  if (!price) return res.status(400).json({ message: "price is required!" });

  try {
    let imgFile = null;
    const product = { describe, price };
    if (file) {
      imgFile = await s3
        .upload({
          Bucket: process.env.BACKBLAZE_BUCKET,
          Key: file.originalname,
          Body: file.buffer,
          ContentType: file.mimetype,
        })
        .promise();
      product.product_img = imgFile.Location;
    }
    const productData = await saveProduct(product);
    return res.status(201).json(productData);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ mensagem: "Internal service error." });
  }
};
