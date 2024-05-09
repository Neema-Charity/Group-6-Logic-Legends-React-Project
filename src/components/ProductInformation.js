import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function ProductInformation() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:3000/products/${id}`)
            .then(res => res.json())
            .then(data => setProduct(data))
            .catch(error => console.error('Error fetching product:', error));
    }, [id]);

    if (!product) {
        return <h1>Loading...</h1>;
    }

    return (
        <div className='product-information-container'>
            <div>
                <img src={product.image} alt={product.name} />
                <strong>{product.description}</strong>
                <p>${product.price}</p>
            </div>
        </div>
    );
}

export default ProductInformation;