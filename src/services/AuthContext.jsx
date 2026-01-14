import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null); // { id, name, role: 'traveler'|'host'|'organizer' }

    const login = (role, name = "Test User") => {
        setUser({
            id: "u_" + Math.random().toString(36).substr(2, 5),
            name: name,
            role: role,
            avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?fit=crop&w=100&h=100"
        });
    };

    const logout = () => {
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
