import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Products from './components/Products';
import ProductInformation from './components/ProductInformation';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path='/' element={<Products/>}/>
          <Route path='/products/:id' element={<ProductInformation />}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
