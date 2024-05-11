import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import "./ProductsList.css";

function ProductsList() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [totalItemsInCart, setTotalItemsInCart] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    fetch('http://localhost:3000/products')
      .then(res => res.json())
      .then(data => {
        const productsWithStock = data.map(product => ({
          ...product,
          initial_in_stock: product.in_stock,
          inCart: false,
          quantity: 0 // Quantity of the product in the cart
        }));
        setProducts(productsWithStock);
      })
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  const addToCart = (product) => {
    const updatedProducts = products.map(p => {
      if (p.id === product.id) {
        const updatedStock = p.in_stock - 1; // Decrease the stock by 1 for each item added to cart
        if (updatedStock < 0) {
          alert(`Not enough stock for ${product.name}`);
          return p; // Return the original product if there's not enough stock
        }
        const totalPrice = product.price * (p.quantity + 1); // Calculate the total price
        setTotalAmount(prevTotal => prevTotal + product.price); // Add the price to the total amount
        alert(`Product added to cart: ${product.name}\nTotal Price: ksh${totalPrice}`);
        return {
          ...p,
          in_stock: updatedStock,
          inCart: true,
          quantity: p.quantity + 1
        };
      }
      return p;
    });
    setProducts(updatedProducts);
    setTotalItemsInCart(prevTotal => prevTotal + 1); // Increase total items in cart
  };

  const removeFromCart = (product) => {
    const updatedProducts = products.map(p => {
      if (p.id === product.id) {
        const updatedStock = p.in_stock + 1; // Increase the stock by 1 for each item removed from cart
        return {
          ...p,
          in_stock: updatedStock > p.initial_in_stock ? p.initial_in_stock : updatedStock, // Ensure stock doesn't exceed initial stock
          inCart: false,
          quantity: 0 // Reset quantity to 0 when removing from cart
        };
      }
      return p;
    });
    setProducts(updatedProducts);
    setTotalItemsInCart(prevTotal => prevTotal - product.quantity); // Decrease total items in cart
    setTotalAmount(prevTotal => prevTotal - (product.price * product.quantity)); // Subtract the price from the total amount
  };

  const handleQuantityChange = (product, newQuantity) => {
    const updatedProducts = products.map(p => {
      if (p.id === product.id) {
        const updatedStock = p.in_stock + (p.quantity - newQuantity); // Update stock based on the change in quantity
        return {
          ...p,
          in_stock: updatedStock,
          quantity: newQuantity
        };
      }
      return p;
    });
    setProducts(updatedProducts);
    setTotalItemsInCart(prevTotal => prevTotal + (newQuantity - product.quantity)); 
    const priceDifference = product.price * (newQuantity - product.quantity); 
    setTotalAmount(prevTotal => prevTotal + priceDifference); 
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div>
        <h1 id="shoppers" className="bg-success p-2 text-white">SHOPPERS</h1>
        <p className='text'>
          Your Ultimate Shopping Hub  
          <input
            id='searchInput'
            type="text"
            placeholder="Search by name...."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          /><div className="carrt-info">
          <p>Total Items in Cart: {totalItemsInCart}</p>
          <p>Total Amount: ksh{totalAmount}</p>
        </div>
        </p>
      </div>
      <div className='produccts-list-container'>
        
        {filteredProducts.map(product => (
          <div key={product.id} className="product-card">
            <Link
              to={`/products/${product.id}`}
              className="product-card-link"
            >
              <img className='product-image' src={product.image} alt={product.name} />
              <h3>{product.name}</h3>
              <p>ksh{product.price}</p>
              <p>In Stock: {product.in_stock}</p>
            </Link>
            {product.inCart ? (
              <div>
                <button onClick={() => removeFromCart(product)}>-</button>
                <span>{product.quantity}</span>
                <button onClick={() => handleQuantityChange(product, product.quantity + 1)}>+</button>
              </div>
            ) : (
              <button onClick={() => addToCart(product)}>
                <FontAwesomeIcon icon={faShoppingCart} />
                Add to Cart
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductsList;
