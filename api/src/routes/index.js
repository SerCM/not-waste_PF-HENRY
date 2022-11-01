const { Router } = require("express");
const { postCustomer,
   getCallCustomer,
   disableCustomer,
   restoreCustomer
  } = require("../controllers/customer");
const { getCityInfo, postCity } = require("../controllers/city");
const {
  getSellers,
  postSeller,
  putSeller,
  restoreSeller,
  disableSeller,
} = require("../controllers/seller");
const {
  getProducts,
  postProduct,
  putProduct,
  deleteProduct,
  getProductsById,
  restoreProduct,
  disableProduct,
} = require("../controllers/product");
const {
  getPosts,
  postPost,
  putPost,
  deletePost,
  getPostById,
  restorePost,
  disablePost,
  disablePostForce,
} = require("../controllers/post");
const {
  getManagerById,
  getAllManager,
  postManager,
  putManager,
} = require("../controllers/manager");
const {
  getOrderById,
  getAllOrder,
  postOrder,
  deleteOrder,
  putOrder,
  putOrderReview,
  disableOrder,
  restoreOrder,
} = require("../controllers/order");
const { getDiets, postDiet } = require("../controllers/diets");
const {
  post_create_preference,
  get_feedback,
} = require("../controllers/mercadopago");

const enviarMail = require("../controllers/notificaciones");

const router = Router();

//Rutas del Seller
router.get("/seller", getSellers);
router.post("/seller", postSeller);
router.put("/seller/:id", putSeller);
router.put("/seller/restore/:id", restoreSeller);
router.put("/seller/disable/:id", disableSeller);

//Rutas del Product
router.get("/product/:id", getProductsById);
router.get("/product", getProducts);
router.post("/product", postProduct);
router.put("/product/:id", putProduct);
router.delete("/product/:id", deleteProduct);
router.put("/product/restore/:id", restoreProduct);
router.put("/product/disable/:id", disableProduct);

//Rutas del Post
router.get("/post/:id", getPostById);
router.get("/post", getPosts);
router.post("/post", postPost);
router.delete("/post/:id", deletePost);
router.put("/post/:id", putPost);
router.put("/post/restore/:id", restorePost);
router.put("/post/disable/:id", disablePost);
router.put("/post/disableForce/:id", disablePostForce);

//Aca van las rutas del Customer
router.get("/customer", getCallCustomer);
router.post("/customer", postCustomer);
router.put("/customer/disabled/:id", disableCustomer);
router.put("/customer/restore/:id", restoreCustomer);

//Rutas del Manager
router.get("/manager/:id", getManagerById);
router.get("/manager", getAllManager);
router.post("/manager", postManager);
router.put("/manager/:id", putManager);

//Rutas de City
router.get("/city", getCityInfo);
router.post("/city", postCity);

//Rutas de Order
router.get("/order/:id", getOrderById);
router.get("/order", getAllOrder);
router.post("/order", postOrder);
router.delete("/order/:id", deleteOrder);
router.put("/order/:id", putOrder);
router.put("/orderReview/:id", putOrderReview);
router.put("/order/disable/:id", disableOrder);
router.put("/order/restore/:id", restoreOrder);

//Ruta de Dietas
router.get("/diets", getDiets);
router.post("/city", postDiet);

//mercadopago -->
router.post("/create_preference", post_create_preference);
router.get("/feedback", get_feedback);
//<-- mercadopago

//notificaciones -->
router.post("/notificaciones", enviarMail);
// <-- notificaciones
module.exports = router;
