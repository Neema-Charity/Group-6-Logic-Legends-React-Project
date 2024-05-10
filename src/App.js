import './App.css';
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductInformation from './components/ProductInformation';
import Footer from './components/Footer';
import AdminPanel from './components/AdminPanel';
import SelectedProduct from './components/SelectedProducts';
import ProductsList from './components/ProductsList';
import WishList from './components/WishList'; // Import the Wishlist component

function App() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [wishlist] = useState([]); // Add wishlist state

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path='/' element={<ProductsList />} />
          <Route path='/products/:id' element={<ProductInformation setSelectedProduct={setSelectedProduct}/>} />
          <Route path='/admins' element={<AdminPanel />} />
          {/* Add route for the wishlist */}
          <Route path='/wishlist' element={<WishList wishlist={wishlist} />} />
        </Routes>
      </div>
      {selectedProduct && <SelectedProduct product={selectedProduct} />}
      <Footer />
    </Router>
  );
}

export default App;
