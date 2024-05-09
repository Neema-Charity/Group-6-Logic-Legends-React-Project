import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Products from './components/Products';
import ProductInformation from './components/ProductInformation';
import AdminPanel from './components/AdminPanel';
import Footer from './components/Footer';
import AdminPanel from './components/AdminPanel';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path='/' element={<Products />} />
          <Route path='/products/:id' element={<ProductInformation />} />
          <Route path='/admins' element={<AdminPanel />}/>
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
// import './App.css';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Products from './components/Products';
// import ProductInformation from './components/ProductInformation';
// import Footer from './components/Footer';

// function App() {
//   return (
//     <Router>
//       <div className="App">
//         <Routes>
//           <Route path='/' element={<Products />} />
//           <Route path='/products/:id' element={<ProductInformation />} />
//         </Routes>
//         <Footer />
//       </div>
//     </Router>
//   );
// }

// export default App;
