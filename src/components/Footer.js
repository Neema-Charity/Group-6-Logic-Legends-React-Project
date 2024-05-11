import React from 'react';
import { useLocation } from 'react-router-dom';
import "./Footer.css";

function Footer() {
    const location = useLocation();

    // Check if the current location is the home page
    const isHomePage = location.pathname === '/';

    // Render the footer only if it's the home page
    if (!isHomePage) {
        return null;
    }

    return (
        <div>
            <div className="bg-success p-2 text-white">
                <p className='footer'><i class="bi bi-c-circle"></i> Shoppers 2024</p>
            </div>
        </div>
    );
}

export default Footer;
