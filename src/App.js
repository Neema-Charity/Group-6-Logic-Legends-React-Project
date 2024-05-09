import './App.css';
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductInformation from './components/ProductInformation';
import Footer from './components/Footer';
import AdminPanel from './components/AdminPanel';
import SelectedProducts from './components/SelectedProducts';
import ProductsList from './components/ProductsList';

function App() {
  const [selectedProducts, setSelectedProducts] = useState([]);

  const addToCart = (product) => {
    setSelectedProducts(prevSelectedProducts => [...prevSelectedProducts, product]);
  };

  

  return (
    <div>
      
      <Router>
        <div className="App">
          <Routes>
            <Route path='/' element={<ProductsList />} />
            <Route path='/products/:id' element={<ProductInformation addToCart={addToCart} />} />
            <Route path='/admins' element={<AdminPanel />} />
          </Routes>
        </div>
        {selectedProducts.length > 0 && <SelectedProducts products={selectedProducts} />}
        <Footer />
      </Router>
    </div>
  );
}

export default App;
