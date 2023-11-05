const { uploadImg } = require("../infra/bucket/useCases/imgFile");
const { saveProduct } = require("../repositories/productsRepository");

exports.createProduct = async (req, res) => {
  const { describe, price } = req.query;
  const { file } = req;

  if (!describe)
    return res.status(400).json({ message: "describe is required!" });
  if (!price) return res.status(400).json({ message: "price is required!" });

  try {
    let imgFile = null;
    const product = { describe, price };

    if (file) {
      imgFile = await uploadImg(file);
      product.product_img = imgFile.Location;
    }

    const productData = await saveProduct(product);
    return res.status(201).json(productData);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ mensagem: "Internal service error." });
  }
};
