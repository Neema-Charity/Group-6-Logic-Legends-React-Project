import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [shouldRedirect, setShouldRedirect] = useState(false);

    useEffect(() => {
        if (!isAuthenticated) {
            setShouldRedirect(true);
        }
    }, [isAuthenticated]);

    if (shouldRedirect) {
        
        return null;
    }

    return isAuthenticated ? children : null;
}

export default ProtectedRoute;
