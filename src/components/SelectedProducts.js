import React from 'react';
import { useLocation } from 'react-router-dom';
import "./SelectedProducts.css";

function SelectedProducts({ products }) {
    const location = useLocation();
    const isCartPage = location.pathname === '/checkout'; 

    if (!isCartPage) {
        return null;
    }

    return (
        <div className='selected-products-container'>
            {products.map(product => (
                <div key={product.id} className="product-details">
                    <img className='selected-product-image' src={product.image} alt={product.name} />
                    <h3>{product.name}</h3>
                    <p>ksh:{product.price}</p>
                  <button onClick={() => products.splice(products.indexOf(product), 1)}>Remove</button>
                </div>
            ))}
        </div>
    );
}

export default SelectedProducts;
