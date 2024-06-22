import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function OAuth2RedirectHandler() {
    const navigate = useNavigate();
    const location = useLocation();

    // Function to extract URL parameters
    const getUrlParameter = (name) => {
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
        const results = regex.exec(location.search);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    };

    useEffect(() => {
        const token = getUrlParameter('token');
        const error = getUrlParameter('error');

        if (token != null) {
            alert('Login success')
            localStorage.setItem('accessToken', token);
            navigate('/', { state: { from: location }, replace: true });
            
        } else {
            alert('Login Failed')
            navigate('/login', { 
                state: { 
                    from: location,
                    error: error 
                },
                replace: true
            });
        }
    }, [navigate, location]);

    // Normally, you might return null or a loading indicator here
    return null;
}

export default OAuth2RedirectHandler;