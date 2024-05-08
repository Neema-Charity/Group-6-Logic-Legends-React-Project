import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function ProductInformation() {
    const { id, category } = useParams();
    const [product, setProduct] = useState(null);
    const [relatedProducts, setRelatedProducts] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:3000/products/${id}`)
            .then(res => res.json())
            .then(data => setProduct(data));

        // Fetch related products based on category
        fetch(`http://localhost:3000/products?category=${category}&_limit=4`)
            .then(res => res.json())
            .then(data => setRelatedProducts(data));
    }, [id, category]);

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

            <h2>Related Products</h2>
            <div className='related-products-container'>
                {relatedProducts.map(relatedProduct => (
                    <div key={relatedProduct.id}>
                        <img src={relatedProduct.image} alt={relatedProduct.name} />
                        <strong>{relatedProduct.name}</strong>
                        <p>${relatedProduct.price}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ProductInformation;