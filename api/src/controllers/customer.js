const { Customer } = require("../db");
const clientes = [
  {
    id: 1,
    name: "Juan",
    password: "12345",
    email: "carlos@gmail.com",
    image: "hola",
    city: "Palermo",
  },
  {
    id: 2,
    name: "Carlos",
    password: "12345",
    email: "carlos@gmail.com",
    image: "hola",
    city: "Palermo",
  },
  {
    id: 3,
    name: "Marcos",
    password: "12345",
    email: "carlos@gmail.com",
    image: "hola",
    city: "Palermo",
  },
];
const getCallCustomer = async (req, res) => {
  try {
  
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getCallCustomer,
};
