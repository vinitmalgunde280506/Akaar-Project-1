
const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const ordersPath = path.join(__dirname, 'data/orders.json');

function readOrders() {
  return JSON.parse(fs.readFileSync(ordersPath));
}

function saveOrders(orders) {
  fs.writeFileSync(ordersPath, JSON.stringify(orders, null, 2));
}

router.post('/', (req, res) => {
  const order = req.body;
  const orders = readOrders();

  order.id = Date.now();
  orders.push(order);
  saveOrders(orders);
  res.json({ message: 'Order placed successfully', order });
});

router.get('/:username', (req, res) => {
  const username = req.params.username;
  const orders = readOrders();
  const userOrders = orders.filter(o => o.username === username);
  res.json(userOrders);
});

router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  let orders = readOrders();
  orders = orders.filter(o => o.id !== id);
  saveOrders(orders);
  res.json({ message: 'Order cancelled' });
});

module.exports = router;
