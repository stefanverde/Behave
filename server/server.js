const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3001;

// Middleware
app.use(cors()); // Permite requesturi din frontend
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

// Endpoint pentru a obține produsele
app.get("/api/products", (req, res) => {
    res.json(products);
});

// Pornirea serverului
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
