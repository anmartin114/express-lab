const express = require("express");
const cartRoutes = express.Router();

const cart = [
  { id: 1, product: "bananas", price: 3, quantity: 5 },
  { id: 2, product: "apples", price: 4, quantity: 6 },
  { id: 3, product: "potatoes", price: 2, quantity: 4 },
  { id: 4, product: "pears", price: 2, quantity: 3 }
];
let nextId = 5;

cartRoutes.get("/", (req, res) => {
  res.send(cart);
});

cartRoutes.get("/cart", (req, res) => {
  res.json(cart);
  res.status(200);
});

cartRoutes.get("/cart/:id", (req, res) => {
  const id = parseInt(req.params.id);
  console.log(id);
  let foundItem = cart.find(item => item.id === id);
  if (foundItem) {
    res.status(200);
    res.json(foundItem);
  } else {
    res.status(404);
    res.send(`no item with id ${id}`);
  }
});

cartRoutes.post("/cart", (req, res) => {
  const item = req.body;
  item.id = nextId;
  nextId++;
  cart.push(item);
  res.status(201);
  res.json(item);
});

cartRoutes.put("/cart/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const item = req.body;
  item.id = id;
  const index = cart.findIndex(i => i.id === id);
  cart.splice(index, 1, item);
  res.json(item);
  res.status(200);
});

cartRoutes.delete("/cart/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = cart.findIndex(i => i.id === id);
  if (index !== -1) {
    cart.splice(index, 1);
  }
  res.sendStatus(204);
});

module.exports = cartRoutes;
