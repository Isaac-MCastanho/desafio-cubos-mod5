const { uploadImg } = require("../infra/bucket/useCases/imgFile");
const {
  saveProduct,
  findByAll,
  findById,
} = require("../repositories/productsRepository");

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

exports.getProductById = async (req, res) => {
  const { id } = req.params;
  const data = await findById(id);

  if (!data.product)
    return res.status(404).json({ message: "product not found" });

  res.status(200).json(data.product);
};
exports.listProducts = async (req, res) => {
  const products = await findByAll();

  res.status(200).json(products);
};
