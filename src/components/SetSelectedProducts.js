import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductInformation from './ProductInformation';
import Checkout from './Checkout';

function App() {
    const [selectedProducts, setSelectedProducts] = useState([]);

    const addToCart = (product) => {
        setSelectedProducts(prevProducts => [...prevProducts, product]);
    };

    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/" element={<ProductInformation addToCart={addToCart} />} />
                    <Route path="/checkout" element={<Checkout selectedProducts={selectedProducts} />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
