import React from 'react';
import "./SelectedProducts.css"

function SelectedProducts({ products }) {
    return (
        <div className='selected-products-container'>
            {products.map(product => (
                <div key={product.id} className="product-details">
                    <img className='selected-product-image' src={product.image} alt={product.name} />
                    <h3>{product.name}</h3>
                    <p>${product.price}</p>
                </div>
            ))}
        </div>
    );
}

export default SelectedProducts;