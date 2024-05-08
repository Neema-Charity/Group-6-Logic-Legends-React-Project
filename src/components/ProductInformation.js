import React from 'react'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function ProductInformation() {

    const { id } = useParams();
    const [product, setProducts] = useState([])

    useEffect(() => {
        fetch(`http://localhost:3000/products/${id}`)
           .then(res => res.json())
           .then(data => setProducts(data))
    }, [id])

    if (!product) {
        return <h1>Loading...</h1>
    }

    return (
        <div className='product-information-container'>
            <div>
                <img src={product.image} alt={product.name} />
                <strong>{product.description}</strong>
                <p>${product.price}</p>
                <Link to='/'>Back to Products</Link>
            </div>
        </div>
    )
}

export default ProductInformation
