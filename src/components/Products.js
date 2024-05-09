import React, { useEffect, useState } from 'react'
// import { Link } from 'react-router-dom';
import "./Products.css";
// import ProductsList from './ProductsList';
import NewProductForm from './NewProductForm';

function Products() {

  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/products')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  const handleAddProduct = (newProduct) => {

    setProducts([...products, newProduct]);

    fetch('http://localhost:3000/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newProduct)
    })
      .then(res => res.json())
      .then(data => console.log('New Product added', data))
      .catch(error => console.error('Error in adding new Product', error))

  }

  return (
    <div>
      <NewProductForm onAddProduct={handleAddProduct} />
      {/* <ProductsList products={products} /> */}
      {/* <Link style={{ color: '#198754' }} to='/admins'>Admins Panel</Link> */}
    </div>
  )
}

export default Products
