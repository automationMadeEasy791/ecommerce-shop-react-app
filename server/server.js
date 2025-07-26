const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

let orders = [];

app.get("/api/orders", (req, res) => {
  res.json(orders);
});

app.post("/api/orders", (req, res) => {
  const { name, email, address, payment, date, total, products } = req.body;

  // Basic validation
  if (!name || !email || !payment || !Array.isArray(products)) {
    return res.status(400).json({ error: "Missing required order fields" });
  }

  const newOrder = {
    id: orders.length + 1,
    name: name.trim(),
    email: email.trim().toLowerCase(),
    address: address?.trim() || "",
    payment,
    date: date || new Date().toISOString(),
    total: typeof total === "number" ? total : 0,
    status: "completed",
    products: products.map((p) => ({
      productId: p.productId || p.id,
      name: p.name,
      quantity: p.quantity || 1,
      price: p.price,
    })),
  };

  orders.push(newOrder);
  console.log("✅ New order received:", newOrder);
  res.status(201).json(newOrder);
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
