import React from 'react'

function SelectedProducts() {
    return (
        <div>
            <img src={product.image} alt={product.name} />
            <div className="product-details">
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <p>${product.price}</p>
            </div>
        </div>
    )
}

export default SelectedProducts
