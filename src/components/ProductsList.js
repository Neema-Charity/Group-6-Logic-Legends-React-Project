import React, {useEffect,useState} from 'react';
import { Link } from 'react-router-dom';
import "./ProductsList.css";
import Cart from './Cart';
import Button from 'react-bootstrap/Button';

function ProductsList() {

  const [product, setProducts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/products')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  return (
    <div>
      <div>
        <h1 id="shoppers" className="bg-success p-2 text-white">SHOPPERS</h1>
      </div>
checkout

      <div className="buttoncontainer">
        <Cart />
        <div className='adminpanel'>
          <Button variant="secondary" style={{ backgroundColor: '#198754' }}>
            <Link style={{ color: 'white' }} to='/admins'>Admins Panel</Link>
          </Button>{' '}
        </div>
      </div>


      <div><Link style={{ color: '#198754' }} className='admin-btn btn-primary' to='/admins'>Admins Panel</Link></div> master
      <div className='products-list-container'>
        {products.map(product => (
          <div className="bg-success p-2 text-dark bg-opacity-25" id="card" key={product.id}>
            <img className='card-img-top rounded-circle product-image' src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p>${product.price}</p>
            {/* Corrected Link to point to the product's page */}
            <Link style={{ color: '#198754' }} to={`/products/${product.id}`}>INFO TO ORDER!</Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductsList;
