import React from 'react';
import Button from 'react-bootstrap/Button';

function Cart({ cart }) {
  const handleCartClick = () => {
    console.log('Cart clicked');
  };

  return (
    <div>
      <Button variant="secondary" style={{ backgroundColor: '#198754' }} onClick={handleCartClick}>
        <i className="bi bi-cart2"></i>
        {cart} Items in cart
      </Button>
    </div>
  );
}

export default Cart;

