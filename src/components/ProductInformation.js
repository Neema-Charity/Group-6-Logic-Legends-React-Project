import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import Button from 'react-bootstrap/Button';

function ProductInformation({ setSelectedProduct }) {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [cart, setCart] = useState([]); // Change to array to store items in the cart
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        fetch(`http://localhost:3000/products/${id}`)
            .then(res => res.json())
            .then(data => setProduct(data))
            .catch(error => console.error('Error fetching product:', error));
    }, [id]);

    const handleAddToCart = () => {
        const item = { ...product, quantity }; // Create an item object with product details and quantity
        setCart(prevCart => [...prevCart, item]); // Add the item to the cart array
        setSelectedProduct(product);
    };

    const handleRemoveFromCart = () => {
        if (cart.length > 0) {
            setCart(prevCart => prevCart.slice(0, -1)); // Remove the last item from the cart array
        }
    };

    const handleQuantityChange = (event) => {
        const value = parseInt(event.target.value);
        setQuantity(value >= 1 ? value : 1);
    };

    const getTotalCost = () => {
        return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
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
                <input type="number" min="1" value={quantity} onChange={handleQuantityChange} />
                <Button variant="secondary" style={{ backgroundColor: '#198754', marginRight: '10px' }} onClick={handleAddToCart}>
                    <i className="bi bi-cart2"></i> Add to cart
                </Button>
                <Button variant="secondary" style={{ backgroundColor: '#dc3545' }} onClick={handleRemoveFromCart}>
                    <i className="bi bi-cart-x"></i> Remove from cart
                </Button>
            </div>
            <p>Total: ${getTotalCost()}</p> {/* Display the total cost */}
        </div>
    );
}

export default ProductInformation;
