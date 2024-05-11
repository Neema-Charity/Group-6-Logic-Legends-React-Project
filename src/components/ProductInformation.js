import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import { useParams, useNavigate } from 'react-router-dom';
import "./ProductInformation.css";

function ProductInformation({ addToCart, setSelectedProducts }) {
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
        addToCart(product);
        setSelectedProducts(prevProducts => [...prevProducts, product]);
        navigate('/');
    };

    if (!product) {
        return <h1>Loading...</h1>;
    }

    return (
        <div className='product-information-container'>
            <div className='cart-button'>
                    <i id='sss' className="bi bi-cart2"></i>  <p className='pp'>Successfully added to cart</p>
              
            </div>
            <div>
                <img className='product-image' src={product.image} alt={product.name} />
                <p>${product.price}</p>
            </div>
        </div>
    );
}

export default ProductInformation;
