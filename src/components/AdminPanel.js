import React, { useEffect, useState } from 'react';
import "./ProductsList.css";
import Products from './Products';

import './AdminPanel.css'

import { Link } from 'react-router-dom';


function AdminPanel() {
    const [password, setPassword] = useState('');
    const [authenticated, setAuthenticated] = useState(false);

    const handlePasswordSubmition = (e) => {
        e.preventDefault();

        const passwordExpected = 'password';
        if (password === passwordExpected) {
            setAuthenticated(true);
        } else {
            alert('Wrong Password');
        }
    };
    if (authenticated) {
        return (
            <div>
                <h1>Admins Panel</h1>
                <p>Welcome to the Admins Panel</p>
                <Products />
            </div>
        )
    } else {
        return (
            <div>
                <h1>Welcome to the Admins Panel</h1>
                <p>Enter Password to proceed</p>
                <form onSubmit={handlePasswordSubmition}>
                    <input type='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder='Enter Password ...'
                    />
                </form>
            </div>
        )
    }

}

export default AdminPanel;

