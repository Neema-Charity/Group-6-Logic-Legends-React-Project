import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ProductInformation from "./components/ProductInformation";
import AdminPanel from "./components/AdminPanel";
import SelectedProducts from "./components/SelectedProducts";
import ProductsList from "./components/ProductsList";
import Footer from "./components/Footer";
import CheckoutForm from "./components/CheckoutForm";
import "./App.css"; // Import your CSS file

function App() {
  const [selectedProducts, setSelectedProducts] = useState([]);

  const addToCart = (product) => {
    setSelectedProducts((prevSelectedProducts) => [
      ...prevSelectedProducts,
      product,
    ]);
  };

  const clearCart = () => {
    setSelectedProducts([]);
  };

  return (
    <div>
      <Router>
        <div className="App">
          <nav className="navbar">
            <ul className="nav-links"> {/* Change the paragraph to unordered list */}
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/admins">Admins</Link>
              </li>
              <li>
                <Link to="/checkout">Checkout</Link>
              </li>
            </ul>
          </nav>
          <Routes>
            <Route path="/" element={<ProductsList />} />
            <Route
              path="/products/:id"
              element={<ProductInformation addToCart={addToCart} />}
            />
            <Route path="/admins" element={<AdminPanel />} />
            <Route
              path="/checkout"
              element={<CheckoutForm cartItems={selectedProducts} clearCart={clearCart} />}
            />
          </Routes>
          {selectedProducts.length > 0 && (
            <SelectedProducts products={selectedProducts} />
          )}
          <Footer />
        </div>
      </Router>
    </div>
  );
}

export default App;
