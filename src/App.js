import './App.css';
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Products from './components/Products';
// import ProductInformation from './components/ProductInformation';
import Footer from './components/Footer';
import AdminPanel from './components/AdminPanel';
import SelectedProduct from './components/SelectedProducts';
import ProductsList from './components/ProductsList';

function App() {
  const [selectedProduct, setSelectedProduct] = useState(null);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path='/' element={<ProductsList />} />
          <Route path='/products/:id' element={<ProductsList setSelectedProduct={setSelectedProduct}/>} />
          <Route path='/admins' element={<AdminPanel />}/>
        </Routes>
      </div>
      {selectedProduct && <SelectedProduct product={selectedProduct}/>}
        <Footer />
    </Router>
  );
}

export default App;
