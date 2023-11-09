const {
  saveOrdered,
  saveOrderedProducts,
  findOrderedByAll,
  findOrderProductsByOrdered,
} = require("../repositories/orderedRepository");
const { findById } = require("../repositories/productsRepository");

exports.createOrdered = async (req, res) => {
  const { order_date, order_products } = req.body;

  if (!order_date)
    return res.status(400).send({ message: "Order date is required!" });

  if (!order_products)
    return res.status(400).send({ message: "Products is required!" });

  let total_amount = 0;

  const productsData = order_products.map(async (productItem) => {
    const { product } = await findById(productItem.product_id);

    if (product) total_amount += productItem.quantity * product.price;
    return product;
  });
  const existProducts = await Promise.all(productsData).then((products) =>
    products.every((product) => !!product)
  );

  if (!existProducts)
    return res.status(404).json({ message: "Product/s not found!" });

  const ordered = await saveOrdered({ order_date, total_amount });
  order_products.map((productItem) => {
    const { product_id, quantity } = productItem;

    saveOrderedProducts({
      ordered_id: ordered.id,
      product_id,
      quantity,
    });
  });
  res.status(201).send();
};
exports.listOrders = async (req, res) => {
  const ordersList = await findOrderedByAll().then((orders) => {
    console.log(orders);
    return orders.map((ordered) => ({
      ordered,
    }));
  });

  const ordersProductsListPromise = ordersList.map(async (orderedItem) => {
    console.log(orderedItem);
    const orderProducts = await findOrderProductsByOrdered(
      orderedItem.ordered.id
    );
    orderedItem.order_products = orderProducts;
    return orderedItem;
  });

  const ordersProductsList = await Promise.all(ordersProductsListPromise);

  res.json(ordersProductsList);
};
