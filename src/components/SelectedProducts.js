import React from 'react'
import "./SelectedProducts.css"

function SelectedProducts({ product }) {
    return (
        <div className='selected-products-container'>
            <div className="product-details">
            <img src={product.image} alt={product.name} />
                <h3>{product.name}</h3>
                <p>${product.price}</p>
            </div>
        </div>
    )
}

export default SelectedProducts
