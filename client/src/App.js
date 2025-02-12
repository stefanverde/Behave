import React, { useState, useEffect } from 'react';
import './App.css'; // Import the CSS file for styling

// Main App Component
function App() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

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
    }, []); // Empty array ensures it runs only once when the component mounts

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
                        </tr>
                    );
                })}
                </tbody>
            </table>
        </div>
    );
}

export default App;