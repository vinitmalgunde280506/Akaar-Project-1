
const fs = require('fs');
const path = require('path');
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.json());



console.log("🚀 Server file has started...");

app.use(express.static("public")); 


app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/Akaar2.html");
});
app.post("/api/order", (req, res) => {
  const order = req.body;
  const filePath = path.join(__dirname, "data", "orders.json");

  fs.readFile(filePath, "utf-8", (err, data) => {
    let orders = [];
    if (!err && data) {
      orders = JSON.parse(data);
    }

   
    const newOrder = {
      id: Date.now(),
      ...order,
      status: "Placed",
      estimatedDelivery: "5-7 Days"
    };
    orders.push(newOrder);

  
    fs.writeFile(filePath, JSON.stringify(orders, null, 2), err => {
      if (err) {
        console.error("Error saving order:", err);
        return res.status(500).json({ success: false, message: "Failed to save order" });
      }
      res.json({ success: true, message: "Order placed", order: newOrder });
    });
  });
});


app.listen(port, () => {
  console.log(`✅ Server running at: http://localhost:${port}`);
});
