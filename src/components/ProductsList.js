import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import "./ProductsList.css";
import Cart from './Cart';

function ProductsList() {

  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/products')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  return (
    <div>
      <Cart />
      <div>
        <h1 id="shoppers" className="bg-success p-2 text-white">SHOPPERS</h1>
      </div>
      <div><Link style={{ color: '#198754' }} className='btn btn-primary' to='/admins'>Admins Panel</Link></div>
      <div className='products-list-container'>
        {products.map(product => (
          <div className="bg-success p-2 text-dark bg-opacity-25" id="card" key={product.id}>
            <img className='card-img-top rounded-circle product-image' src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p>${product.price}</p>
            <Link style={{ color: '#198754' }} to={`/products/${product.id}`}>INFO TO ORDER!</Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductsList;