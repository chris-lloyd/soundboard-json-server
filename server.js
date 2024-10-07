const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(bodyParser.json());

// Allow CORS from a specific origin (replace with your target website)
const allowedOrigin =
  "https://soundboard-wyzc-1cc9rmljx-christophers-projects-1cbade26.vercel.app/"; // Change to your target website
app.use(
  cors({
    origin: allowedOrigin,
  })
);

// Path to the JSON file
const dataPath = path.join(__dirname, "db.json");

console.log({ dataPath });

// Helper function to read data from the JSON file
const readData = () => {
  const data = fs.readFileSync(dataPath);
  return JSON.parse(data);
};

// Helper function to write data to the JSON file
const writeData = (data) => {
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
};

// Get all items
app.get("/playlist", (req, res) => {
  const items = readData();
  console.log({ items: JSON.stringify(items) });

  res.json(items);
});

// Create a new item
app.post("/playlist", (req, res) => {
  const items = readData();
  const newItem = { id: items.length + 1, ...req.body };
  items.push(newItem);
  writeData(items);
  res.status(201).json(newItem);
});

// Delete an item by ID
app.delete("/playlist/:id", (req, res) => {
  const items = readData();
  const newItems = items.filter((i) => i.id !== parseInt(req.params.id));
  if (newItems.length < items.length) {
    writeData(newItems);
    res.status(204).send();
  } else {
    res.status(404).json({ message: "Item not found" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
