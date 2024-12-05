import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const useQuery = () => {
    return new URLSearchParams(useLocation().search);
};

const OAuth2RedirectHandler = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const query = useQuery();
    const token = query.get('token');
    const error = query.get('error');

    React.useEffect(() => {
        if (token) {
            alert(token)
            localStorage.setItem('accessToken', token);
            navigate('/', { state: { from: location } });
        } else {
            alert(error)
            navigate('/login', { state: { from: location, error: error } });
        }
    }, [navigate, token, error]);

    return null; // This component does not render anything itself
};

export default OAuth2RedirectHandler;