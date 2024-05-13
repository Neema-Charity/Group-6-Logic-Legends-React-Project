import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import "./CheckoutForm.css";

function CheckoutForm({ cartItems, totalPrice, totalItemsInCart, totalAmount }) {
    const navigate = useNavigate();
    const [phoneNumber, setPhoneNumber] = useState('');
    const [mpesaPin, setMpesaPin] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('mpesa');
    const [selectedCounty, setSelectedCounty] = useState('');

    const counties = [
        "Baringo", "Bomet", "Bungoma", "Busia", "Elgeyo Marakwet", "Embu", "Garissa",
        "Homa Bay", "Isiolo", "Kajiado", "Kakamega", "Kericho", "Kiambu", "Kilifi",
        "Kirinyaga", "Kisii", "Kisumu", "Kitui", "Kwale", "Laikipia", "Lamu", "Machakos",
        "Makueni", "Mandera", "Marsabit", "Meru", "Migori", "Mombasa", "Murang'a", "Nairobi",
        "Nakuru", "Nandi", "Narok", "Nyamira", "Nyandarua", "Nyeri", "Samburu", "Siaya",
        "Taita Taveta", "Tana River", "Tharaka Nithi", "Trans Nzoia", "Turkana", "Uasin Gishu",
        "Vihiga", "Wajir", "West Pokot"
    ];

    const handlePayment = () => {
        // Process payment logic here
        alert('Payment processed successfully!');
        // navigate('/'); // Redirect to home after payment (if needed)
    };

    return (
        <div className="checkout-form-container">
            <h2>Checkout</h2>
            <div className="cart-items-container">
            </div>
            <form>
                <div className="form-group">
                    <label>Phone Number:</label>
                    <input
                        type="tel"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Delivery Location :</label>
                    <select
                        value={selectedCounty}
                        onChange={(e) => setSelectedCounty(e.target.value)}
                        required
                    >
                        <option value="">Select delivery location</option>
                        {counties.map((county, index) => (
                            <option key={index} value={county}>{county}</option>
                        ))}
                    </select>
                </div>
                {paymentMethod === 'mpesa' && (
                    <div className="form-group">
                        <label>M-Pesa PIN:</label>
                        <input
                            type="password"
                            value={mpesaPin}
                            onChange={(e) => setMpesaPin(e.target.value)}
                            required
                        />
                    </div>
                )}
                <div className="form-group">
                    <label>Payment Method:</label>
                    <select
                        value={paymentMethod}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                    >
                        <option value="mpesa">M-Pesa</option>
                        <option value="card">Card</option>
                    </select>
                </div>
                <Button variant="primary" onClick={handlePayment}>Pay Now</Button>
            </form>
        </div>
    );
}

export default CheckoutForm;
