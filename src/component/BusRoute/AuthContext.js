// Trong AuthProvider.js
import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

// Thông tin người dùng mặc định
const defaultUsername = 'tandung1';

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch(`http://localhost:8080/customer/username/${defaultUsername}`, {
                    credentials: 'include' // Important: include credentials to maintain session
                });
                if (response.ok) {
                    const userData = await response.json();
                    setUser(userData);
                } else {
                    console.error('Failed to fetch user');
                }
            } catch (error) {
                console.error('Error fetching user:', error);
            }
        };

        fetchUser();
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
