import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import { useParams, useNavigate } from 'react-router-dom';
import "./ProductInformation.css"

function ProductInformation({ addToCart }) { 
    const { id } = useParams();
    const navigate = useNavigate();
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
        addToCart(product); 
        navigate('/');
    };

    if (!product) {
        return <h1>Loading...</h1>;
    }

    return (
        <div className='product-information-container'>
            <div>
                <Button variant="secondary" style={{ backgroundColor: '#198754' }} onClick={handleCartClick}>
                    <i className="bi bi-cart2"></i>Add to cart
                </Button>{' '}
            </div>
            <div>
                <img className='product-image' src={product.image} alt={product.name} />
                <strong>{product.description}</strong>
                <p>${product.price}</p>
            </div>
            <p>{cart} Items in cart</p>
        </div>
    );
}

export default ProductInformation;