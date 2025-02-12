import React, { useState, useEffect } from 'react';
import './App.css'; // Import the CSS file for styling

// Main App Component
function App() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [newProduct, setNewProduct] = useState({ name: "", our_price: "", competitor_price: "" });
    // Fetch data from backend
    useEffect(() => {
        fetch("https://behave-kvfq.onrender.com/api/products")
            .then((response) => response.json())
            .then((data) => {
                setProducts(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
                setLoading(false);
            });
    }, []);
    // Empty array ensures it runs only once when the component mounts
    const handleAddProduct = (e) => {
        e.preventDefault();
        fetch("https://behave-kvfq.onrender.com/api/productsDyn", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newProduct),
        })
            .then((response) => response.json())
            .then((data) => {
                setProducts([...products, data]); // Update the product list
                setNewProduct({ name: "", our_price: "", competitor_price: "" }); // Reset the form
            })
            .catch((error) => console.error("Error adding product:", error));
    };

    // Handle removing a product
    const handleRemoveProduct = (id) => {
        fetch(`https://behave-kvfq.onrender.com/api/products/${id}`, {
            method: "DELETE",
        })
            .then(() => {
                setProducts(products.filter((product) => product.id !== id)); // Update the product list
            })
            .catch((error) => console.error("Error removing product:", error));
    };
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewProduct({ ...newProduct, [name]: value });
    };
    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="App">
            <h1>Product List</h1>
            <table className="product-table">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Our Price</th>
                    <th>Competitor Price</th>
                </tr>
                </thead>
                <tbody>
                {products.map((product) => {
                    // Ensure our_price is treated as a string
                    const ourPriceString = product.our_price.toString().replace(',', '.');
                    const ourPrice = parseFloat(ourPriceString);
                    const competitorPrice = parseFloat(product.competitor_price);
                    const priceClass = ourPrice > competitorPrice ? 'higher-price' : 'lower-price';

                    return (
                        <tr key={product.id}>
                            <td>{product.id}</td>
                            <td>{product.name}</td>
                            <td className={priceClass}>{product.our_price}</td>
                            <td>{product.competitor_price}</td>
                            <td>
                                {product.id > 3 && ( // Only show remove button for dynamic products
                                    <button onClick={() => handleRemoveProduct(product.id)}>Remove</button>
                                )}
                            </td>
                        </tr>
                    );
                })}
                </tbody>
            </table>
            <h2>Add New Product</h2>
            <form onSubmit={handleAddProduct}>
                <label>
                    Name:
                    <input
                        type="text"
                        name="name"
                        value={newProduct.name}
                        onChange={handleInputChange}
                        required
                    />
                </label>
                <label>
                    Our Price:
                    <input
                        type="text"
                        name="our_price"
                        value={newProduct.our_price}
                        onChange={handleInputChange}
                        required
                    />
                </label>
                <label>
                    Competitor Price:
                    <input
                        type="text"
                        name="competitor_price"
                        value={newProduct.competitor_price}
                        onChange={handleInputChange}
                        required
                    />
                </label>
                <button type="submit">Add Product</button>
            </form>
        </div>
    );
}

export default App;