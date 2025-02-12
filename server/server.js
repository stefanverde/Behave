const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3001;

// Middleware
app.use(cors({
    origin: ['https://behave-client.onrender.com', 'http://localhost:3000'], // Allow requests from your frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
    credentials: true, // Allow cookies and credentials
}));
app.use(express.json()); // Permite procesarea JSON-ului

// Datele produselor (stocate în memorie)
const products = [
    {
        id: 1,
        name: "Laptop Gaming Pro",
        our_price: "3589,99",
        competitor_price: 3599,
    },
    {
        id: 2,
        name: "Tastatura mecanică",
        our_price: 499,
        competitor_price: 449,
    },
    {
        id: 3,
        name: "Mouse gaming",
        our_price: 249,
        competitor_price: 299,
    },
];
let dynamicProducts = [];
// Endpoint pentru a obține produsele
app.get("/api/products", (req, res) => {
    res.json([...products, ...dynamicProducts]);
});
app.post("/api/productsDyn", (req, res) => {
    const newProduct = {
        id: products.length + dynamicProducts.length + 1, // Simple ID generation
        ...req.body,
    };
    dynamicProducts.push(newProduct);
    res.status(201).json(newProduct);
});
app.delete("/api/products/:id", (req, res) => {
    const productId = parseInt(req.params.id);
    dynamicProducts = dynamicProducts.filter((product) => product.id !== productId);
    res.status(204).send();
});
//i will say this beforehand, this is a bad example, we shouldn't use index as id, but it's for simplicity and adding some features

// Pornirea serverului
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
