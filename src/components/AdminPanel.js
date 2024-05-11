import React, { useEffect, useState } from 'react';
import "./ProductsList.css";
import Products from './Products';

import './AdminPanel.css'

import { Link } from 'react-router-dom';


function AdminPanel() {
    const [password, setPassword] = useState('');
    const [authenticated, setAuthenticated] = useState(false);

    const handlePasswordSubmition = (e) => {
        e.preventDefault();

        const passwordExpected = 'password';
        if (password === passwordExpected) {
            setAuthenticated(true);
        } else {
            alert('Wrong Password');
        }
    };

    const [adminproducts, setadminProducts] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3000/products')
            .then(res => res.json())
            .then(data => setadminProducts(data))
            .catch(error => console.error('Error fetching products:', error));
    }, []);

    const handleDeleteProduct = (productId) => {
        fetch(`http://localhost:3000/products/${productId}`, {
            method: 'DELETE',
        })
            .then(() => {
                setadminProducts(adminproducts.filter(product => product.id !== productId));
                console.log('Product deleted');
            })
            .catch(error => console.error('Error deleting product:', error));
    };

    const handleEditProduct = (productId) => {
        const newProduct = {};
        const newName = window.prompt('Enter new product name:', adminproducts.find(product => product.id === productId).name);
        if (newName !== null && newName.trim() !== '') {
            newProduct.name = newName.trim();
        }
        const newDescription = window.prompt('Enter new product description:', adminproducts.find(product => product.id === productId).description);
        if (newDescription !== null && newDescription.trim() !== '') {
            newProduct.description = newDescription.trim();
        }
        const newCategory = window.prompt('Enter new product category:', adminproducts.find(product => product.id === productId).category);
        if (newCategory !== null && newCategory.trim() !== '') {
            newProduct.category = newCategory.trim();
        }
        const newPrice = window.prompt('Enter new product price:', adminproducts.find(product => product.id === productId).price);
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
                setadminProducts(adminproducts.map(product => {
                    if (product.id === productId) {
                        return { ...product, ...newProduct };
                    }
                    return product;
                }));
                console.log('Product updated');
            })
            .catch(error => console.error('Error updating product:', error));
    };
    if (authenticated) {
        return (
            <>
                <div>

                    <h1 id='panel'>ADMINS PANEL </h1>

                    <Link className='btn ' to="/">Back</Link>
                    <h1>Admins Panel</h1>
                    <p>Welcome to the Admins Panel</p>
                    <p>Add a new product below:</p>

                    <Products />
                </div>
                <div className='products-list-container'>
                    {adminproducts.map(product => (
                        <div className="bg-success p-2 text-dark bg-opacity-25" id="card" key={product.id}>
                            <img className='card-img-top rounded-circle product-image' src={product.image} alt={product.name} />
                            <h3>{product.name}</h3>
                            <p>Description: {product.description}</p>
                            <p>Category: {product.category}</p>
                            <p>Price: ${product.price}</p>
                            <button onClick={() => handleDeleteProduct(product.id)}>Delete</button>
                            <button onClick={() => handleEditProduct(product.id)}>Edit</button>
                        </div>
                    ))}
                </div>
            </>
        )
    } else {
        return (
            <div>
                <Link className='btn' to="/">Back</Link>
                <h1 id='panel'>Welcome to the Admins Panel</h1>
                <p >Enter Password to proceed</p>
                <p>The password is <strong>password</strong></p>
                <form onSubmit={handlePasswordSubmition}>
                    <input type='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder='Enter Password ...'
                    />
                </form>
            </div>
        )
    }

}

export default AdminPanel;