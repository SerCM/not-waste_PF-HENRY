const { Router } = require("express");
const { getSellerByCity } = require("../controllers/seller");
const { getCallCustomer } = require("../controllers/customer");
const { getManager, getManagerById } = require("../controllers/manager");

const router = Router();
router.get("/hola/:city", getSellerByCity);

//Aca van las rutas del Customers

router.get("/customer", getCallCustomer);

router.get("/manager", getManager);

router.get("/manager/:id", getManagerById);

module.exports = router;
