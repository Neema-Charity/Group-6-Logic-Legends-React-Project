import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

function ProductInformation() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [cart, setCart] = useState(0);

    useEffect(() => {
        fetch(`http://localhost:3000/products/${id}`)
            .then(res => res.json())
            .then(data => setProduct(data))
            .catch(error => console.error('Error fetching product:', error));
    }, [id]);

    const handleCartClick = () => {
        setCart(prevCart => prevCart + 1);
        console.log(cart);
    };

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
            <div>
                <Button variant="secondary" style={{ backgroundColor: '#198754' }} onClick={handleCartClick}>
                    <i className="bi bi-cart2"></i>Add to cart
                </Button>{' '}
            </div>
            <p>{cart} Items in cart</p>
        </div>
    );
}

export default ProductInformation;