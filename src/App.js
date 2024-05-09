import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
          {/* Route to display the list of products */}
          <Route path='/' element={<ProductsList />} />

          {/* Route to display individual product information */}
          <Route path='/products/:id' element={<ProductsList setSelectedProduct={setSelectedProduct}/>} />

          {/* Route to display the admin panel */}
          <Route path='/admins' element={<AdminPanel />}/>
        </Routes>
      </div>
      {/* Conditionally render the SelectedProduct component */}
      {selectedProduct && <SelectedProduc product={selectedProduct}/>}
      <Footer />
    </Router>
  );
}

export default App;
