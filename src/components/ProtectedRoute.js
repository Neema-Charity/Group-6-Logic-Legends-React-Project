import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false); // Replace with your authentication logic
    const [shouldRedirect, setShouldRedirect] = useState(false);

    useEffect(() => {
        if (!isAuthenticated) {
            setShouldRedirect(true);
        }
    }, [isAuthenticated]);

    if (shouldRedirect) {
        // Render null or a placeholder for redirection
        return null;
    }

    return isAuthenticated ? children : null;
}

export default ProtectedRoute;
