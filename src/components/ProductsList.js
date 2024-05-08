import React from 'react'
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import "./ProductsList.css"


function ProductsList() {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3000/products')
            .then(res => res.json())
            .then(data => setProducts(data))
    }, [])

    return (
        <div >
            <div>
                <h1 id="shoppers" className="bg-success p-2 text-white">SHOPPERS</h1>
            </div>
            <div className='products-list-container'> 
            {products.map(product => (
                <div className="bg-success p-2 text-dark bg-opacity-25" id="card" key={product.id}>
                    <img className='card-img-top rounded-circle product-image' src={product.image} alt={product.name} />
                    <h3>{product.name}</h3>
                    <p>${product.price}</p>
                    <Link style={{color: '#198754'}} to={`/products/${product.id}`}>INFO TO ORDER!</Link>
                </div>
            ))}
            </div>
        </div>
    )
}

export default ProductsList
