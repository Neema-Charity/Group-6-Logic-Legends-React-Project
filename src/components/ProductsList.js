import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import "./ProductsList.css";
import Cart from './Cart';

function ProductsList() {
<<<<<<< HEAD
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3000/products')
            .then(res => res.json())
            .then(data => setProducts(data))
            .catch(error => console.error('Error fetching products:', error));
    }, []);

    const handleDeleteProduct = (productId) => {
        fetch(`http://localhost:3000/products/${productId}`, {
            method: 'DELETE',
        })
        .then(() => {
            setProducts(products.filter(product => product.id !== productId));
            console.log('Product deleted');
        })
        .catch(error => console.error('Error deleting product:', error));
    };

    const handleEditProduct = (productId) => {
        const newProduct = {};
        const newName = window.prompt('Enter new product name:', products.find(product => product.id === productId).name);
        if (newName !== null && newName.trim() !== '') {
            newProduct.name = newName.trim();
        }
        const newDescription = window.prompt('Enter new product description:', products.find(product => product.id === productId).description);
        if (newDescription !== null && newDescription.trim() !== '') {
            newProduct.description = newDescription.trim();
        }
        const newCategory = window.prompt('Enter new product category:', products.find(product => product.id === productId).category);
        if (newCategory !== null && newCategory.trim() !== '') {
            newProduct.category = newCategory.trim();
        }
        const newPrice = window.prompt('Enter new product price:', products.find(product => product.id === productId).price);
        if (newPrice !== null && !isNaN(newPrice.trim())) {
            newProduct.price = parseFloat(newPrice.trim());
        }

        fetch(`http://localhost:3000/products/${productId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newProduct),
        })
        .then(() => {
            setProducts(products.map(product => {
                if (product.id === productId) {
                    return { ...product, ...newProduct };
                }
                return product;
            }));
            console.log('Product updated');
        })
        .catch(error => console.error('Error updating product:', error));
    };

    return (
        <div>
            <div>
                <h1 id="shoppers" className="bg-success p-2 text-white">SHOPPERS</h1>
            </div>
            <Cart />
            <div className='products-list-container'>
                {products.map(product => (
                    <div className="bg-success p-2 text-dark bg-opacity-25" id="card" key={product.id}>
                        <img className='card-img-top rounded-circle product-image' src={product.image} alt={product.name} />
                        <h3>{product.name}</h3>
                        <p>Description: {product.description}</p>
                        <p>Category: {product.category}</p>
                        <p>Price: ${product.price}</p>
                        <Link style={{ color: '#198754' }} to={`/products/${product.id}`}>INFO TO ORDER!</Link>
                        <button onClick={() => handleDeleteProduct(product.id)}>Delete</button>
                        <button onClick={() => handleEditProduct(product.id)}>Edit</button>
                    </div>
                ))}
            </div>
        </div>
    )
=======

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
      <div><Link style={{ color: '#198754' }} to='/admins'>Admins Panel</Link></div>
    </div>
  );
>>>>>>> 541508d74e58a0ad0ca94eaa20fdc37006476ef6
}

export default ProductsList;
