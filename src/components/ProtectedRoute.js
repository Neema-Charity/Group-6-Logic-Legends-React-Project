import React from 'react';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
    const isAuthenticated = false; // Your authentication logic here (e.g., checking user token or session)

    if (!isAuthenticated) {
        return <Navigate to="/" />;
    }

    return children;
}

export default ProtectedRoute;
